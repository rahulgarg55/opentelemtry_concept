document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Fetch tasks
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToList(task);
            });
        });

    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, completed: false })
        })
        .then(response => response.json())
        .then(task => {
            addTaskToList(task);
            taskForm.reset();
        });
    });

    // Helper function to add task to list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = `${task.title}: ${task.description}`;
        taskList.appendChild(li);
    }
});
