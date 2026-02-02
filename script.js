const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;

/* TASK EVENTS */
function addTaskEvents(task) {
  task.addEventListener("dragstart", () => {
    dragElement = task;
  });

  task.querySelector(".delete").addEventListener("click", () => {
    task.remove();
    updateCount();
  });
}

/* COLUMN DRAG */
function addDragEventOncolumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("drag-hover");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-hover");
  });

  column.addEventListener("drop", () => {
    if (dragElement) {
      column.appendChild(dragElement);
      dragElement = null;
      updateCount();
    }
    column.classList.remove("drag-hover");
  });
}

addDragEventOncolumn(todo);
addDragEventOncolumn(progress);
addDragEventOncolumn(done);

/* COUNT */
function updateCount() {
  document.querySelectorAll(".board").forEach(board => {
    board.querySelector(".count").innerText =
      board.querySelectorAll(".task").length;
  });
}
updateCount();

/* MODAL */
const openModalBtn = document.getElementById("toggle-modal");
const modal = document.getElementById("task-modal");
const closeModalBtn = document.getElementById("close-modal");
const addTaskBtn = document.getElementById("add-task-btn");

openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.querySelector(".modal-bg").addEventListener("click", () => modal.classList.add("hidden"));

/* ADD TASK */
addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("task-title").value.trim();
  const desc = document.getElementById("task-desc").value.trim();
  if (!title) return;

  const task = document.createElement("div");
  task.className = "task";
  task.setAttribute("draggable", "true");
  task.innerHTML = `
    <h3>${title}</h3>
    <p>${desc}</p>
    <button class="delete">✕</button>
  `;

  addTaskEvents(task);
  todo.appendChild(task);
  modal.classList.add("hidden");
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  updateCount();
});
