// Função para reiniciar o estado da aplicação
function reiniciar() {
    habilitarBotaoVerificador();
    desabilitarBotaoReiniciar();
    palavrasPalindromos = [];
    palavrasNaoPalindromos = [];
    palavrasArmazenadas = [];
    resultado = [];
    verificar = [];
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("quantidade").value = "";
}

// Função para habilitar o botão de reiniciar
function habilitarBotaoReiniciar() {
    alterarEstadoBotao("btn-reiniciar", true);
}

// Função para desabilitar o botão de reiniciar
function desabilitarBotaoReiniciar() {
    alterarEstadoBotao("btn-reiniciar", false);
}

// Função para habilitar o botão de verificar
function habilitarBotaoVerificador() {
    alterarEstadoBotao("btn-verificar", true);
}

// Função para desabilitar o botão de verificar
function desabilitarBotaoVerificador() {
    alterarEstadoBotao("btn-verificar", false);
}

// Função para alterar o estado de um botão
function alterarEstadoBotao(idBotao, habilitado) {
    let botao = document.getElementById(idBotao);
    botao.classList.toggle("container__botao-desabilitado", !habilitado);
    botao.classList.toggle("container__botao", habilitado);
}

// Função para verificar se é uma frase ou palavra
function verificarTipo(texto) {
    if (texto.split(" ").length > 1) {
        return "frase";
    } else {
        return "palavra";
    }
}

// Desabilita o botão de reiniciar inicialmente
desabilitarBotaoReiniciar();

// Variáveis globais
let palavrasPalindromos = [];
let palavrasNaoPalindromos = [];
let palavrasArmazenadas = [];
let resultado = [];
let verificar = [];

// Função para verificar se uma palavra é um palíndromo
function palindromo(palavra) {
    palavra = palavra.replace(/[^a-zA-Z]/g, "").toLowerCase(); // Remove espaços e pontuações e converte para minúsculas
    let inverterPalavra = palavra.split("").reverse().join(""); // Inverte a palavra
    return palavra === inverterPalavra; // Retorna true se a palavra original for igual à palavra invertida
}

// Função para verificar a palavra inserida
function verificador() {
    let texto = document.getElementById("quantidade").value.trim().toLowerCase();
    if (!texto) {
        alert("Por favor, insira uma palavra ou frase antes de verificar!");
        return;
    }
    
    if (palavrasArmazenadas.includes(texto)) {
        alert(`Este ${verificarTipo(texto)} já foi inserido!`);
        return;
    }

    palavrasArmazenadas.push(texto);
    resultado = [];
    verificar = [];

    for (let i = 0; i < texto.length; i++) {
        resultado.push(texto[i]);
    }

    let resultadoCopia = [...resultado]; // Copia do array usando spread operator
    while (resultadoCopia.length > 0) {
        verificar.push(resultadoCopia.pop());
    }

    if (verificarTipo(texto) === "frase") {
        if (palindromo(texto)) {
            palavrasPalindromos.push(texto);
            document.getElementById("resultado").innerHTML = `A frase "${texto.toUpperCase()}" é um palíndromo.`;
        } else {
            palavrasNaoPalindromos.push(texto);
            document.getElementById("resultado").innerHTML = `A frase "${texto.toUpperCase()}" não é um palíndromo.`;
        }
    } else {
        if (palindromo(texto)) {
            palavrasPalindromos.push(texto);
            document.getElementById("resultado").innerHTML = `A palavra "${texto.toUpperCase()}" é um palíndromo.`;
        } else {
            palavrasNaoPalindromos.push(texto);
            document.getElementById("resultado").innerHTML = `A palavra "${texto.toUpperCase()}" não é um palíndromo.`;
        }
    }

    habilitarBotaoReiniciar();
    document.getElementById("quantidade").value = "";
}

// Função para mostrar resultado total e reiniciar
function resultadoTotal() {
    let mensagemPalindromos = palavrasPalindromos.length > 1 ? "As palavras" : "A palavra";
    let verboPalindromos = palavrasPalindromos.length > 1 ? "são palíndromos" : "é palíndromo";

    let mensagemNaoPalindromos = palavrasNaoPalindromos.length > 1 ? "As palavras" : "A palavra";
    let verboNaoPalindromos = palavrasNaoPalindromos.length > 1 ? "não são palíndromos" : "não é palíndromo";

    document.getElementById("resultado").innerHTML = `${mensagemPalindromos} <strong style="color: red;">${palavrasPalindromos.map(palavra => palavra.toUpperCase()).join(', ')}</strong> ${verboPalindromos}.<br><br>${mensagemNaoPalindromos} <strong style="color: red;">${palavrasNaoPalindromos.map(palavra => palavra.toUpperCase()).join(', ')}</strong> ${verboNaoPalindromos}.`;

    reiniciar(); // Reinicia o estado após mostrar o resultado
}

// Evento de clique para reiniciar
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);

// Evento de clique para mostrar resultado total
document.getElementById("btn-resultado-total").addEventListener("click", resultadoTotal);
