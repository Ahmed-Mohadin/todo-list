import { addDays, format, isEqual, isWithinInterval, parseISO } from "date-fns";
import Projects from './projects';
import Theme from './theme';

const ui = (() => {
    const theme = new Theme();
    const projects = new Projects();

    const addProjectBtn = document.querySelector('.user-project .add-project');
    const formProject = document.querySelector('aside .form-project');
    const deleteProjectBtn = document.querySelector('.form-project button[type="button"]');

    const addTodoBtn = document.querySelector('.todo-list .add-todo');
    const formTodo = document.querySelector('aside .form-todo');
    const deleteTodoBtn = document.querySelector('.form-todo button[type="button"]');

    const projectTitle = document.querySelector('.project-title');
    const todoCount = document.querySelector('#todo-count');
    const userProject = document.querySelector('.user-project ul');
    const userList = document.querySelector('.user-list ul');
    const aside =  document.querySelector('aside');

    // Loads the page
    const loadPage = () => {
        loadTheme(getCurrentTheme());
        initButtons();   
    }

    // Add event listeners
    const initButtons = () => {
        const themeIcon = document.querySelector('.theme');
        const openMenu = document.querySelector('.fa-bars');
        const closeMenu = document.querySelector('.fa-xmark');  
        const defaultProject = document.querySelectorAll('.default-project ul li');
        
        themeIcon.addEventListener('click', switchTheme);
        openMenu.addEventListener('click', () => navWidth('21rem'));
        closeMenu.addEventListener('click', () => navWidth('0rem'));

        window.addEventListener('click', displayForm);

        formProject.addEventListener('submit', handleProject);
        formTodo.addEventListener('submit', handleTodo);

        defaultProject.forEach((project) => {
            addTodoBtn.style.display = 'none';
            selected(project);
            project.addEventListener('click', () => {
                updateSelected(project);
                getTodos(project.id);
            });
        })
    }

    const initProjectButtons = () => {
        const userProject = document.querySelectorAll('.user-project ul li'); 
        userProject.forEach((project) => {
            selected(project);
            project.addEventListener('click', (e) => {
                if(e.target.classList.contains('fa-calendar-check') || e.target.nodeName == 'LI'){
                    updateSelected(project);
                    renderTodos(project.id);       
                }
            });
        });
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
    const navWidth = (width) => {
        document.querySelector('.project-collection').style.width = `${width}`;
    }

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
        navWidth('0rem');
    }

    // Closes form
    const closeForm = () => {
        aside.classList.add('not-active');
        formProject.classList.add('not-active');
        formTodo.classList.add('not-active');
    }

    const handleProject = (e) => {
        e.preventDefault();
        const projectName = e.target[0].value;
        if(projects.exists(projectName)){
            errMsg('form-project', 'Project Already Exist');            
        } else if(projectName !== '' ){
            projects.createProject(projectName);
            renderProject();
            renderTodos(projectTitle.id);
            resetProjectForm();
            closeForm();
        } else{
            errMsg('form-project', 'Invalid Project');
        }
    }

    const resetProjectForm = () => {
        document.querySelector('input[name="project-name"]').value = '';
    }

    const handleTodo = (e) => {
        e.preventDefault();
        const todoTitle = e.target[0].value;
        const todoDate = e.target[1].value;
        const todoImportant = e.target[2].checked;
        if(todoTitle !== ''){
            const toDate = todoDate == '' ? 'No Due Date' : todoDate;
            projects.addTodo(todoTitle, toDate, todoImportant, projectTitle.id);
            renderTodos(projectTitle.id);
            resetTodoForm();
            closeForm();
        } else{
            errMsg('form-todo', 'Invalid Todo');
        }
    }

    const resetTodoForm = () => {
        document.querySelector('input[name="todo-title"]').value = '';
        document.querySelector('input[name="todo-date"]').value = '';
        document.querySelector('input[name="todo-important"]').checked = false;
    }

    const addProject = (project) => {
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
        userProject.innerHTML = '';
        projects.projects.forEach((project) => {
            userProject.innerHTML += addProject(project);
        })
        initProjectButtons();
    }

    const renderTodos = (projectId) => {
        userList.innerHTML = '';
        const project = projects.projects.find((project) => project.id == projectId);
        project.todos.forEach((todo) => {
            userList.innerHTML += addTodo(todo);
            addShow();
        })
        countTodos();
        addTodoBtn.style.display = 'unset';
    }

    const addShow = () => {
        const allItems = document.querySelectorAll('.todo-item');
        allItems.forEach((item, index) => {
            item.style.opacity = '0';
            setTimeout(() => item.classList.add('show'), index * 75);
        });
    }

    const errMsg = (target, text) => {
        const error = document.querySelector(`.${target} .err-msg`);
        error.innerText = text;
        setTimeout(() => error.innerText = '', 2500);
    }

    const displayTitle = (target, title, id) => {
        target.id = id;
        target.innerText = `${title}`;
        navWidth('0rem');
    }

    const updateSelected = (project) => {
        displayTitle(projectTitle, project.innerText, project.id);
        selected(project);
    }
    
    const selected = (target) => {
        resetSelected();
        if(target.id == projectTitle.id) target.classList.add('selected');
    }

    const resetSelected = () => {
        const defaultPrj = document.querySelectorAll('.default-project ul li');
        defaultPrj.forEach((prj) => prj.classList.remove('selected'));
        const userPrj = document.querySelectorAll('.user-project ul li');
        userPrj.forEach((prj) => prj.classList.remove('selected'));
    }

    const getTodos = (id) => {
        addTodoBtn.style.display = 'none';
        userList.innerHTML = '';
        if(id == 'all-task') displayAll();
        if(id == 'today') displayToday();
        if(id == 'this-week') displayThisWeek();
        if(id == 'important') displayImportant();
        countTodos();
    }

    const countTodos = () => {
        const length = document.querySelectorAll('.todo-item').length;
        let text = '';
        if(length >= 1){
            text = `${length} ${length == 1 ? 'Task' : 'Tasks'} Remaining`;
        } else{
            text = 'No Tasks Remaining';
        }
        todoCount.innerText = text;
    }

    const displayAll = () => {
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                userList.innerHTML += addTodo(todo);
                addShow();    
            })
        })   
    }

    const displayToday = () => { 
        let today = Date.parse(format(new Date(), 'yyyy-MM-dd'));
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                let date = Date.parse(todo.date);
                if(isEqual(date, today)){
                    userList.innerHTML += addTodo(todo);
                    addShow();
                }
            })
        });
    }

    const displayThisWeek = () => {
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                let date = parseISO(todo.date);
                if(checkNextWeek(date)){
                    userList.innerHTML += addTodo(todo);
                    addShow();
                }
            })
        });
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
        projects.projects.forEach((prj) => {
            prj.todos.forEach((todo) => {
                if(todo.important){
                    userList.innerHTML += addTodo(todo);
                    addShow();        
                }
            })
        })   
    }

    return {loadPage}
})();

export default ui;