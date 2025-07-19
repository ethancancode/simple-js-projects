document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;
        
        const newTask = {
            text,
            status: 'Ongoing'
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    };
    
    
    function createTaskElement(taskObj, index) {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'task-item-container';
        
        const li = document.createElement('li');
        li.textContent = taskObj.text;
        li.classList.add(taskObj.status);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        
        li.appendChild(removeBtn);
        containerDiv.appendChild(li);
        taskList.appendChild(containerDiv);
        
        li.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'button') return;
            createRadioGroup(containerDiv, li, taskObj);
        });
    };
    
    function createRadioGroup(containerDiv, li, taskObj) {
        const existing = containerDiv.querySelector('.status-controls');
        
        if (existing) {
            existing.remove();
            return;
        }
        
        const container = document.createElement('div');
        container.className = 'status-controls';
        container.style.display = 'flex';
        
        const radioGroupName = `status_${Date.now()}`;    
        const statuses = ['Inactive', 'Completed', 'Ongoing'];  
        statuses.forEach(status => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = radioGroupName;
            input.value = status;
            input.checked = taskObj.status === status;
            
            input.addEventListener('change', () => {
                li.classList.remove('Inactive', 'Completed', 'Ongoing');
                li.classList.add(status);
                taskObj.status = status;
                saveTasks();
            });
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(`${status}`));
            container.appendChild(label);
        });
        
        containerDiv.appendChild(container);
    };
    
    
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => createTaskElement(task, index));
    };
    
    renderTasks();
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
