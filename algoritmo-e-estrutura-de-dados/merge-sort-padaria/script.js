const addBtn = document.getElementById('addPedido')
const nomeInput = document.getElementById('nome')
const horarioInput = document.getElementById('horario')
const mergeBtn = document.getElementById('mergeBtn')
const bubbleBtn = document.getElementById('bubbleBtn')
const compararBtn = document.getElementById('compararBtn')
const resetBtn = document.getElementById('resetBtn')
const comparacoesEl = document.getElementById('comparacoes')
const fusoesEl = document.getElementById('fusoes')
const progressFill = document.getElementById('progressFill')
const toggleTheme = document.getElementById('toggleTheme')
const listaPedidos = document.getElementById('listaPedidos')
const historicoList = document.getElementById('historicoList')
const limparHistorico = document.getElementById('limparHistorico')

let pedidos = JSON.parse(localStorage.getItem('pedidosPadaria')) || []
let historico = JSON.parse(localStorage.getItem('historicoPadaria')) || []
let comparacoes = 0
let fusoes = 0
let running = false

function saveAll() {
  localStorage.setItem('pedidosPadaria', JSON.stringify(pedidos))
  localStorage.setItem('historicoPadaria', JSON.stringify(historico))
}

function renderPedidos() {
  listaPedidos.innerHTML = ''
  pedidos.forEach(p => {
    const el = document.createElement('div')
    el.className = 'card'
    el.dataset.id = p.id
    el.innerHTML = `
      <div class="avatar">🥖</div>
      <div class="meta">
        <strong>${p.name}</strong>
        <small>⏰ ${p.time}</small>
      </div>
      <div style="margin-left:auto;text-align:right">
        <div class="status ${p.status}">${p.statusText}</div>
      </div>`
    listaPedidos.appendChild(el)
  })
  comparacoesEl.textContent = comparacoes
  fusoesEl.textContent = fusoes
}

function renderHistorico() {
  historicoList.innerHTML = ''
  if (historico.length === 0) {
    const empty = document.createElement('div')
    empty.className = 'card'
    empty.innerHTML = `<div class="meta"><strong>Nenhum histórico</strong><small>Execute uma ordenação para registrar</small></div>`
    historicoList.appendChild(empty)
    return
  }
  historico.forEach((h, i) => {
    const el = document.createElement('div')
    el.className = 'card'
    el.innerHTML = `
      <div class="meta">
        <strong>${h.alg}</strong>
        <small>${h.date}</small>
      </div>
      <div style="margin-left:auto;text-align:right">
        <div class="status done">${h.time}ms</div>
        <button data-i="${i}" class="delHist" style="background:none;border:0;cursor:pointer;margin-left:8px">🗑️</button>
      </div>`
    historicoList.appendChild(el)
  })
  document.querySelectorAll('.delHist').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = Number(e.currentTarget.dataset.i)
      historico.splice(idx, 1)
      saveAll()
      renderHistorico()
    })
  })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

addBtn.addEventListener('click', () => {
  if (running) return
  const name = nomeInput.value.trim() || 'Cliente'
  const time = horarioInput.value || '08:00'
  pedidos.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name,
    time,
    status: 'pending',
    statusText: 'Pendente'
  })
  nomeInput.value = ''
  horarioInput.value = ''
  saveAll()
  renderPedidos()
})

resetBtn.addEventListener('click', () => {
  if (running) return
  if (!confirm('Limpar todos os pedidos?')) return
  pedidos = []
  comparacoes = 0
  fusoes = 0
  updateProgress(0)
  saveAll()
  renderPedidos()
})

limparHistorico.addEventListener('click', () => {
  if (!confirm('Limpar histórico?')) return
  historico = []
  saveAll()
  renderHistorico()
})

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark')
  document.body.classList.toggle('theme-light')
  const isDark = document.body.classList.contains('theme-dark')
  toggleTheme.textContent = isDark ? '☀️' : '🌙'
  localStorage.setItem('themePadaria', isDark ? 'dark' : 'light')
})

function timeToMins(t) {
  const [h, m] = (t || '00:00').split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

function updateProgress(v = 0) {
  progressFill.style.width = v + '%'
}

async function mergeSortAnimated(arr, criterio = 'time') {
  if (arr.length <= 1) return arr.slice()
  const mid = Math.floor(arr.length / 2)
  const left = await mergeSortAnimated(arr.slice(0, mid), criterio)
  const right = await mergeSortAnimated(arr.slice(mid), criterio)
  const merged = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    comparacoes++
    const a = left[i]
    const b = right[j]
    markStatus([a.id, b.id], 'merging', 'Processando...')
    await sleep(300)
    const aKey = criterio === 'name' ? a.name.toLowerCase() : timeToMins(a.time)
    const bKey = criterio === 'name' ? b.name.toLowerCase() : timeToMins(b.time)
    if (aKey <= bKey) {
      merged.push(left[i++])
    } else {
      merged.push(right[j++])
    }
    updateProgress(Math.min(100, Math.round((comparacoes / Math.max(1, pedidos.length * 2)) * 100)))
    renderPedidos()
  }
  while (i < left.length) merged.push(left[i++])
  while (j < right.length) merged.push(right[j++])
  fusoes++
  merged.forEach(m => {
    const p = pedidos.find(x => x.id === m.id)
    if (p) { p.status = 'done'; p.statusText = 'Ordenado' }
  })
  const orderedIds = merged.map(x => x.id)
  pedidos = mergeIntoGlobal(orderedIds)
  saveAll()
  renderPedidos()
  await sleep(180)
  return merged
}

function mergeIntoGlobal(sortedIds) {
  const sortedItems = sortedIds.map(id => {
    const found = pedidos.find(p => p.id === id)
    return found ? { ...found, status: 'done', statusText: 'Ordenado' } : null
  }).filter(Boolean)
  const remaining = pedidos.filter(p => !sortedIds.includes(p.id))
  return [...sortedItems, ...remaining]
}

function markStatus(ids, status, text) {
  ids.forEach(id => {
    const p = pedidos.find(x => x.id === id)
    if (p) { p.status = status; p.statusText = text }
  })
  renderPedidos()
}

async function executarMerge() {
  if (running) return
  if (pedidos.length < 2) return alert('Adicione ao menos 2 pedidos')
  running = true
  comparacoes = 0
  fusoes = 0
  pedidos.forEach(p => { p.status = 'pending'; p.statusText = 'Pendente' })
  renderPedidos()
  const start = performance.now()
  await mergeSortAnimated(pedidos, 'time')
  const end = performance.now()
  const ms = Math.round(end - start)
  historico.unshift({ alg: 'Merge Sort', date: new Date().toLocaleString(), time: ms })
  saveAll()
  renderHistorico()
  updateProgress(100)
  running = false
}

function bubbleSortSimple(arr) {
  const a = arr.slice()
  let n = a.length
  let swapped
  const start = performance.now()
  do {
    swapped = false
    for (let i = 0; i < n - 1; i++) {
      comparacoes++
      if (timeToMins(a[i].time) > timeToMins(a[i + 1].time)) {
        const tmp = a[i]
        a[i] = a[i + 1]
        a[i + 1] = tmp
        swapped = true
      }
    }
    n--
  } while (swapped)
  const end = performance.now()
  return { arr: a, time: Math.round(end - start) }
}

async function executarBubble() {
  if (running) return
  if (pedidos.length < 2) return alert('Adicione ao menos 2 pedidos')
  running = true
  comparacoes = 0
  fusoes = 0
  const copy = pedidos.map(p => ({ ...p }))
  const start = performance.now()
  const { arr, time } = bubbleSortSimple(copy)
  const end = performance.now()
  pedidos = arr.map(p => ({ ...p, status: 'done', statusText: 'Ordenado' }))
  saveAll()
  renderPedidos()
  historico.unshift({ alg: 'Bubble Sort', date: new Date().toLocaleString(), time })
  renderHistorico()
  updateProgress(100)
  running = false
}

function compararAlgoritmos() {
  if (running) return
  if (pedidos.length < 2) return alert('Adicione ao menos 2 pedidos')
  const copyA = pedidos.map(p => ({ ...p }))
  const copyB = pedidos.map(p => ({ ...p }))
  const t0 = performance.now()
  pureMergeSort(copyA)
  const t1 = performance.now()
  pureBubbleSort(copyB)
  const t2 = performance.now()
  const timeMerge = Math.round(t1 - t0)
  const timeBubble = Math.round(t2 - t1)
  historico.unshift({ alg: 'Comparação', date: new Date().toLocaleString(), time: `M:${timeMerge}ms | B:${timeBubble}ms` })
  saveAll()
  renderHistorico()
}

function pureMergeSort(arr) {
  if (arr.length <= 1) return arr.slice()
  const mid = Math.floor(arr.length / 2)
  const left = pureMergeSort(arr.slice(0, mid))
  const right = pureMergeSort(arr.slice(mid))
  return pureMerge(left, right)
}

function pureMerge(left, right) {
  const res = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    if (timeToMins(left[i].time) <= timeToMins(right[j].time)) res.push(left[i++])
    else res.push(right[j++])
  }
  while (i < left.length) res.push(left[i++])
  while (j < right.length) res.push(right[j++])
  return res
}

function pureBubbleSort(arr) {
  const a = arr.slice()
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (timeToMins(a[j].time) > timeToMins(a[j + 1].time)) {
        const tmp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = tmp
      }
    }
  }
  return a
}

mergeBtn.addEventListener('click', executarMerge)
bubbleBtn.addEventListener('click', executarBubble)
compararBtn.addEventListener('click', compararAlgoritmos)

const savedTheme = localStorage.getItem('themePadaria') || 'light'
if (savedTheme === 'dark') {
  document.body.classList.add('theme-dark')
  document.body.classList.remove('theme-light')
  toggleTheme.textContent = '☀️'
} else {
  document.body.classList.add('theme-light')
  document.body.classList.remove('theme-dark')
  toggleTheme.textContent = '🌙'
}

renderPedidos()
renderHistorico()
saveAll()
