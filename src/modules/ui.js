import Theme from './theme';
import Collection from './collection';
import uiContent from './uiContent';
import { format } from 'date-fns';

const ui = (() => {

    // Get all necessary DOM nodes
    const aside = document.querySelector('aside');
    const projectTitle = document.querySelector('.project-title');
    const defaultProject = document.querySelectorAll('.default-project ul li');

    const formProject = document.querySelector('aside .form-project');
    const submitProjectBtn = document.querySelector('.form-project button[type="submit"]');
    const buttonProjectBtn = document.querySelector('.form-project button[type="button"]');
    const projectName = document.querySelector('input[name="project-name"]');
    const addProjectBtn = document.querySelector('.user-project .add-project');

    const formTodo = document.querySelector('aside .form-todo');
    const submitTodoBtn = document.querySelector('.form-todo button[type="submit"]');
    const buttonTodoBtn = document.querySelector('.form-todo button[type="button"]');
    const todoTitle = document.querySelector('input[name="todo-title"]');
    const todoDate = document.querySelector('input[name="todo-date"]');
    const todoImportant = document.querySelector('input[name="todo-important"]');
    const addTodoBtn = document.querySelector('.todo-list .add-todo');
    
    // Declare necessary variables
    const theme = new Theme();
    const collection = new Collection();
    let id = '';
    
    // Loads page
    const initPage = () => {
        loadMode(theme.getCurrentMode());
        collection.restoreProjects();
        uiContent.renderProjects(collection);
        uiContent.getTodos(collection, uiContent.getSelected().id);
        initPageEvents();
    }

    // Loads page events
    const initPageEvents = () => {
        document.querySelector('.theme').onclick = () => switchMode();
        document.querySelector('.fa-bars').onclick = () => sideNav();
        document.querySelector('.fa-xmark').onclick = () => sideNav();
        window.addEventListener('click', displayForm);
        window.addEventListener('submit', (e) => e.preventDefault());
        addProjectBtn.onclick = () => formProject.addEventListener('submit', handleCreateProject);
        addTodoBtn.onclick = () => formTodo.addEventListener('submit', handleCreateTodo);
        defaultProject.forEach((project) => {
            project.onclick = () => {
                uiContent.selectProject(project);
                uiContent.getTodos(collection, project.id);
                initTodoEvents();
                addTodoBtn.classList.add('not-active');
            }
        });
        initProjectEvents();
        initTodoEvents();
    }

    // Loads project list item events
    const initProjectEvents = () => {
        const userProjects = document.querySelectorAll('.user-project ul li'); 
        userProjects.forEach((project) => {
            if(project.innerText == projectTitle.innerText) project.classList.add('selected');
            project.addEventListener('click', (e) => {
                if(e.target.classList.contains('fa-pen-to-square')){
                    projectName.value = `${project.innerText}`;
                    openForm(formProject);
                    formProject.addEventListener('submit', handleEditProject);
                    buttonProjectBtn.addEventListener('click', handleDeleteProject);
                    submitProjectBtn.innerText = 'Save';
                    buttonProjectBtn.innerText = 'Delete';
                }                     
                uiContent.selectProject(project);
                uiContent.renderTodos(collection, project.id);
                addTodoBtn.classList.remove('not-active');
                initTodoEvents();
            });
        });
    }

    // Loads todo list item events
    const initTodoEvents = () => {
        const userTodos = document.querySelectorAll('.user-list ul li');
        userTodos.forEach((todo) => {
            todo.addEventListener('click', (e) => {
                id = todo.id;
                if(e.target.classList.contains('fa-circle-check')){
                    e.target.classList.toggle('todo-check');
                    collection.todoCheck(todo.id);
                    collection.saveProjects();
                    uiContent.checkProjectId(collection);
                    initTodoEvents();
                } if(e.target.classList.contains('fa-star')){
                    e.target.classList.toggle('todo-star');
                    collection.todoStar(todo.id);
                    collection.saveProjects();
                    uiContent.checkProjectId(collection);
                    initTodoEvents();
                } if(e.target.classList.contains('fa-pen-to-square')){
                    collection.projects.forEach((prj) => {
                        prj.todos.forEach((prjTodo) => {
                            if(prjTodo.id == todo.id){
                                todoTitle.value = `${prjTodo.title}`;
                                todoDate.value = `${prjTodo.date}`;
                                todoImportant.checked = prjTodo.important;                
                            }                                
                        });
                    });
                    openForm(formTodo);
                    formTodo.addEventListener('submit', handleEditTodo);
                    buttonTodoBtn.addEventListener('click', handleDeleteTodo);
                    submitTodoBtn.innerText = 'Save';
                    buttonTodoBtn.innerText = 'Delete';
                }                
            });
        });
    }

    // Switches mode and loads mode
    const switchMode = () => {
        theme.switchMode();
        loadMode(theme.mode);
    }

    // Loads mode, change color-scheme in root
    const loadMode = (mode) => {
        const root = document.querySelector(':root');
        root.setAttribute('color-scheme', `${mode}`);
    }

    // Sidenav, change the width of it to close or open it
    const sideNav = () => {
        const projectCollection = document.querySelector('.project-collection');
        if(projectCollection.offsetWidth != 0){
            projectCollection.style.width = '0rem';
        } else{
            projectCollection.style.width = '21rem';
        }
    }

    // Displays form
    const displayForm = (e) => {
        if((eContains(e, 'add-project') || eContains(e, 'form-project')) && !eType(e, 'button')){
            openForm(formProject);
        } else if((eContains(e, 'add-todo') || eContains(e, 'form-todo')) && !eType(e, 'button')){
            openForm(formTodo);
        } else if(eContains(e, 'overlay') || eType(e, 'button')){
            closeForm();
        }        
    }
    
    // Check if e.target classList contains className
    const eContains = (e, className) => e.target.classList.contains(className);

    // Check if e.target type is typeName 
    const eType = (e, typeName) => e.target.type === typeName;

    // Opens form
    const openForm = (form) => {
        aside.classList.remove('not-active');
        form.classList.remove('not-active');
    }

    // Closes form
    const closeForm = () => {
        aside.classList.add('not-active');
        formProject.classList.add('not-active');
        formTodo.classList.add('not-active');

        formProject.removeEventListener('submit', handleCreateProject);
        formProject.removeEventListener('submit', handleEditProject);
        buttonProjectBtn.removeEventListener('click', handleDeleteProject);
        submitProjectBtn.innerText = 'Add';
        buttonProjectBtn.innerText = 'Cancel';

        formTodo.removeEventListener('submit', handleCreateTodo);
        formTodo.removeEventListener('submit', handleEditTodo);
        buttonTodoBtn.removeEventListener('click', handleDeleteTodo);
        submitTodoBtn.innerText = 'Add';
        buttonTodoBtn.innerText = 'Cancel';

        resetForm();
    }

    // Handles create project
    const handleCreateProject = () => {
        if(collection.titleTaken(projectName.value)){
            uiContent.createErrorText('form-project', 'Project Already Exist');
        } else if(projectName.value !== '' ){
            collection.addProject(projectName.value);
            collection.saveProjects();
            uiContent.renderProjects(collection);
            initProjectEvents();
            closeForm();
        } else{
            uiContent.createErrorText('form-project', 'Invalid Project');
        }
    }

    // Handles edit project
    const handleEditProject = () => {
        const nameValue = projectName.value; 
        if(collection.titleTaken(nameValue) && nameValue !== uiContent.getSelected().innerText){
            uiContent.createErrorText('form-project', 'Project Already Exist');
        } else if(projectName.value !== ''){
            collection.editProject(projectName.value, uiContent.getSelected().id);
            collection.saveProjects();
            uiContent.displayTitle(projectTitle, nameValue);
            uiContent.renderProjects(collection);
            initProjectEvents();
            closeForm();
        } else{
            uiContent.createErrorText('form-project', 'Invalid Project');
        }
    }

    // Handles delete project
    const handleDeleteProject = () => {
        collection.deleteProject(uiContent.getSelected().id);
        collection.saveProjects();
        uiContent.renderProjects(collection);
        uiContent.selectProject(document.querySelector('#all-tasks'));
        uiContent.getTodos(collection, document.querySelector('#all-tasks').id);
        initProjectEvents();
    }

    // Handles create todo
    const handleCreateTodo = () => {
        if(todoTitle.value !== ''){
            const toDate = todoDate.value == '' ? 'No Due Date' : format(new Date(todoDate.value), 'yyyy-MM-dd');
            collection.addTodo(todoTitle.value, toDate, todoImportant.checked, uiContent.getSelected().id);
            collection.saveProjects();
            uiContent.renderTodos(collection, uiContent.getSelected().id);
            initTodoEvents();    
            closeForm();
        } else{
            uiContent.createErrorText('form-todo', 'Invalid Todo');
        }
    }
    
    // Handles edit todo
    const handleEditTodo = () => {
        if(todoTitle.value !== ''){
            const toDate = todoDate.value == '' ? 'No Due Date' : todoDate.value;
            collection.editTodo(todoTitle.value, toDate, todoImportant.checked, id);
            collection.saveProjects();
            uiContent.checkProjectId(collection);
            initTodoEvents();
            closeForm();
        } else{
            uiContent.createErrorText('form-todo', 'Invalid Todo');
        }
    }

    // Handles delete todo
    const handleDeleteTodo = () => {
        collection.deleteTodo(id);
        collection.saveProjects();
        uiContent.checkProjectId(collection);
        initTodoEvents();
    }

    // Resets the values ​​of the forms
    const resetForm = () => {
        projectName.value = '';
        todoTitle.value = '';
        todoDate.value = '';
        todoImportant.checked = false;
    }

    return {initPage};
})();

export default ui;