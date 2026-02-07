document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("taskInput");
    var addBtn = document.getElementById("addBtn");
    var list = document.getElementById("taskList");
    var tasks = [];
    addBtn.onclick = function () {
        if (input.value.trim() === "")
            return;
        tasks.push({
            id: Date.now(),
            text: input.value,
            completed: false
        });
        input.value = "";
        render();
    };
    function render() {
        list.innerHTML = "";
        var _loop_1 = function (i) {
            var task = tasks[i];
            var li = document.createElement("li");
            var text = document.createElement("span");
            text.textContent = task.text;
            if (task.completed)
                text.classList.add("completed");
            var btnDiv = document.createElement("div");
            btnDiv.className = "task-buttons";
            // ✅ MARK COMPLETE
            var completeBtn = document.createElement("button");
            completeBtn.textContent = "Mark Complete";
            completeBtn.onclick = function () {
                task.completed = true;
                render();
            };
            // ↩ MARK INCOMPLETE
            var incompleteBtn = document.createElement("button");
            incompleteBtn.textContent = "Mark Incomplete";
            incompleteBtn.onclick = function () {
                task.completed = false;
                render();
            };
            // ✏ EDIT
            var editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = function () {
                var newText = prompt("Edit task", task.text);
                if (newText && newText.trim()) {
                    task.text = newText;
                    render();
                }
            };
            // ❌ DELETE
            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = function () {
                tasks = tasks.filter(function (t) { return t.id !== task.id; });
                render();
            };
            btnDiv.append(completeBtn, incompleteBtn, editBtn, deleteBtn);
            li.append(text, btnDiv);
            list.appendChild(li);
        };
        for (var i = 0; i < tasks.length; i++) {
            _loop_1(i);
        }
    }
});
