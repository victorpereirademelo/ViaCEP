// Inicio do Programa
const enderecos = [];

const recebeEventoForm = (evento) => {
    evento.preventDefault();

    const endereco = {
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        ibge: document.getElementById('ibge').value
    };

    limpa_formulário_cep();
    enderecos.push(endereco);

    console.log(enderecos);
}

const form = document.getElementById('form');
form.addEventListener('submit', recebeEventoForm);

// Limpa valores do formulário do cep
function limpa_formulário_cep() {
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
    document.getElementById('ibge').value = "";
}

// Atualiza os campos com os valores
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        document.getElementById('ibge').value = (conteudo.ibge);
    } else {
        // Cep não encontrado
        limpa_formulário_cep();
        alert("CEP não encontrado");
    }
}

function pesquisacep(valor) {
    // (/\D/g) Expressão regular(RegExp) para aceitar só números
    var cep = valor.replace(/\D/g, '');

    // Verifica se o campo cep possui valor informado
    if (cep != "") {

        // (/^[0-9]{8}$/) Expressão regular(RegExp) para validar o CEP
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP
        if (validacep.test(cep)) {

            // Preenche os campos "..." enquanto consulta webservice(base de dados)
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            document.getElementById('ibge').value = "...";

            // Cria um elemento javascript
            var script = document.createElement('script');

            // Sincroniza com o callback(base de dados)
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
            // Insere script no documento e carrega o conteúdo
            document.body.appendChild(script);
        } else {
            // CEP inválido
            limpa_formulário_cep();
            alert("Formato do CEP inválido");
        }

    } else {
        // CEP sem valor. limpa formulário
        limpa_formulário_cep();
    }

}

function meuEscopo(){
const form = document.querySelector('#form');
form.addEventListener('submit');

}