var listaTarefas = []

function procurarTarefa(nome) {
    var tarefa, indice
    listaTarefas.forEach(function (item, index) {
        if (nome.toLowerCase() === item.tarefa.toLowerCase()) {
            tarefa = item
            indice = index
        }
    })
    return tarefa, indice
}


function carregarInformacoes() {
    // Alterar numTarefas adicionando a quantidade
    // De tarefas que tem no listaTarefas

    let concluidas = 0
    let naoConc = 0

    listaTarefas.forEach(function (tarefa) {
        if (tarefa.concluido == false) {
            concluidas += 1
            return
        }

        naoConc += 1
    })

    document.getElementById("numTarefas").innerHTML = concluidas
    document.getElementById("numConcluidas").innerHTML = naoConc

    // Verificar se tem item dentro da listaTarefas
    // Caso tenha remova o elemento com o id "semTarefas"
    // Caso não tenha remova o elemento o id "listaTarefas"
    if (listaTarefas.length === 0) {
        document.getElementById("semTarefas").style.display = "flex"
        document.getElementById("listaTarefas").style.display = "none"
    } else {
        document.getElementById("listaTarefas").style.display = "flex"
        document.getElementById("semTarefas").style.display = "none"
    }

    exibirListaTarefas()
}

// Executa a função
carregarInformacoes()

// Adicionar uma esculta no elemento do formula 
// Para quando enviar executar a ação de cadastrar
var formCadastro = document.getElementById("formCadastroTarefa")

formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault(); // BLOQUEA OS EVENTOS PADRÕES

    // Pegar os dados do formulario
    var dadosForm = new FormData(this)
    var tarefa = dadosForm.get("tarefa")

    if (tarefa.length <= 3 || tarefa == null) {
        return
    }

    for (var x = 0; x < listaTarefas.length; x++) {
        if (listaTarefas[x].tarefa == tarefa) {
            return
        }
    }

    var objSalva = {
        tarefa: tarefa,
        concluido: false
    }

    // Adicionar na lista o que a pessoa digitou
    listaTarefas.push(objSalva)

    // Executar a função para atualizar os dados
    carregarInformacoes()
})

function exibirListaTarefas() {
    var html = document.getElementById("listaTarefas")
    html.innerHTML = ""

    listaTarefas.forEach(function (item) {
        html.innerHTML += `
        <div id='${item.tarefa}' class="${item.concluido && "done" || ""}">
            <button onclick='ConcluirTarefa("${item.tarefa}")' title="Concluir Tarefa"></button>
            <p>${item.tarefa}</p>
            <button onclick='ExcluirTarefa("${item.tarefa}")' title="Excluir Tarefa">
                <img src="./assets/img/lixeira.png" alt="Icone de Excluir">
            </button>
        </div>
        `
    });

}

function ConcluirTarefa(tarefa) {
    var objTarefa, index = procurarTarefa(tarefa)
    listaTarefas[index].concluido = !listaTarefas[index].concluido

    carregarInformacoes()
}

function ExcluirTarefa(tarefa) {
    var objTarefa, indice = procurarTarefa(tarefa);
    listaTarefas.splice(indice)

    carregarInformacoes()
}