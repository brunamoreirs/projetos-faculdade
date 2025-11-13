const casas = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function cadastrarCasa() {
    const morador = document.getElementById('morador').value.trim();
    const qtd = parseInt(document.getElementById('qtdMoradores').value);

    if (!morador || isNaN(qtd) || qtd < 1) {
        alert('Preencha corretamente os dados.');
        return;
    }

    const casa = {
        id: Date.now(),
        morador,
        qtdMoradores: qtd,
        consumo: Array(12).fill(0)
    };
    casas.push(casa);
    atualizarSelect();
    atualizarHistorico();
    alert('Residência cadastrada com sucesso!');
    document.getElementById('morador').value = '';
    document.getElementById('qtdMoradores').value = '';
}

function atualizarSelect() {
    const select = document.getElementById('selectCasa');
    select.innerHTML = '';
    casas.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.morador;
        select.appendChild(option);
    });
}

function registrarConsumo() {
    const id = parseInt(document.getElementById('selectCasa').value);
    const consumoMes = parseFloat(document.getElementById('consumoMes').value);
    if (isNaN(consumoMes) || consumoMes < 0) {
        alert('Digite um valor válido de consumo.');
        return;
    }

    const casa = casas.find(c => c.id === id);
    const mesAtual = new Date().getMonth();
    casa.consumo[mesAtual] = consumoMes;

    alert('Consumo registrado!');
    document.getElementById('consumoMes').value = '';
    atualizarHistorico();
}

function calcularMedia(casa) {
    const total = casa.consumo.reduce((a,b)=>a+b,0);
    return total / 12;
}

function atualizarHistorico() {
    const container = document.getElementById('cardsResidencias');
    container.innerHTML = '';
    casas.forEach(c => {
        const media = calcularMedia(c);
        const card = document.createElement('div');
        card.className = 'card ' + (media > 15 ? 'excessivo' : 'normal');
        card.innerHTML = `<strong>${c.morador}</strong><br>Consumo médio: ${media.toFixed(2)} m³`;
        container.appendChild(card);
    });
}

function mostrarAcimaAbaixo(acima=true) {
    const lista = acima ? document.getElementById('listaAcima') : document.getElementById('listaAbaixo');
    lista.innerHTML = '';
    casas.forEach(c => {
        const media = calcularMedia(c);
        if ((acima && media > 15) || (!acima && media <= 15)) {
            const card = document.createElement('div');
            card.className = 'card ' + (media > 15 ? 'excessivo' : 'normal');
            card.innerHTML = `<strong>${c.morador}</strong><br>Consumo médio: ${media.toFixed(2)} m³`;
            lista.appendChild(card);
        }
    });
}

document.querySelector('[onclick="showSection(\'acima\')"]').addEventListener('click', ()=>mostrarAcimaAbaixo(true));
document.querySelector('[onclick="showSection(\'abaixo\')"]').addEventListener('click', ()=>mostrarAcimaAbaixo(false));
