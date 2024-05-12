const taskInput = document.getElementById("text");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = taskInput.value.trim();
  if (taskTitle === "") {
    alert("Please enter a task");
  } else {
    const listItem = document.createElement("li");
    listItem.innerHTML = taskTitle;
    taskList.appendChild(listItem);

    let span = document.createElement("span");
    span.innerHTML = "&times;";
    listItem.appendChild(span);
    taskInput.value = "";
    saveListData();
  }
});

taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveListData();
  }
  if (e.target.tagName === "SPAN") {
    const li = e.target.parentElement;
    li.remove();
    saveListData();
  }
});

function saveListData() {
  localStorage.setItem("taskList", taskList.innerHTML);
}

function showListData() {
  taskList.innerHTML = localStorage.getItem("taskList");
}

showListData();
