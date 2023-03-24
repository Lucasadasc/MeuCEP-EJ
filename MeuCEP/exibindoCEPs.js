//Dados
var dados = [];
var tudo;

function conte(inicio, fim) {
    let result = []
    for (i = inicio; i <= fim; i++) {
        result.push(i)
    }
    return result
}

function exibirCEP() {

    const lista = document.querySelector("#lista");

    var cep = document.getElementById("cep").value;

    var numeroscep = cep.replace(/\D/g, '')

    var validacao = numeroscep.length
    if (validacao == 8) {
        if (isNaN(numeroscep) == false) {
            fetch(`https://viacep.com.br/ws/${numeroscep}/json`)
                .then(res => res.json())
                .then(data => {
                    var local = [cep, data.uf, data.logradouro, data.bairro, data.localidade]
                    dados.push(local)
                    const gerarLista = conte(inicio = 1, dados.length)
                        .map(i => `<div id="resultados"><div id="cabecalho"><h3>${dados[i - 1][0]}</h3><button onclick="excluirCEP(${i - 1})">X</button></div><div id="local"><small id="lograsmall" class="form-text text-muted">Logradouro</small><span id="a" >${dados[i - 1][2]}</span><small id="bairrosmall" class="form-text text-muted">Bairro</small><span>${dados[i - 1][3]}</span><small id="localsmall" class="form-text text-muted">Localidade</small><span>${dados[i - 1][4]}</span><small id="ufsmall" class="form-text text-muted">UF</small><span>${dados[i - 1][1]}</span></div></div>`)
                        .join('');
                    lista.innerHTML = gerarLista;
                })
        } else {
            window.alert("Insira um formato de CEP válido:\n --> 8 números")
        }
    } else {
        window.alert("Insira um formato de CEP válido:\n --> 8 números")
    }
}
function excluirCEP(num) {
    dados.splice(num, 1)

    const gerarLista = conte(inicio = 1, dados.length)
        .map(i => `<div id="resultados"><div id="cabecalho"><h3>${dados[i - 1][0]}</h3><button onclick="excluirCEP(${i - 1})">X</button></div><div id="local"><small id="lograsmall" class="form-text text-muted">Logradouro</small><span id="a" >${dados[i - 1][2]}</span><small id="bairrosmall" class="form-text text-muted">Bairro</small><span>${dados[i - 1][3]}</span><small id="localsmall" class="form-text text-muted">Localidade</small><span>${dados[i - 1][4]}</span><small id="ufsmall" class="form-text text-muted">UF</small><span>${dados[i - 1][1]}</span></div></div>`)
        .join('');
    lista.innerHTML = gerarLista;
}



