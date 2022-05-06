import Theme from './theme';
import Collection from './collection';
import { addDays, format, isEqual, isWithinInterval, parseISO } from "date-fns";

const ui = (() => {
    const theme = new Theme();
    const collection = new Collection();

    const defaultProject = document.querySelectorAll('.default-project ul li');

    const formProject = document.querySelector('aside .form-project');
    const addProjectBtn = document.querySelector('.user-project .add-project');
    const deleteProjectBtn = document.querySelector('.form-project button[type="button"]');
    const projectName = document.querySelector('input[name="project-name"]');

    const formTodo = document.querySelector('aside .form-todo');
    const addTodoBtn = document.querySelector('.todo-list .add-todo');
    const deleteTodoBtn = document.querySelector('.form-todo button[type="button"]');
    const todoTitle = document.querySelector('input[name="todo-title"]');
    const todoDate = document.querySelector('input[name="todo-date"]');
    const todoImportant = document.querySelector('input[name="todo-important"]');

    const aside = document.querySelector('aside');

    const projectTitle = document.querySelector('.project-title');
    const todoCount = document.querySelector('#todo-count');
    const userProject = document.querySelector('.user-project ul');
    const userList = document.querySelector('.user-list ul');

    let id = "";

    // Loads page
    const initPage = () => {
        loadMode(theme.getCurrentMode());
        initPageEvents();
        collection.restoreProjects();
        getTodos('all-task');
        renderProject()
    }

    // Loads page events
    const initPageEvents = () => {
        document.querySelector('.theme').onclick = () => switchMode();
        document.querySelector('.fa-bars').onclick = () => sideNav();
        document.querySelector('.fa-xmark').onclick = () => sideNav();
        window.addEventListener('click', displayForm);
        addProjectBtn.onclick = () => formProject.addEventListener('submit', handleCreateProject);
        addTodoBtn.onclick = () => formTodo.addEventListener('submit', handleCreateTodo);
        defaultProject.forEach((project) => {
            addTodoBtn.classList.add('not-active');
            project.addEventListener('click', () => {
                selectProject(project);
                getTodos(project.id);
            })
        })
    }

    // Loads project and todo events
    const initProjectEvents = () => {
        const userProject = document.querySelectorAll('.user-project ul li'); 
        userProject.forEach((project) => {
            if(project.innerText == projectTitle.innerText) project.classList.add('selected');
            project.addEventListener('click', (e) => {
                if(e.target.classList.contains('fa-pen-to-square')){
                    projectName.value = `${project.innerText}`;
                    openForm(formProject);
                    deleteProjectBtn.addEventListener('click', handleDeleteProject);
                    formProject.addEventListener('submit', handleEditProject);
                    document.querySelector('.form-project button[type="submit"]').innerText = 'Save';
                    document.querySelector('.form-project button[type="button"]').innerText = 'Delete';
                }
                selectProject(project);
                renderTodos(project.id);    
            });
        });
    }

    const initTodoEvents = () => {
        const userTodos = document.querySelectorAll('.user-list ul li');
        userTodos.forEach((todo) => {
            todo.addEventListener('click', (e) => {
                id = e.target.id;
                if(e.target.classList.contains('fa-circle-check')){
                    e.target.classList.toggle('todo-check');
                    collection.todoCheck(todo.id);
                    collection.sortTodos();
                    const prjId = getSelectedId();
                    if(prjId == 'all-task' || prjId == 'today' || prjId == 'this-week' || prjId == 'important'){
                        getTodos(getSelectedId());
                    } else{
                        renderTodos(getSelectedId());
                    }
                }
                if(e.target.classList.contains('fa-star')){
                    e.target.classList.toggle('todo-star');
                    collection.todoStar(todo.id);
                    collection.sortTodos();
                    const prjId = getSelectedId();
                    if(prjId == 'all-task' || prjId == 'today' || prjId == 'this-week' || prjId == 'important'){
                        getTodos(getSelectedId());
                    } else{
                        renderTodos(getSelectedId());
                    }
                }
                if(e.target.classList.contains('fa-pen-to-square')){
                    collection.projects.forEach((prj) => {
                        prj.todos.forEach((prjTodo) => {
                            if(prjTodo.id == todo.id){
                                todoTitle.value = `${prjTodo.title}`;
                                todoDate.value = `${prjTodo.date}`;
                                todoImportant.checked = prjTodo.important;                
                            }                                
                        })
                    })
                    openForm(formTodo);
                    deleteTodoBtn.addEventListener('click', handleDeleteTodo);
                    formTodo.addEventListener('submit', handleEditTodo);
                    document.querySelector('.form-todo button[type="submit"]').innerText = 'Save';
                    document.querySelector('.form-todo button[type="button"]').innerText = 'Delete';
                }
            });
        });
    }

    const sortRender = () => {
        collection.sortTodos();
        renderTodos(getSelectedId());
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
        if(projectCollection.offsetWidth == 336){
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

        deleteProjectBtn.removeEventListener('click', handleDeleteProject);
        formProject.removeEventListener('submit', handleCreateProject);
        formProject.removeEventListener('submit', handleEditProject);
        document.querySelector('.form-project button[type="submit"]').innerText = 'Add';
        document.querySelector('.form-project button[type="button"]').innerText = 'Cancel';

        deleteTodoBtn.removeEventListener('click', handleDeleteTodo);
        formTodo.removeEventListener('submit', handleCreateTodo);
        formTodo.removeEventListener('submit', handleEditTodo);
        document.querySelector('.form-todo button[type="submit"]').innerText = 'Add';
        document.querySelector('.form-todo button[type="button"]').innerText = 'Cancel';

        resetForm();
    }

    const handleCreateProject = (e) => {
        e.preventDefault();
        if(collection.foundProject(projectName.value)){
            errMsg('form-project', 'Project Already Exist'); 
        } else if(projectName.value !== '' ){
            collection.addProject(projectName.value);
            renderProject();
            closeForm();
        } else{
            errMsg('form-project', 'Invalid Project');
        }
    }

    const handleEditProject = (e) => {
        e.preventDefault();
        const nameValue = projectName.value; 
        if(collection.foundProject(nameValue) && nameValue !== document.querySelector('.selected').innerText){
            errMsg('form-project', 'Project Already Exist');            
        } else if(projectName !== ''){
            collection.editProject(projectName.value, getSelectedId());
            displayTitle(projectTitle, nameValue, getSelectedId());
            renderProject();
            closeForm();
        } else{
            errMsg('form-project', 'Invalid Project');
        }
    }

    const handleDeleteProject = () => {
        collection.deleteProject(document.querySelector('.selected').id);
        renderProject();
        selectProject(document.querySelector('#all-task'));
        getTodos(document.querySelector('#all-task').id);
    }

    // 
    const handleCreateTodo = (e) => {
        e.preventDefault();
        const selected = document.querySelector('.selected');
        if(todoTitle.value !== ''){
            const toDate = todoDate.value == '' ? 'No Due Date' : todoDate.value;
            collection.addTodo(todoTitle.value, toDate, todoImportant.checked, getSelectedId());
            sortRender();
            closeForm();
        } else{
            errMsg('form-todo', 'Invalid Todo');
        }
    }

    const handleEditTodo = (e) => {
        e.preventDefault();
        if(todoTitle.value !== ''){
            const toDate = todoDate.value == '' ? 'No Due Date' : todoDate.value;
            collection.editTodo(todoTitle.value, toDate, todoImportant.checked, id);
            collection.sortTodos();
            const prjId = getSelectedId();
            if(prjId == 'all-task' || prjId == 'today' || prjId == 'this-week' || prjId == 'important'){
                getTodos(getSelectedId());
            } else{
                renderTodos(getSelectedId());
            }
            closeForm();
        } else{
            errMsg('form-todo', 'Invalid Todo');
        }
    }

    const handleDeleteTodo = () => {
        collection.deleteTodo(id);
        const prjId = getSelectedId();
        if(prjId == 'all-task' || prjId == 'today' || prjId == 'this-week' || prjId == 'important'){
            getTodos(getSelectedId());
        } else{
            renderTodos(getSelectedId());
        }
    }

    const resetForm = () => {
        projectName.value = '';
        todoTitle.value = '';
        todoDate.value = '';
        todoImportant.checked = false;
    }

    const errMsg = (target, text) => {
        const error = document.querySelector(`.${target} .err-msg`);
        error.innerText = text;
        setTimeout(() => error.innerText = '', 3000);
    }

    const addProject = (project) => {
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
        collection.saveProjects();
        userProject.innerHTML = '';
        collection.projects.forEach((project) => {
            if(project.title == 'All Tasks' || project.title == 'Today' ||
               project.title == 'This Week' || project.title == 'Important') return;
            userProject.innerHTML += addProject(project);
        });
        addShow('.user-project ul li');
        initProjectEvents();
    }

    const renderTodos = (projectId) => {
        collection.saveProjects();
        userList.innerHTML = '';
        let count = 0;
        const project = collection.projects.find((project) => project.id == projectId);
        project.todos.forEach((todo) => {
            if(todo.completed) count++;
            userList.innerHTML += addTodo(todo);
        });
        addShow('.user-list ul li');
        addTodoBtn.classList.remove('not-active');
        initTodoEvents();
        countTodos(count);
    }

    const addShow = (targets) => {
        const allItems = document.querySelectorAll(targets);
        allItems.forEach((item, index) => {
            item.style.opacity = '0';
            setTimeout(() => item.classList.add('show'), index * 75);
        });
    }

    const displayTitle = (target, title, id) => {
        target.id = id;
        target.innerText = `${title}`;
    }

    const selectProject = (target) => {
        displayTitle(projectTitle, target.innerText, target.id);
        if(document.querySelector('.selected') !== null){
            document.querySelector('.selected').classList.remove('selected');
        }
        target.classList.add('selected');
    }

    const getSelectedId = () => document.querySelector('.selected').id;

    const countTodos = (size) => {
        const length = document.querySelectorAll('.todo-item').length;
        if(length < 1){
            todoCount.innerText = `Folder is Empty`;
        } else if(size == length){
            todoCount.innerText = `All Tasks Completed`;
        } else{
            let todo = length - size;
            todoCount.innerText = `${todo} ${todo == 1 ? 'Task' : 'Tasks'} Remaining`;
        }
    }

    const getTodos = (id) => {
        userList.innerHTML = '';
        if(id == 'all-task'){
            collection.getAllTodos();
            displayTodos('All Tasks');
        };
        if(id == 'today'){
            collection.getTodayTodos();
            displayTodos('Today');
        }
        if(id == 'this-week'){
            collection.getTodosThisWeek();
            displayTodos('This Week');
        };
        if(id == 'important'){
            collection.getImportantTodos();
            displayTodos('Important');
        };
        initTodoEvents();
        addTodoBtn.classList.add('not-active');
    }

    const displayTodos = (projectTitle) => {
        let count = 0;
        collection.sortTodos();
        collection.saveProjects();
        collection.projects.forEach((prj) => {
            if(prj.title == projectTitle){
                prj.todos.forEach((todo) => {
                    if(todo.completed) count++;
                    userList.innerHTML += addTodo(todo);
                    addShow('.user-list ul li');
                });    
            }
        })   
        countTodos(count);        
    }

    return {initPage};
})();

export default ui;
