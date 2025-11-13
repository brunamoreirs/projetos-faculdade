let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativasCount = 0;
const historico = [];

function verificarPalpite() {
    const palpiteInput = document.getElementById("palpite");
    const palpite = parseInt(palpiteInput.value);
    const resultadoDiv = document.getElementById("resultado");

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        alert("Digite um número entre 1 e 100.");
        return;
    }

    tentativasCount++;
    let mensagem = "";

    if (palpite === numeroSecreto) {
        mensagem = `Parabéns! Você acertou o número em ${tentativasCount} tentativa(s)!`;
        resultadoDiv.style.backgroundColor = "#4CAF50";
        resultadoDiv.style.color = "#fff";
    } else if (palpite < numeroSecreto) {
        mensagem = "O número é maior!";
        resultadoDiv.style.backgroundColor = "#FFC107";
        resultadoDiv.style.color = "#333";
    } else {
        mensagem = "O número é menor!";
        resultadoDiv.style.backgroundColor = "#FFC107";
        resultadoDiv.style.color = "#333";
    }

    resultadoDiv.innerHTML = mensagem;

    const card = document.createElement("div");
    card.className = "card";
    card.textContent = `Palpite: ${palpite} - Tentativa: ${tentativasCount} - ${mensagem}`;
    document.getElementById("historico").prepend(card);

    palpiteInput.value = "";
    palpiteInput.focus();

    if (palpite === numeroSecreto) {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        tentativasCount = 0;
    }
}
