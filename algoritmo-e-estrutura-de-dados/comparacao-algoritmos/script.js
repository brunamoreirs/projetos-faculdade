const arrayContainer = document.getElementById('arrayContainer');
const numInput = document.getElementById('numInput');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const bubbleBtn = document.getElementById('bubbleBtn');
const quickBtn = document.getElementById('quickBtn');
const comparacoesEl = document.getElementById('comparacoes');
const trocasEl = document.getElementById('trocas');
const tempoEl = document.getElementById('tempo');
const toggleTheme = document.getElementById('toggleTheme');
const historicoList = document.getElementById('historicoList');
const chartCanvas = document.getElementById('chart');

let arr = [];
let comparacoes = 0, trocas = 0;
let historico = JSON.parse(localStorage.getItem('historico')) || [];
let chart;

function renderArray() {
  arrayContainer.innerHTML = '';
  arr.forEach(v => {
    const div = document.createElement('div');
    div.className = 'card';
    div.style.height = `${v*4}px`;
    div.textContent = v;
    arrayContainer.appendChild(div);
  });
  comparacoesEl.textContent = comparacoes;
  trocasEl.textContent = trocas;
}

function renderHistorico() {
  historicoList.innerHTML = '';
  historico.forEach((h, idx) => {
    const el = document.createElement('div');
    el.className = 'historico-item';
    el.innerHTML = `<span>${h}</span><button onclick="removerHistorico(${idx})">✕</button>`;
    historicoList.appendChild(el);
  });
}

function removerHistorico(idx){
  historico.splice(idx,1);
  localStorage.setItem('historico',JSON.stringify(historico));
  renderHistorico();
}

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

generateBtn.addEventListener('click', ()=>{
  const n = parseInt(numInput.value) || 20;
  arr = Array.from({length:n},()=>Math.floor(Math.random()*50+1));
  comparacoes = 0; trocas = 0;
  renderArray();
});

resetBtn.addEventListener('click', ()=>{
  arr = [];
  comparacoes = 0; trocas = 0;
  renderArray();
  if(chart) chart.destroy();
});

toggleTheme.addEventListener('click', ()=>{
  document.body.classList.toggle('theme-dark');
  document.body.classList.toggle('theme-light');
  toggleTheme.textContent = document.body.classList.contains('theme-dark') ? '☀️' : '🌙';
});

async function bubbleSortAnim() {
  comparacoes=0; trocas=0;
  const start = performance.now();
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length-i-1;j++){
      comparacoes++;
      const cards = arrayContainer.children;
      cards[j].classList.add('comparing');
      cards[j+1].classList.add('comparing');
      await sleep(50);
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
        trocas++;
        renderArray();
      }
      cards[j].classList.remove('comparing');
      cards[j+1].classList.remove('comparing');
    }
  }
  const end = performance.now();
  tempoEl.textContent = Math.round(end-start);
  historico.push(`Bubble Sort - ${arr.length} números - ${Math.round(end-start)} ms`);
  localStorage.setItem('historico',JSON.stringify(historico));
  renderHistorico();
  markSorted();
  return end-start;
}

async function quickSortAnim() {
  comparacoes=0; trocas=0;
  const start = performance.now();
  await quickSort(0, arr.length-1);
  const end = performance.now();
  tempoEl.textContent = Math.round(end-start);
  historico.push(`Quick Sort - ${arr.length} números - ${Math.round(end-start)} ms`);
  localStorage.setItem('historico',JSON.stringify(historico));
  renderHistorico();
  markSorted();
  return end-start;
}

async function quickSort(low, high){
  if(low<high){
    let pi = await partition(low, high);
    await quickSort(low, pi-1);
    await quickSort(pi+1, high);
  }
}

async function partition(low, high){
  let pivot = arr[high];
  let i = low-1;
  const cards = arrayContainer.children;
  for(let j=low;j<high;j++){
    comparacoes++;
    cards[j].classList.add('comparing');
    cards[high].classList.add('comparing');
    await sleep(50);
    if(arr[j]<=pivot){
      i++;
      [arr[i],arr[j]]=[arr[j],arr[i]];
      trocas++;
      renderArray();
    }
    cards[j].classList.remove('comparing');
    cards[high].classList.remove('comparing');
  }
  [arr[i+1],arr[high]]=[arr[high],arr[i+1]];
  trocas++;
  renderArray();
  return i+1;
}

function markSorted(){
  const cards = arrayContainer.children;
  for(let c of cards) c.classList.add('sorted');
}

async function runChart(){
  if(chart) chart.destroy();
  const bubbleTime = await bubbleSortAnim();
  generateBtn.click();
  const quickTime = await quickSortAnim();
  chart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: ['Bubble Sort','Quick Sort'],
      datasets: [{
        label: 'Tempo de execução (ms)',
        data: [bubbleTime, quickTime],
        backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
                          getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim()]
      }]
    },
    options: { responsive:true, plugins:{ legend:{ display:false } } }
  });
}

bubbleBtn.addEventListener('click', bubbleSortAnim);
quickBtn.addEventListener('click', quickSortAnim);
