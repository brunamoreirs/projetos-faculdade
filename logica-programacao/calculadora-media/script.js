const historico = [];

function togglePeso() {
    const tipo = document.querySelector('input[name="tipoMedia"]:checked').value;
    const pesos = document.querySelectorAll('[id^="peso"]');
    pesos.forEach(p => {
        p.style.display = (tipo === 'ponderada') ? 'block' : 'none';
    });
}

togglePeso();

function calcularMedia() {
    const nome = document.getElementById("nome").value.trim();
    const n1 = parseFloat(document.getElementById("nota1").value);
    const n2 = parseFloat(document.getElementById("nota2").value);
    const n3 = parseFloat(document.getElementById("nota3").value);

    if (!nome) {
        alert("Digite o nome do aluno.");
        return;
    }

    if ([n1, n2, n3].some(n => isNaN(n) || n < 0 || n > 10)) {
        alert("Notas inválidas! Insira valores entre 0 e 10.");
        return;
    }

    const tipo = document.querySelector('input[name="tipoMedia"]:checked').value;
    let media;

    if (tipo === 'simples') {
        media = ((n1 + n2 + n3)/3).toFixed(2);
    } else {
        const p1 = parseFloat(document.getElementById("peso1").value) || 1;
        const p2 = parseFloat(document.getElementById("peso2").value) || 1;
        const p3 = parseFloat(document.getElementById("peso3").value) || 1;
        media = ((n1*p1 + n2*p2 + n3*p3)/(p1+p2+p3)).toFixed(2);
    }

    let situacao = "";
    let cor = "";
    if (media >= 9) { situacao = "Aprovado com Mérito"; cor="#4CAF50"; }
    else if (media >= 7) { situacao = "Aprovado"; cor="#8BC34A"; }
    else if (media >= 5) { situacao = "Recuperação"; cor="#FFC107"; }
    else { situacao = "Reprovado"; cor="#F44336"; }

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `Aluno: ${nome} <br> Média: ${media} <br> Situação: ${situacao}`;
    resultadoDiv.style.backgroundColor = cor;
    resultadoDiv.style.color = "#fff";

    const card = document.createElement("div");
    card.className = "card";
    card.textContent = `Aluno: ${nome} - Média: ${media} - ${situacao}`;
    document.getElementById("historico").prepend(card);
}
