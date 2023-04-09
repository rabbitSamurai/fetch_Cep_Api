async function findEstados() { 
    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`

    await fetch(url) //await e uma palavrachave que manda o arquivo esperar por algum retorno de funcao(nesse caso o arquivo desse site). a funcao fetch manda pegar o arquivo dessa url(a lista de TODOS os estados)
                    //no final desse codigo voce tera um objeto tipo promise.
        console.log(fetch)
        .then(response => response.json()) //o .then() decide oque sera feito com o objeto tipo promise e sempre deve ser usado com fetch.
                                            //aqui, o .then coloca o objeto tipo promise na var response, e converte ela num objeto promise tipo.json)
                                            // fetch() method returns a Promise object that is later used in a method chain with the then() method to handle the response from the server. 
        .then(data => {  //apos o processo do method response.json, ele devolve um objeto tipo promise json e nao uma variavel com o json dentro. essa resposta fica esperando o que sera feita com ela.
                         //aqui outro .then e chamado e coloca esse objeto dentro da var data para poder ser utilizado.
            data.sort((a, b) => (a.nome > b.nome) ? 1 : -1)// esta colocando os estados em ordem alfabetica

            let estados = '' //cria uma var string vazia
            data.sort().forEach(e => estados += `<option value=${e.sigla}>${e.nome}</option>`);//aqui esta criando no formato html cada estado e sua sigla, para ser mostrado corretamente 
                                                                                                //na rolagem do site e colocando na var estados.

            let uf = document.getElementById('uf');//pega a lista de rolagem pela id dela
            uf.innerHTML = estados;  //adiciona cada estado criado que passa pelo foreach.
        })
//essa funcao pegou o arquivo do site, compilou os dados em formato que fosse exibido cada estado como item de lista no site.
    }

findEstados()



function findByCep(e) {
    
    let cep = e.value //pega o valor digitado no input e coloca na var cep
    var url = `https://viacep.com.br/ws/${cep}/json/` // cria a var url com o cep digitado no input

    fetch(url)//fetch request igual o da primeira funcao
        .then(response => response.json())
        .then(data => {//aqui ele pega o objeto promise devolvido pela funcao .json() e chama uma funcao, passando o obj como argumento.
            preencheInputsEndereco(data)
        })
}

const preencheInputsEndereco = async data => { //arrow function para preencher o endereco automaticamente

    if (data.uf) { //?
        await getCidades(data.uf)//ele quer pegar as cidades do distrito aqui
    }

    let logradouro = document.getElementById('logradouro'); //pega as tags do documento pego pelo site
    let complemento = document.getElementById('complemento');
    let bairro = document.getElementById('bairro');
    let localidade = document.getElementById('localidade');
    let uf = document.getElementById('uf');

    logradouro.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    localidade.value = data.localidade;
    uf.value = data.uf;

    document.getElementById('numero').focus();
}

const getCidades = async uf => {
    await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
        .then(response => response.json())
        .then(data => {
            // ordenar pelo nome
            data.sort((a, b) => (a.nome > b.nome) ? 1 : -1)
            //preencheInputsEndereco(data)
            //console.log('cidades', data)
            
            let cidades = ''
            data.forEach(e => cidades += `<option value=${e.nome}>${e.nome}</option>`);
            console.log(cidades)

            let localidade = document.getElementById('localidade');
            localidade.innerHTML = cidades; 
        })
}

