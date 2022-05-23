const uiContent = (() => {

    // Declare necessary variables
    let timer;

    // Create project list item
    const createProjectElement = (project) => {
        return(
            `<li class="project-item" id="${project.id}">
                <span class="project-text">
                    <i class="fa-solid fa-calendar-check"></i>
                    <span>${project.title}</span>
                </span>
                <i class="fa-solid fa-pen-to-square"></i>
            </li>`     
        );
    }

    // Create todo list item
    const createTodoElement = (todo) => {
        return(
            `<li class="todo-item" id="${todo.id}">
                <div class="todo-text">
                    <i class="fa-solid fa-circle-check ${todo.completed ? "todo-check" : null}"></i>
                    <span class="${todo.completed ? "strike" : null}">${todo.title}</span>
                </div>
                <div class="todo-plan ${todo.completed ? "strike" : null}">
                    <i class="fa-solid fa-calendar-week"></i>
                    <span>${todo.date}</span>    
                </div>
                <div class="todo-icon">
                    <i class="fa-solid fa-star ${todo.important ? "todo-star" : null}"></i>
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
            </li>`
        );
    }

    // Render user created projects
    const renderProjects = (collection) => {
        const userProject = document.querySelector('.user-project ul');
        userProject.innerHTML = '';
        collection.projects.forEach((project) => {
            if(project.title == 'All Tasks' || project.title == 'Today' ||
               project.title == 'This Week' || project.title == 'Important') return;
            userProject.innerHTML += createProjectElement(project);
        });
        addShow('.user-project ul li');
    }

    // Render todos from the selected projectId
    const renderTodos = (collection, projectId) => {
        const todoCount = document.querySelector('#todo-count');
        const userList = document.querySelector('.user-list ul');
        userList.innerHTML = '';
        let count = 0;
        const project = collection.projects.find((project) => project.id == projectId);
        project.todos.forEach((todo) => {
            if(todo.completed) count++;
            userList.innerHTML += createTodoElement(todo);
        });
        addShow('.user-list ul li');
        countTodos(todoCount, count);
    }

    // Create error text with a setTimeout
    const createErrorText = (target, text) => {
        const error = document.querySelector(`.${target} .err-msg`);
        error.innerText = text;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            error.innerText = '';
        }, 2500);
    }

    // Count the todos
    const countTodos = (target, count) => {
        const length = document.querySelectorAll('.todo-item').length;
        if(length < 1){
            target.innerText = `Folder is Empty`;
        } else if(count == length){
            target.innerText = `All Tasks Completed`;
        } else{
            const todo = length - count;
            target.innerText = `${todo} ${todo == 1 ? 'Task' : 'Tasks'} Remaining`;
        }
    }

    // Add the class animation .show to a list item
    const addShow = (targets) => {
        document.querySelectorAll(targets).forEach((item, index) => {
            item.style.opacity = '0';
            setTimeout(() => item.classList.add('show'), index * 75);
        });
    }

    // Display the projects' title
    const displayTitle = (target, title) => target.innerText = `${title}`;

    // Add the class .selected to a clicked project list item
    const selectProject = (target) => {
        displayTitle(document.querySelector('.project-title'), target.innerText);
        if(document.querySelector('.selected') !== null){
            document.querySelector('.selected').classList.remove('selected');
        }
        target.classList.add('selected');
    }

    // Get only the DOM node that has the .selected class
    const getSelected = () => document.querySelector('.selected');

    // Render only the default/already created home projects
    const renderHomeProjects = (collection, projectTitle) => {
        let count = 0;
        const todoCount = document.querySelector('#todo-count');
        const userList = document.querySelector('.user-list ul');
        collection.sortTodos();
        collection.projects.forEach((prj) => {
            if(prj.title == projectTitle){
                prj.todos.forEach((todo) => {
                    if(todo.completed) count++;
                    userList.innerHTML += createTodoElement(todo);
                    addShow('.user-list ul li');
                });    
            }
        });
        document.querySelector('.todo-list .add-todo').classList.add('not-active');   
        countTodos(todoCount, count);
    }

    // Get the todos for all-tasks, today, this-week or important
    const getTodos = (collection, id) => {
        switch(id){
            case 'all-tasks':
                collection.getAllTodos();
                id = 'All Tasks';
                break;
            case 'today':
                collection.getTodayTodos();
                id = 'Today';
                break;
            case 'this-week':
                collection.getTodosThisWeek();
                id = 'This Week';
                break;
            case 'important':
                collection.getImportantTodos();
                id = 'Important';
                break;
            default:
                id = '';
        }
        document.querySelector('.user-list ul').innerHTML = '';
        renderHomeProjects(collection, id);
    }

    // Check what the project id is to render its todos
    const checkProjectId = (collection) => {
        const prjId = getSelected().id;
        if(prjId == 'all-tasks' || prjId == 'today' || prjId == 'this-week' || prjId == 'important'){
            getTodos(collection, getSelected().id);
        } else{
            renderTodos(collection, getSelected().id);
        }
    }

    return {
        renderProjects,
        renderTodos,
        createErrorText,
        displayTitle,
        selectProject,
        getSelected,
        getTodos,
        checkProjectId,
    }
})();

export default uiContent;