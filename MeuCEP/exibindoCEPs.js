//Dados
var dados=[];
var tudo;

function conte(inicio,fim){
    let result = [] 
    for(i=inicio; i<=fim; i++){
        result.push(i)
    }
    return result
}

function exibirCEP(){

    const lista = document.querySelector("#lista");

    var cep=document.getElementById("cep").value;
   
    console.log(cep);
    
    var cidade = "Ceará-Mirim"
    var estado = "RN"
    var bairro = "Centro"

    var localidade=[cep, cidade, estado, bairro]
    
    dados.push(localidade)

    const gerarLista=conte(inicio=1,dados.length)
        .map(i=>`<div id="resultados"><div id="cabecalho"><h3>${dados[i-1][0]}</h3><button onclick="excluirCEP(${i-1})">X</button></div><div id="local"><span>${dados[i-1][1]}/${dados[i-1][2]}, ${dados[i-1][3]}</span></div></div>`)
        .join('');
    lista.innerHTML = gerarLista;
    
}

function excluirCEP(num){
    dados.splice(num, 1)
    
    const gerarLista=conte(inicio=1,dados.length)
        .map(i=>`<div id="resultados"><div id="cabecalho"><h3>${dados[i-1][0]}</h3><button onclick="excluirCEP(${i-1})">X</button></div><div id="local"><span>${dados[i-1][1]}/${dados[i-1][2]}, ${dados[i-1][3]}</span></div></div>`)
        .join('');
    lista.innerHTML = gerarLista;
}



