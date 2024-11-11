const inputField = document.querySelector(".task-input input");
const addButton = document.querySelector(".add-button");
const taskList = document.getElementById("task-list");
const emptySection = document.getElementById("empty-section");
const createdCount = document.querySelector(".created-count");

let taskCounter = 0;

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = inputField.value;

    if (taskText !== "") {
        const newTask = document.createElement("li");
        newTask.classList.add("task");

        // Criar o checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("hidden-checkbox");

        // Criar o círculo regular
        const circle = document.createElement("div");
        circle.classList.add("circle-regular");
        const circleImg = document.createElement("img");
        circleImg.src = "assets/CircleRegular.svg";
        circle.appendChild(circleImg);


        // Criar o parágrafo com o texto da tarefa
        const taskParagraph = document.createElement("p");
        taskParagraph.textContent = taskText;

        // Criar o ícone de lixeira
        const trash = document.createElement("div");
        trash.classList.add("trash-regular");
        const trashImg = document.createElement("img");
        trashImg.src = "assets/TrashRegular.svg";
        trash.appendChild(trashImg);

        // Adicionar um evento de clique à lixeira para remover o elemento pai
        trash.addEventListener("click", () => {
            taskList.removeChild(newTask); // Remove o <li> da lista de tarefas

            // Atualizar o contador de tarefas criadas
            taskCounter--;
            createdCount.textContent = taskCounter;

            // Verificar se a lista está vazia e exibir a seção "empty" se necessário
            if (taskCounter === 0) {
                taskList.style.display = "none";
                emptySection.style.display = "block";
            }
        });

        // Adicionar os elementos à <li>
        newTask.appendChild(checkbox);
        newTask.appendChild(circle);
        newTask.appendChild(taskParagraph);
        newTask.appendChild(trash);

        // Adicionar a nova tarefa à lista
        taskList.appendChild(newTask);

        // Exibir a seção de lista e esconder a seção "empty"
        emptySection.style.display = "none";
        taskList.style.display = "block";

        // Atualizar o contador de tarefas criadas
        taskCounter++;
        createdCount.textContent = taskCounter;

        // Limpar o campo de input
        inputField.value = "";
    }
}

// Adicionar a tarefa quando o botão for clicado
addButton.addEventListener("click", addTask);