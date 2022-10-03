//Capturar evento de submit
const form = document.querySelector("#formulario");
const pessoasEntrevistadasNome = [];
const pessoasEntrevistadasIMC = [];
let count = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = e.target.querySelector("#altura");
  const inputNome = e.target.querySelector("#nome");

  const nome = inputNome.value;
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);
  const imc = Number(getImc(peso, altura));
  pessoasEntrevistadasNome.push(nome);
  pessoasEntrevistadasIMC.push(imc);

  if (!peso) {
    setResultado("Peso Invalido", false);
    return;
  }

  if (!altura) {
    setResultado("Altura Invalida", false);
    return;
  }

  const nivelImc = getNivelImc(imc);
  const msg = `Seu IMC é ${imc} (${nivelImc})`;
  const msg2 = `${pessoasEntrevistadasNome[count]}`;
  const msgImc = `${pessoasEntrevistadasIMC[count]}`;

  setResultado(msg, true);
  setRegistro(msg2, msgImc);
});

function getNivelImc(imc) {
  const nivel = [
    "Abaixo do peso",
    "Peso Normal",
    "Sobrepeso",
    "Obesidade Grau 1",
    "Obesidade Grau 2",
    "Obesidade Grau 3",
  ];

  if (imc >= 39.9) return nivel[5];

  if (imc >= 34.9) return nivel[4];

  if (imc >= 29.9) return nivel[3];

  if (imc >= 24.9) return nivel[2];

  if (imc >= 18.5) return nivel[1];

  if (imc < 18.5) return nivel[0];
}

function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP() {
  const p = document.createElement("p");
  return p;
}

function criaTabela() {
  count++;

  const tabelaEntrevistada = document.querySelector("#entrevistadas");

  const tr = document.createElement("tr");
  tabelaEntrevistada.appendChild(tr);

  const td = document.createElement("td");
  const td2 = document.createElement("td");

  td.classList.add("td-entrevista" + count);
  td2.classList.add("td2-entrevista" + count);

  tr.appendChild(td);
  tr.appendChild(td2);
  return tabelaEntrevistada;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";

  const p = criaP();

  if (isValid) {
    p.classList.add("paragrafo-resultado");
  } else {
    p.classList.add("bad");
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}

function setRegistro(msg, msg2) {
  criaTabela();
  const entrevistada = document.querySelector("#entrevistadas");
  const coluna = document.querySelector(".td-entrevista" + count);
  const coluna2 = document.querySelector(".td2-entrevista" + count);
  coluna.innerHTML = msg;
  coluna2.innerHTML = msg2;
  entrevistada.appendChild(coluna);
  entrevistada.appendChild(coluna2);
}
