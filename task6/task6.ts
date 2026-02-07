interface Task {
  id: number;
  text: string;
  completed: boolean;
}

document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("taskInput") as HTMLInputElement;
  const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
  const list = document.getElementById("taskList") as HTMLUListElement;

  let tasks: Task[] = [];

  addBtn.onclick = () => {
    if (input.value.trim() === "") return;

    tasks.push({
      id: Date.now(),
      text: input.value,
      completed: false
    });

    input.value = "";
    render();
  };

  function render(): void {
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      const li = document.createElement("li");

      const text = document.createElement("span");
      text.textContent = task.text;
      if (task.completed) text.classList.add("completed");

      const btnDiv = document.createElement("div");
      btnDiv.className = "task-buttons";

      // ✅ MARK COMPLETE
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Mark Complete";
      completeBtn.onclick = () => {
        task.completed = true;
        render();
      };

      // ↩ MARK INCOMPLETE
      const incompleteBtn = document.createElement("button");
      incompleteBtn.textContent = "Mark Incomplete";
      incompleteBtn.onclick = () => {
        task.completed = false;
        render();
      };

      // ✏ EDIT
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit task", task.text);
        if (newText && newText.trim()) {
          task.text = newText;
          render();
        }
      };

      // ❌ DELETE
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        tasks = tasks.filter(t => t.id !== task.id);
        render();
      };

      btnDiv.append(completeBtn, incompleteBtn, editBtn, deleteBtn);
      li.append(text, btnDiv);
      list.appendChild(li);
    }
  }
});
