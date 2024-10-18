document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const removeCheckedButton = document.getElementById('remove-checked-btn');
    
    let tasks = [];
    let completedCount = 0;

    // Function to update task count
    function updateTaskCount() {
        const doneTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;

        // Calculate the percentage of completed tasks
        const percentage = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

        // Update the task count text to show the percentage
        taskCount.textContent = `Completed: ${percentage}%`;
    }

    // Function to create new todo item
    function createTodoItem(text) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            if(task.completed) {
                span.classList.add('completed'); // Add class to strike through
            } else {
                span.classList.remove('completed'); // Remove class to remove strike through
            }
            updateTaskCount();
        });
        
        const span = document.createElement('span');
        span.textContent = text;

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.innerHTML = '✎';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit your task', task.text);
            if (newTaskText) {
                task.text = newTaskText;
                span.textContent = newTaskText;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '✖';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            tasks = tasks.filter(t => t !== task);
            updateTaskCount();
        });

        const task = { text, completed: false };
        tasks.push(task);

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);
        updateTaskCount();
    }

    // Event listener for Add button
    addButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText) {
            createTodoItem(taskText);
            todoInput.value = '';
        }else {
            alert('Please enter a task.'); // Alert the user if the input is empty
        }
    });

    // Event listener for Remove Checked button
    removeCheckedButton.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        Array.from(todoList.children).forEach(child => {
            if (child.querySelector('input[type="checkbox"]').checked) {
                todoList.removeChild(child);
            }
        });
        updateTaskCount();
    });
});
