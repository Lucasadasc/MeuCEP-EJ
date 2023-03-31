//Dados
let dados = [];

let input = document.getElementById("cep");
const lista = document.querySelector("#lista");

input.addEventListener("input", function (e) {
  let { value } = e.target;
  value = value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
  input.value = value;
});

async function buscar_cep(cep) {
  let numeros_cep = cep.replace(/\D/g, "");
  let esta_valido = numeros_cep.length == 8 && isNaN(numeros_cep) == false;

  if (esta_valido) {
    try {
      let response = await fetch(
        `https://viacep.com.br/ws/${numeros_cep}/json`
      );

      let data = await response.json();
      let { uf, logradouro, bairro, localidade } = data;
      let local = { cep, uf, logradouro, bairro, localidade };

      return {
        erro: false,
        mensagem: "Cep encontrado com sucesso.",
        local: local,
      };
    } catch (error) {
      return {
        erro: true,
        mensagem: "Erro de busca cep invalido.",
        local: {},
      };
    }
  } else {
    return {
      erro: true,
      mensagem: "Insira um formato de CEP válido:\n --> 8 números",
      local: {},
    };
  }
}

function excluirCEP(cep) {
  dados = dados.filter((cidade) => cidade.cep != cep);
  return dados;
}

function criar_html(cidade) {
  return `
  <div id="resultados" class="card" style="width: 20rem;">
   <div id="cabecalho">
      <h3>${cidade.cep}</h3>
      <button class="btn btn-danger remover" id="${cidade.cep}">X</button>
   </div>
   <div id="local">
    <small id="lograsmall" class="form-text text-muted">Logradouro</small><span id="a">${cidade.logradouro}</span><small id="bairrosmall" class="form-text text-muted">Bairro</small><span>${cidade.bairro}</span>
    <small id="localsmall" class="form-text text-muted">Localidade</small><span>${cidade.localidade}</span><small id="ufsmall" class="form-text text-muted">UF</small><span>${cidade.uf}</span>
   </div>
  </div>
  `;
}

function renderHTML(cidades) {
  lista.innerHTML = "";
  let html = ``;

  for (const cidade of cidades) {
    html += criar_html(cidade);
  }

  html = html.trim();

  lista.innerHTML = html;

  if (lista.innerHTML.length > 0) {
    let remover = document.querySelector(".remover");
    remover.addEventListener("click", function () {
      dados = excluirCEP(this.id);
      renderHTML(dados);
    });
  }
}

let submit = document.querySelector("#pesquisar");

submit.addEventListener("click", async function () {
  let cep_digitado = input.value;
  let response = await buscar_cep(cep_digitado);

  if (!response.erro) {
    dados.unshift(response.local);
    renderHTML(dados);

    let remover = document.querySelector(".remover");
    remover.addEventListener("click", function () {
      dados = excluirCEP(this.id);
      renderHTML(dados);
    });
  } else {
    alert(response.mensagem);
  }
});
