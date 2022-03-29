import page from './page';
import Projects from './projects';

const createEdit = (() => {
    const projects = new Projects();

    const addEvent = () => {
        initButtons()
    }

    const initButtons = () => {        
        const formProject = document.querySelector('aside .form-project');
        const formTodo = document.querySelector('aside .form-todo');
        const projectPen = document.querySelectorAll('.user-project ul li .fa-pen-to-square');

        window.addEventListener('click', displayForm);

        formProject.addEventListener('submit', handleFormProject);
        formTodo.addEventListener('submit', handleFormTodo);
    }

    const displayForm = (e) => {
        const addProjectBtn = document.querySelector('.user-project .add-project');
        const formProject = document.querySelector('aside .form-project');
        const deleteProjectBtn = document.querySelector('.form-project button[type="button"]');
   
        const addTodoBtn = document.querySelector('.todo-list .add-todo');
        const formTodo = document.querySelector('aside .form-todo');
        const deleteTodoBtn = document.querySelector('.form-todo button[type="button"]');
 
        if((addProjectBtn.contains(e.target) || formProject.contains(e.target)) 
            && !deleteProjectBtn.contains(e.target)
            ){
            openForm('.form-project');
            page.navWidth('0rem');    
        }
        else if((addTodoBtn.contains(e.target) || formTodo.contains(e.target)) 
            && !deleteTodoBtn.contains(e.target)
            ){
            openForm('.form-todo');
            page.navWidth('0rem');
        }
        else if(!formProject.contains(e.target) || !formTodo.contains(e.target)){
            closeForm();
        } 
    }

    const openForm = (form) => {
        document.querySelector('aside').classList.remove('not-active');
        document.querySelector('aside').classList.add('overlay');

        document.querySelector(`aside ${form}`).classList.remove('not-active');
    }

    const closeForm = () => {
        document.querySelector('aside').classList.add('not-active');
        document.querySelector('aside').classList.remove('overlay');

        document.querySelector('aside .form-project').classList.add('not-active');
        document.querySelector('aside .form-todo').classList.add('not-active');

        errMsg('', 'form-project');
        errMsg('', 'form-todo');
    }

    const handleFormProject = (e) => {
        e.preventDefault();
        const formProject = document.querySelector('aside .form-project');
        const projectTitle = document.querySelector('.user-list .project-title');

        const projectName = e.target[0];

        if(formProject.classList.contains('not-active') === false){
            if(projectName.value !== ''){
                projects.createProject(projectName.value);
                renderProject();
                renderTodos(projectTitle.id);
                projectName.value = '';    
                closeForm();
                page.loadPage();
            }
            else{
                errMsg('Invalid Project', 'form-project');
                setTimeout(() => errMsg('', 'form-project'), 2500);
            }
        }
    }

    const handleFormTodo = (e) => {
        e.preventDefault();
        const formTodo = document.querySelector('aside .form-todo');
        const projectTitle = document.querySelector('.user-list .project-title');

        const todoTitle = e.target[0];
        const todoDate = e.target[1];
        const todoImportant = e.target[2];

        if(formTodo.classList.contains('not-active') === false){
            if(todoTitle.value !== '' && todoDate.value !== ''){
                projects.addTodo(todoTitle.value, todoDate.value, todoImportant.checked, projectTitle.id);
                renderTodos(projectTitle.id);
                todoTitle.value = '';
                todoDate.value = '';
                todoImportant.checked = false;  
                closeForm();
                page.loadPage();
            }
            else {
                errMsg('Invalid Todo', 'form-todo');
                setTimeout(() => errMsg('', 'form-todo'), 2500);
            }
        }
    }

    const addProject = (project) => {
        const projectTitle = document.querySelector('.user-list .project-title');
        projectTitle.innerText = project.title;
        projectTitle.id = project.id;
        return(
            `<li class="project-item" id="${project.id}">
                <span class="project-text">
                    <i class="fa-solid fa-calendar-check"></i>
                    <span>${project.title}</span>
                </span>
                <i class="fa-solid fa-pen-to-square" id="${project.id}"></i>
            </li>`     
        );
    }

    const addTodo = (todo) => {
        return(
            `<li class="todo-item" id="${todo.id}">
                <div class="todo-text">
                    <i class="fa-solid fa-circle-check ${todo.completed ? "todo-check" : null}"></i>
                    <span>${todo.title}</span>
                </div>
                <div class="todo-plan">
                    <i class="fa-solid fa-calendar-week"></i>
                    <span>${todo.date}</span>    
                </div>
                <div class="todo-icon">
                    <i class="fa-solid fa-star ${todo.important ? "todo-star" : null}"></i>
                    <i class="fa-solid fa-pen-to-square" id="${todo.id}"></i>
                </div>
            </li>`
        );
    }
    
    const renderProject = () => {
        const userProject = document.querySelector('.user-project ul');
        userProject.innerHTML = '';
        projects.projects.forEach((project) => {
            userProject.innerHTML += addProject(project);
        })
    }

    const renderTodos = (projectId) => {
        const userList = document.querySelector('.user-list ul');
        userList.innerHTML = '';
        projects.projects.find((project) => project.id == projectId).todos.forEach((todo) => {
            userList.innerHTML += addTodo(todo);
            const allItems = document.querySelectorAll('.todo-item');
            allItems.forEach((item, index) => {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 75);
            })
        })
    }

    const errMsg = (text, target) => {
        document.querySelector(`.${target} .err-msg`).innerText = text;
    }

    return {addEvent, renderProject, renderTodos}
})();

export default createEdit;