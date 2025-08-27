function Pessoa(altura, peso) {
    if (!altura || !peso) {
        throw new Error("Altura e peso são obrigatórios");
    }

    this.altura = altura;
    this.peso = peso;
}

function Nutricionista(altura, peso) {
    Pessoa.call(this, altura, peso);
    this.imc = function () {
        return this.peso / (this.altura * this.altura);
    };

    this.classificaIMC = function () {
        var imc = this.imc();
        if (imc < 18.5) {
            return "Abaixo do peso";
        }
        if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        }
        if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        }

        return "Obesidade";
    };
}
Nutricionista.prototype = Object.create(Pessoa.prototype);
Nutricionista.prototype.constructor = Nutricionista;

function renderizaResultadoIMC(nutricionista) {
    document.getElementById("imc").innerText =
        nutricionista.imc().toFixed(2) + " - " + nutricionista.classificaIMC();
}

function actionCalcularIMCBuilder() {
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    return function actionCalcularIMC(evt) {
        evt.preventDefault();

        var nutricionista = new Nutricionista(
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );
        console.log(Nutricionista.prototype.constructor);
        console.log(nutricionista instanceof Pessoa);

        renderizaResultadoIMC(nutricionista);
    }
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", actionCalcularIMCBuilder());
};


function renderizaTabelaIMC(valorIMC) {
    var intervalos = [
        { faixa: "Menor que 18.5", classificacao: "Abaixo do peso", classe: "abaixo" },
        { faixa: "18.5 - 24.9", classificacao: "Peso normal", classe: "normal" },
        { faixa: "25 - 29.9", classificacao: "Sobrepeso", classe: "sobrepeso" },
        { faixa: "Maior ou igual a 30", classificacao: "Obesidade", classe: "obesidade" }
    ];

    var html = "<table><tr><th>Intervalo</th><th>Classificação</th></tr>";

    for (var i = 0; i < intervalos.length; i++) {
        var intervalo = intervalos[i];
        var classe = "";

        if (valorIMC < 18.5 && intervalo.classificacao === "Abaixo do peso") {
            classe = intervalo.classe;
        } else if (valorIMC >= 18.5 && valorIMC < 24.9 && intervalo.classificacao === "Peso normal") {
            classe = intervalo.classe;
        } else if (valorIMC >= 25 && valorIMC < 29.9 && intervalo.classificacao === "Sobrepeso") {
            classe = intervalo.classe;
        } else if (valorIMC >= 30 && intervalo.classificacao === "Obesidade") {
            classe = intervalo.classe;
        }

        html += "<tr class='" + classe + "'>";
        html += "<td>" + intervalo.faixa + "</td>";
        html += "<td>" + intervalo.classificacao + "</td>";
        html += "</tr>";
    }

    html += "</table>";
    document.getElementById("tabela-imc").innerHTML = html;
}


function renderizaResultadoIMC(nutricionista) {
    var valorIMC = nutricionista.imc();
    document.getElementById("imc").innerText =
        valorIMC.toFixed(2) + " - " + nutricionista.classificaIMC();

    renderizaTabelaIMC(valorIMC);
}