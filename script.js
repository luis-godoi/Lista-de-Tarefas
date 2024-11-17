const inputField = document.querySelector(".task-input input");
const addButton = document.querySelector(".add-button");
const taskList = document.getElementById("task-list");
const emptySection = document.getElementById("empty-section");
const createdCount = document.querySelector(".created-count");
const completedCount = document.querySelector(".completed-count");

let tasks = [];
let taskCounter = 0;
let checkedCounter = 0;

function addNewTask() {
    const newTask = {
        id: tasks.length + 1,
        text: inputField.value.trim(),
    };

    if (newTask.text !== "") {
        tasks.push(newTask);
        addTask(newTask);
        updateSectionDisplay();
    }

    inputField.value = "";  // Limpa o campo de input após adicionar a tarefa
}

addButton.onclick = () => {
    addNewTask();
};


inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addNewTask();
    }
});

// Função para adicionar uma nova tarefa
function addTask(newTask) {

    if (newTask.text !== "") {
        const newItem = document.createElement("li");
        newItem.classList.add("task");
        newItem.id = newTask.id;

        // Criar o círculo regular
        const circle = document.createElement("div");
        circle.classList.add("circle-regular");
        const circleImg = document.createElement("img");
        circleImg.src = "assets/CircleRegular.svg";
        circleImg.classList.add("circle-img");
        circle.append(circleImg);

        // Criar o parágrafo com o texto da tarefa
        const taskParagraph = document.createElement("p");
        taskParagraph.textContent = newTask.text;

        // Criar o ícone de lixeira
        const trash = document.createElement("div");
        trash.classList.add("trash-regular");
        const trashImg = document.createElement("img");
        trashImg.src = "assets/TrashRegular.svg";
        trashImg.classList.add("trash-img")
        trash.appendChild(trashImg);

        // Adicionar os elementos à <li>
        newItem.append(circle, taskParagraph, trash);

        // Adicionar a nova tarefa à lista
        taskList.append(newItem);

        // Atualizar o contador de tarefas criadas
        taskCounter++;
        createdCount.textContent = taskCounter;

        // Limpar o campo de input
        inputField.value = "";
    }
}

// Adicionar um evento de clique à lixeira para remover o elemento pai
taskList.addEventListener("click", function (event) {
    if(event.target.classList.contains("trash-img")) {
        const item = event.target.closest(".task");

        item.remove();
        taskCounter--;
        createdCount.textContent = taskCounter;
        updateSectionDisplay()

        const taskIndex = tasks.findIndex(task => task.id === parseInt(item.id)); // Remova a tarefa do array
        tasks.splice(taskIndex, 1);

        updateSectionDisplay()
    }
});

function updateSectionDisplay() {
    if (tasks.length === 0) {
        emptySection.style.display = "block";
        taskList.style.display = "none";
    } else {
        emptySection.style.display = "none";
        taskList.style.display = "block";
    }
}

taskList.addEventListener("click", function (event) {
    if (event.target.closest(".circle-regular")) {
        const item = event.target.closest(".task");

        item.classList.toggle("checked");

        if (item.classList.contains("checked")) {
            checkedCounter++;
        } else {
            checkedCounter--;
        }

        // Atualiza a exibição do número de tarefas "checked"
        completedCount.textContent = checkedCounter;
    }
});