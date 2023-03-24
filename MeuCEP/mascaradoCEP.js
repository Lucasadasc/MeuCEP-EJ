const cepformatado = document.querySelector('input#cep')

cepformatado.addEventListener('keypress', () => { 
    let quantnumerosdigitados = cepformatado.value.length
    
    if (quantnumerosdigitados === 2) {
        cepformatado.value = cepformatado.value+'.'
    } else if (quantnumerosdigitados === 6) {
        cepformatado.value = cepformatado.value+'-'
    }
})
