import page from './page';
import Projects from './projects';

const createEdit = (() => {
    const projects = new Projects();

    const addEvent = () => {
        initButtons()
    }

    const initButtons = () => {        
        
        const form = document.querySelector('form');

        window.addEventListener('click', displayForm);

        form.addEventListener('submit', handleForm);
    }

    const displayForm = (e) => {
        const addProjectBtn = document.querySelector('.user-project .add-project');
        const formProject = document.querySelector('form .form-project');
        const deleteProjectBtn = document.querySelector('.form-project button[type="button"]');
   
        const addTodoBtn = document.querySelector('.todo-list .add-todo');
        const formTodo = document.querySelector('aside form .form-todo');
        const deleteTodoBtn = document.querySelector('.form-todo button[type="button"]');
 
        if((addProjectBtn.contains(e.target) || formProject.contains(e.target)) 
            && !deleteProjectBtn.contains(e.target)
            ){
            openForm(formProject);
            page.navWidth('0rem');    
        }
        else if((addTodoBtn.contains(e.target) || formTodo.contains(e.target)) 
            && !deleteTodoBtn.contains(e.target)
            ){
            openForm(formTodo);
            page.navWidth('0rem');
        }
        else if(!formProject.contains(e.target) || !formTodo.contains(e.target)){
            closeForm();
        } 
    }

    const openForm = (form) => {
        document.querySelector('aside').classList.remove('not-active');
        document.querySelector('aside').classList.add('overlay');

        form.classList.remove('not-active');
    }

    const closeForm = () => {
        document.querySelector('aside').classList.add('not-active');
        document.querySelector('aside').classList.remove('overlay');

        document.querySelector('form .form-project').classList.add('not-active');
        document.querySelector('aside form .form-todo').classList.add('not-active');

        errMsg('', 1);
        errMsg('', 2);
    }

    const handleForm = (e) => {
        e.preventDefault();
        const formProject = document.querySelector('form .form-project');
        const formTodo = document.querySelector('form .form-todo');
        const projectTitle = document.querySelector('.user-list .project-title');

        const projectName = e.target[0];
        const todoTitle = e.target[3];
        const todoDate = e.target[4];
        const todoImportant = e.target[5];


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
                errMsg('Invalid Project', 1);
            }
        }
        if(formTodo.classList.contains('not-active') === false){
            if(todoTitle.value !== '' && todoDate.value !== ''){
                projects.addTodo(todoTitle.value, 
                                 todoDate.value, false, 
                                 todoImportant.checked, 
                                 projectTitle.id);
                renderTodos(projectTitle.id);
                todoTitle.value = '';
                todoDate.value = '';
                todoImportant.checked = false;  
                closeForm();
                page.loadPage();
            }
            else{
                return errMsg('Invalid Todo', 2);
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
                <i class="fa-solid fa-ellipsis-vertical"></i>
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
                    <i class="fa-solid fa-ellipsis-vertical"></i>    
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
            const lastItem = allItems[allItems.length - 1];
            setTimeout(() => {
                lastItem.classList.add('show');
            }, 10);
        })
    }

    const errMsg = (text, target) => {
        document.querySelector(`.err-msg${target}`).innerText = text;
    }


    const selected = (node) => {
        const selected = document.querySelector('.selected');
        selected.classList.remove('.selected');
        node.classList.add('selected');
    }

    return {addEvent, renderProject, renderTodos}
})();

export default createEdit;