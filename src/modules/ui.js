import { addDays, format, isEqual, isWithinInterval, parseISO } from "date-fns";
import Projects from './projects';
import Theme from './theme';

const ui = (() => {
    const theme = new Theme();
    const projects = new Projects();

    const themeIcon = document.querySelector('.theme');
    const openMenu = document.querySelector('.fa-bars');
    const closeMenu = document.querySelector('.fa-xmark');
    const projectCollection = document.querySelector('.project-collection');

    const defaultProject = document.querySelectorAll('.default-project ul li');

    const addProjectBtn = document.querySelector('.user-project .add-project');
    const formProject = document.querySelector('aside .form-project');
    const todoTitle = document.querySelector('input[name="todo-title"]');
    const todoDate = document.querySelector('input[name="todo-date"]');
    const todoImportant = document.querySelector('input[name="todo-important"]');
    const deleteProjectBtn = document.querySelector('.form-project button[type="button"]');

    const addTodoBtn = document.querySelector('.todo-list .add-todo');
    const formTodo = document.querySelector('aside .form-todo');
    const projectName = document.querySelector('input[name="project-name"]');
    const deleteTodoBtn = document.querySelector('.form-todo button[type="button"]');
    const aside = document.querySelector('aside');

    const projectTitle = document.querySelector('.project-title');
    const todoCount = document.querySelector('#todo-count');
    const userProject = document.querySelector('.user-project ul');
    const userList = document.querySelector('.user-list ul');

    let id = '';

    // Loads the page
    const loadPage = () => {
        loadTheme(getCurrentTheme());
        initButtons();   
    }

    // Add event listeners
    const initButtons = () => {        
        themeIcon.addEventListener('click', switchTheme);
        openMenu.addEventListener('click', () => {
            projectCollection.style.width == '21rem' ? sideNav('0rem') : sideNav('21rem');
        });
        closeMenu.addEventListener('click', () => sideNav('0rem'));

        window.addEventListener('click', displayForm);

        addProjectBtn.addEventListener('click', () => {
            formProject.addEventListener('submit', handleCreateProject);
        });

        addTodoBtn.addEventListener('click', () => {
            formTodo.addEventListener('submit', handleCreateTodo);    
        });

        defaultProject.forEach((project) => {
            addTodoBtn.classList.add('not-active');
            project.addEventListener('click', () => {
                selectProject(project);
                getTodos(project.id);
            });
        })
    }

    const initProjectButtons = () => {
        const userProject = document.querySelectorAll('.user-project ul li'); 
        userProject.forEach((project) => {
            if(projectTitle.id == project.id){
                project.classList.add('selected');
            }
            project.addEventListener('click', (e) => {
                if(e.target.classList.contains('fa-pen-to-square')){
                    document.querySelector('input[name="project-name"]').value = `${project.innerText}`;
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

    const initTodoButtons = () => {
        const userTodos = document.querySelectorAll('.user-list ul li');
        userTodos.forEach((todo, index) => {
            todo.addEventListener('click', (e) => {
                id = e.target.id;
                if(e.target.classList.contains('fa-circle-check')){
                    e.target.classList.toggle('todo-check');
                    todoCheck(index);
                }
                if(e.target.classList.contains('fa-star')){
                    e.target.classList.toggle('todo-star');
                    todoStar(index);
                }
                if(e.target.classList.contains('fa-pen-to-square')){
                    projects.projects.forEach((prj) => {
                        if(prj.id == document.querySelector('.selected').id){
                            prj.todos.forEach((todo) => {
                                if(todo.id == e.target.id){
                                    todoTitle.value = `${todo.title}`;
                                    todoDate.value = `${todo.date}`;
                                    todoImportant.checked = todo.important;                
                                }                                
                            })
                        }
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

    const todoCheck = (todoIndex) => {
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo, index) => {
                if(todoIndex == index){
                    if(todo.completed){
                        todo.completed = false;
                    } else{
                        todo.completed = true;
                    }    
                }
            })
        });
        sortTodos();  
    }

    const sortTodos = () => {
        projects.projects.forEach((prj) => {
            prj.todos.sort((a, b) => {
                if(a.completed && !b.completed) return 1;
                else if(!a.completed && b.completed) return -1;
                else if(a.important && !b.important) return -1;
                else if(!a.important && b.important) return 1;
                else if(a.date > b.date) return 1;
                else if(a.date < b.date) return -1;
                else return 0;
            })
        });
        renderTodos(projectTitle.id);            
    }

    const todoStar = (todoIndex) => {
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo, index) => {
                if(todoIndex == index){
                    if(todo.important){
                        todo.important = false;
                    } else{
                        todo.important = true;
                    }    
                }
            })
        });
        sortTodos();    
    }

    // Switches theme
    const switchTheme = () => {
        theme.switchMode();    
        loadTheme(theme.mode);
        theme.saveMode();
    }

    // Gets the current theme
    const getCurrentTheme = () => {        
        if(theme.restoreMode()){
            return theme.mode = theme.restoreMode();
        }
        // matchMedia method supported
        else if(window.matchMedia){
            // OS theme setting detected as dark
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                theme.mode = 'dark';
            } else{
                theme.mode = 'light';
            }
        }
    }
    
    // loads theme
    const loadTheme = (theme) => {
        const root = document.querySelector(':root');
        root.setAttribute('color-scheme', `${theme}`); 
    }

    // Opens,Closes project collection
    const sideNav = (width) => projectCollection.style.width = `${width}`;

    // Displays form
    const displayForm = (e) => { 
        if((addProjectBtn.contains(e.target) || formProject.contains(e.target))
            && !deleteProjectBtn.contains(e.target) 
            ){
            openForm(formProject);
        }
        else if((addTodoBtn.contains(e.target) || formTodo.contains(e.target))
            && !deleteTodoBtn.contains(e.target)
            ){
            openForm(formTodo);
        }
        else if(deleteProjectBtn.contains(e.target) || deleteTodoBtn.contains(e.target)
            || aside.contains(e.target) 
            ){
            closeForm();
        }
    }

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
        if(projects.exists(projectName.value)){
            errMsg('form-project', 'Project Already Exist');            
        } else if(projectName.value !== '' ){
            projects.createProject(projectName.value);
            renderProject();
            closeForm();
        } else{
            errMsg('form-project', 'Invalid Project');
        }
    }

    const handleEditProject = (e) => {
        e.preventDefault();
        if(projects.exists(projectName.value) && projectName.value !== projectTitle.innerText){
            errMsg('form-project', 'Project Already Exist');            
        } else if(projectName !== ''){
            projects.editProject(projectName.value, projectTitle.id);
            renderProject();
            displayTitle(projectTitle, projectName.value, projectTitle.id)
            renderTodos(projectTitle.id);
            closeForm();
        } else{
            errMsg('form-project', 'Invalid Project');
        }
    }

    const handleDeleteProject = () => {
        projects.deleteProject(projectTitle.id);
        renderProject();
        const all = document.querySelector('#all-task');
        selectProject(all);
        getTodos(all.id);
    }

    const handleCreateTodo = (e) => {
        e.preventDefault();
        if(todoTitle.value !== ''){
            const toDate = todoDate.value == '' ? 'No Due Date' : todoDate.value;
            projects.addTodo(todoTitle.value, toDate, todoImportant.checked, projectTitle.id);
            sortTodos();
            closeForm();
        } else{
            errMsg('form-todo', 'Invalid Todo');
        }
    }

    const handleEditTodo = (e) => {
        e.preventDefault();
        if(todoTitle.value !== ''){
            const toDate = todoDate.value == '' ? 'No Due Date' : todoDate.value;
            projects.editTodo(todoTitle.value, toDate, todoImportant.checked, projectTitle.id, id);
            sortTodos();
            closeForm();
        } else{
            errMsg('form-todo', 'Invalid Todo');
        }
    }

    const handleDeleteTodo = (e) => {
        projects.removeTodo(projectTitle.id, id);
        renderTodos(projectTitle.id);
    }

    const resetForm = () => {
        projectName.value = '';
        todoTitle.value = '';
        todoDate.value = '';
        todoImportant.checked = false;
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
        userProject.innerHTML = '';
        projects.projects.forEach((project) => {
            userProject.innerHTML += addProject(project);
        });
        addShow('.user-project ul li');
        initProjectButtons();
    }

    const renderTodos = (projectId) => {
        userList.innerHTML = '';
        let count = 0;
        const project = projects.projects.find((project) => project.id == projectId);
        project.todos.forEach((todo) => {
            if(todo.completed) count++;
            userList.innerHTML += addTodo(todo);
        });
        addShow('.user-list ul li');
        addTodoBtn.classList.remove('not-active');
        initTodoButtons();
        countTodos(count);
    }

    const addShow = (targets) => {
        const allItems = document.querySelectorAll(targets);
        allItems.forEach((item, index) => {
            item.style.opacity = '0';
            setTimeout(() => item.classList.add('show'), index * 75);
        });
    }

    const errMsg = (target, text) => {
        const error = document.querySelector(`.${target} .err-msg`);
        error.innerText = text;
        setTimeout(() => error.innerText = '', 3000);
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

    const getTodos = (id) => {
        userList.innerHTML = '';
        if(id == 'all-task') displayAll();
        if(id == 'today') displayToday();
        if(id == 'this-week') displayThisWeek();
        if(id == 'important') displayImportant();
        addTodoBtn.classList.add('not-active');
    }

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

    const displayAll = () => {
        let count = 0;
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                if(todo.completed) count++;
                userList.innerHTML += addTodo(todo);
                addShow('.user-list ul li');
            });
        })   
        countTodos(count);
    }

    const displayToday = () => { 
        let count = 0;
        let today = Date.parse(format(new Date(), 'yyyy-MM-dd'));
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                let date = Date.parse(todo.date);
                if(isEqual(date, today)){
                    if(todo.completed) count++;
                    userList.innerHTML += addTodo(todo);
                    addShow('.user-list ul li');
                }
            })
        });
        countTodos(count);
    }

    const displayThisWeek = () => {
        let count = 0;
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                let date = parseISO(todo.date);
                if(checkNextWeek(date)){
                    if(todo.completed) count++;
                    userList.innerHTML += addTodo(todo);
                    addShow('.user-list ul li');
                }
            })
        });
        countTodos(count);
    }

    //check if the date is within the interval of next week
    const checkNextWeek = (taskDate) => {
        let nextWeekPlus1 = addDays(new Date(), 8);  //interval does not count the edges so plus 1
        let today = new Date();
        return isWithinInterval(taskDate,{
            start: today,
            end: nextWeekPlus1
        });
    }

    const displayImportant = () => {
        let count = 0;
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                if(todo.important){
                    if(todo.completed) count++;
                    userList.innerHTML += addTodo(todo);
                    addShow('.user-list ul li');
                }
            })
        })   
        countTodos(count);
    }

    return {loadPage}
})();

export default ui;