/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/bgTheme.js":
/*!********************************!*\
  !*** ./src/modules/bgTheme.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class BgTheme{
    constructor(){
        this.theme = '';
    }
    
    saveTheme(){
        localStorage.setItem("savedTheme", JSON.stringify(this.theme));
    }
    
    restoreTheme(){                
        return JSON.parse(localStorage.getItem('savedTheme'));
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BgTheme);

/***/ }),

/***/ "./src/modules/createEdit.js":
/*!***********************************!*\
  !*** ./src/modules/createEdit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ "./src/modules/page.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");



const createEdit = (() => {
    const projects = new _projects__WEBPACK_IMPORTED_MODULE_1__["default"]();

    const addEvent = () => {
        initButtons()
    }

    const initButtons = () => {        
        
        const formProject = document.querySelector('aside .form-project');
        const formTodo = document.querySelector('aside .form-todo');

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
            _page__WEBPACK_IMPORTED_MODULE_0__["default"].navWidth('0rem');    
        }
        else if((addTodoBtn.contains(e.target) || formTodo.contains(e.target)) 
            && !deleteTodoBtn.contains(e.target)
            ){
            openForm('.form-todo');
            _page__WEBPACK_IMPORTED_MODULE_0__["default"].navWidth('0rem');
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
                _page__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();
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
                _page__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();
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


    const selected = (node) => {
        const selected = document.querySelector('.selected');
        selected.classList.remove('.selected');
        node.classList.add('selected');
    }

    return {addEvent, renderProject, renderTodos}
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEdit);

/***/ }),

/***/ "./src/modules/page.js":
/*!*****************************!*\
  !*** ./src/modules/page.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bgTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bgTheme */ "./src/modules/bgTheme.js");
/* harmony import */ var _createEdit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createEdit */ "./src/modules/createEdit.js");



const page = (() => {
    const bgTheme = new _bgTheme__WEBPACK_IMPORTED_MODULE_0__["default"]();

    const loadPage = () => {
        initButtons();
        _createEdit__WEBPACK_IMPORTED_MODULE_1__["default"].addEvent();
        render();
    } 

    const initButtons = () => {    
        const openMenu = document.querySelector('.fa-bars');
        const closeMenu = document.querySelector('.fa-xmark');   
        const themeIcon = document.querySelector('.theme');

        const userList = document.querySelectorAll('.user-list ul');

        openMenu.addEventListener('click', () => navWidth('21rem'));
        closeMenu.addEventListener('click', () => navWidth('0rem'));
        themeIcon.addEventListener('click', switchTheme);

    }

    const render = () => {
        const projectTitle = document.querySelector('.user-list .project-title');
        projectTitle.addEventListener('click', (e) => console.log(e.target.id));

        const defaultProject = document.querySelectorAll('.default-project ul li');
        const userProject = document.querySelectorAll('.user-project ul li');

        defaultProject.forEach((project) => {
            project.addEventListener('click', (e) => {
                displayTitle(projectTitle, e.target.innerText, e.target.id);
                _createEdit__WEBPACK_IMPORTED_MODULE_1__["default"].renderTodos(e.target.id);
            });
        });

        userProject.forEach((project) => {
            project.addEventListener('click', (e) => {
                displayTitle(projectTitle, e.target.innerText, e.target.id);
                _createEdit__WEBPACK_IMPORTED_MODULE_1__["default"].renderTodos(e.target.id);
            });
        })
    }

    // Opens,Closes project collection
    const navWidth = (width) => {
        document.querySelector('.project-collection').style.width = `${width}`;
    }

    const switchTheme = () => {
        if(bgTheme.theme == 'light') bgTheme.theme = 'dark';
        else bgTheme.theme = 'light';
    
        loadTheme(bgTheme.theme);
        bgTheme.saveTheme();
    }

    const getCurrentTheme = () => {    
        bgTheme.theme = 'light';
    
        if(bgTheme.restoreTheme()){
            return bgTheme.theme = bgTheme.restoreTheme();
        }
    
        //matchMedia method supported
        else if(window.matchMedia){
            //OS theme setting detected as dark
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                bgTheme.theme = 'dark';
            } else{
                bgTheme.theme = 'light';
            }
        }
        
    }
    
    const loadTheme = (theme) => {
        const root = document.querySelector(':root');
        root.setAttribute('color-scheme', `${theme}`); 
    }

    const displayTitle = (target, title, id) => {
        target.id = id;
        target.innerText = `${title}`;
        navWidth('0rem');
    }
    
    return {loadPage, loadTheme, getCurrentTheme, navWidth}
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (page);

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Project{
    constructor(title, todos = []){
        this.id = Date.now();
        this.title = title;
        this.todos = todos;
    }

    // saveTodos(){
    //     localStorage.setItem("savedtodos", JSON.stringify(this.todos));
    // }

    // restoreTodos(){       
    //     const savedtodos = JSON.parse(localStorage.getItem('savedtodos'));
    //     if(savedtodos){
    //       this.todos = savedtodos;
    //     }
    // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

// class Project{
//     constructor(project){
//         this.project = project;
//         this.todos = [];
//     }

//     addTodo(newTodo){
//         this.todos.push(newTodo);
//     }

//     deleteTodo(title){
//         this.todos = this.todos.filter((todo) => todo.title !== title);
//     }

//     ifExists(title){
//         return this.todos.some((todo) => todo.title === title);
//     }

//     getProject(projectName){
//         return this.todos.find((name) => name === projectName);
//     }

//     saveTodos(){
//         localStorage.setItem("savedtodos", JSON.stringify(this.todos));
//     }
  
//     restoreTodos(){       
//         const savedtodos = JSON.parse(localStorage.getItem('savedtodos'));
//         if(savedtodos){
//           this.todos = savedtodos;
//         }
//     }
// }

// export default Project;

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");



class Projects{
    constructor(){
        this.projects = [];
    }

    createProject(title){
        const newProject = new _project__WEBPACK_IMPORTED_MODULE_0__["default"](title);
        this.projects.push(newProject);
    }

    deleteProject(projectId){
        this.projects = this.projects.filter((project) => {
            project.id !== projectId;
        })
    }

    addTodo(title, date, important, projectId){
        const newTodo = new _todo__WEBPACK_IMPORTED_MODULE_1__["default"](title, date, important);
        this.projects.find((project) => project.id == projectId).todos.push(newTodo);
    }

    editTodo(title, date, completed, important, projectId, todoId){
        const findProject = this.projects.find((project) => project.id === projectId);
        const findTodo = findProject.todos.find((todo) => todo.id === todoId);

        findTodo.title = title;
        findTodo.date = date;
        findTodo.completed = completed;
        findTodo.important = important;
    }

    removeTodo(projectId, todoId){
        const findProject = this.projects.find((project) => project.id === projectId);
        const findTodo = findProject.todos.find((todo) => todo.id === todoId);
        
        findProject = findProject.todos.filter((todo) => todo.id !== findTodo.id);
    }

    saveProjects(){
        localStorage.setItem("savedProjects", JSON.stringify(this.projects));
    }

    restoreProjects(){       
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects'));
        if(savedProjects){
          this.projects = savedProjects;
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Projects);

/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Todo{
    constructor(title = "No title", date = 'No date', important = false){
        this.id = Date.now();
        this.title = title;
        this.date = date;
        this.completed = false;
        this.important = important;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/page */ "./src/modules/page.js");


document.addEventListener('DOMContentLoaded', () => {
    _modules_page__WEBPACK_IMPORTED_MODULE_0__["default"].loadTheme(_modules_page__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentTheme());
    _modules_page__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDO0FBQ2xDO0FBQ0E7QUFDQSxJQUFJLCtEQUFjLENBQUMscUVBQW9CO0FBQ3ZDLElBQUksOERBQWE7QUFDakIsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvYmdUaGVtZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVFZGl0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCZ1RoZW1le1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnRoZW1lID0gJyc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNhdmVUaGVtZSgpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZWRUaGVtZVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRoZW1lKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc3RvcmVUaGVtZSgpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRUaGVtZScpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmdUaGVtZTsiLCJpbXBvcnQgcGFnZSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgUHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XHJcblxyXG5jb25zdCBjcmVhdGVFZGl0ID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gbmV3IFByb2plY3RzKCk7XHJcblxyXG4gICAgY29uc3QgYWRkRXZlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgaW5pdEJ1dHRvbnMoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4geyAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZm9ybVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgY29uc3QgZm9ybVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS10b2RvJyk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlGb3JtKTtcclxuXHJcbiAgICAgICAgZm9ybVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlRm9ybVByb2plY3QpO1xyXG4gICAgICAgIGZvcm1Ub2RvLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZUZvcm1Ub2RvKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5Rm9ybSA9IChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLXByb2plY3QgLmFkZC1wcm9qZWN0Jyk7XHJcbiAgICAgICAgY29uc3QgZm9ybVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXByb2plY3QgYnV0dG9uW3R5cGU9XCJidXR0b25cIl0nKTtcclxuICAgXHJcbiAgICAgICAgY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QgLmFkZC10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXRvZG8gYnV0dG9uW3R5cGU9XCJidXR0b25cIl0nKTtcclxuIFxyXG4gICAgICAgIGlmKChhZGRQcm9qZWN0QnRuLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmb3JtUHJvamVjdC5jb250YWlucyhlLnRhcmdldCkpIFxyXG4gICAgICAgICAgICAmJiAhZGVsZXRlUHJvamVjdEJ0bi5jb250YWlucyhlLnRhcmdldClcclxuICAgICAgICAgICAgKXtcclxuICAgICAgICAgICAgb3BlbkZvcm0oJy5mb3JtLXByb2plY3QnKTtcclxuICAgICAgICAgICAgcGFnZS5uYXZXaWR0aCgnMHJlbScpOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoYWRkVG9kb0J0bi5jb250YWlucyhlLnRhcmdldCkgfHwgZm9ybVRvZG8uY29udGFpbnMoZS50YXJnZXQpKSBcclxuICAgICAgICAgICAgJiYgIWRlbGV0ZVRvZG9CdG4uY29udGFpbnMoZS50YXJnZXQpXHJcbiAgICAgICAgICAgICl7XHJcbiAgICAgICAgICAgIG9wZW5Gb3JtKCcuZm9ybS10b2RvJyk7XHJcbiAgICAgICAgICAgIHBhZ2UubmF2V2lkdGgoJzByZW0nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighZm9ybVByb2plY3QuY29udGFpbnMoZS50YXJnZXQpIHx8ICFmb3JtVG9kby5jb250YWlucyhlLnRhcmdldCkpe1xyXG4gICAgICAgICAgICBjbG9zZUZvcm0oKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wZW5Gb3JtID0gKGZvcm0pID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXknKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYXNpZGUgJHtmb3JtfWApLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbG9zZUZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVybGF5Jyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlIC5mb3JtLXByb2plY3QnKS5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUgLmZvcm0tdG9kbycpLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgZXJyTXNnKCcnLCAnZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgZXJyTXNnKCcnLCAnZm9ybS10b2RvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRm9ybVByb2plY3QgPSAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBmb3JtUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlIC5mb3JtLXByb2plY3QnKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1saXN0IC5wcm9qZWN0LXRpdGxlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZS50YXJnZXRbMF07XHJcblxyXG4gICAgICAgIGlmKGZvcm1Qcm9qZWN0LmNsYXNzTGlzdC5jb250YWlucygnbm90LWFjdGl2ZScpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3ROYW1lLnZhbHVlICE9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2plY3QoKTtcclxuICAgICAgICAgICAgICAgIHJlbmRlclRvZG9zKHByb2plY3RUaXRsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TmFtZS52YWx1ZSA9ICcnOyAgICBcclxuICAgICAgICAgICAgICAgIGNsb3NlRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgcGFnZS5sb2FkUGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBlcnJNc2coJ0ludmFsaWQgUHJvamVjdCcsICdmb3JtLXByb2plY3QnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZXJyTXNnKCcnLCAnZm9ybS1wcm9qZWN0JyksIDI1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUZvcm1Ub2RvID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgZm9ybVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG5cclxuICAgICAgICBjb25zdCB0b2RvVGl0bGUgPSBlLnRhcmdldFswXTtcclxuICAgICAgICBjb25zdCB0b2RvRGF0ZSA9IGUudGFyZ2V0WzFdO1xyXG4gICAgICAgIGNvbnN0IHRvZG9JbXBvcnRhbnQgPSBlLnRhcmdldFsyXTtcclxuXHJcbiAgICAgICAgaWYoZm9ybVRvZG8uY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtYWN0aXZlJykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgaWYodG9kb1RpdGxlLnZhbHVlICE9PSAnJyAmJiB0b2RvRGF0ZS52YWx1ZSAhPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdHMuYWRkVG9kbyh0b2RvVGl0bGUudmFsdWUsIHRvZG9EYXRlLnZhbHVlLCB0b2RvSW1wb3J0YW50LmNoZWNrZWQsIHByb2plY3RUaXRsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgdG9kb1RpdGxlLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0b2RvRGF0ZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdG9kb0ltcG9ydGFudC5jaGVja2VkID0gZmFsc2U7ICBcclxuICAgICAgICAgICAgICAgIGNsb3NlRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgcGFnZS5sb2FkUGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyTXNnKCdJbnZhbGlkIFRvZG8nLCAnZm9ybS10b2RvJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVyck1zZygnJywgJ2Zvcm0tdG9kbycpLCAyNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1saXN0IC5wcm9qZWN0LXRpdGxlJyk7XHJcbiAgICAgICAgcHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgcHJvamVjdFRpdGxlLmlkID0gcHJvamVjdC5pZDtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIGA8bGkgY2xhc3M9XCJwcm9qZWN0LWl0ZW1cIiBpZD1cIiR7cHJvamVjdC5pZH1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci1jaGVja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3Byb2plY3QudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbFwiPjwvaT5cclxuICAgICAgICAgICAgPC9saT5gICAgICBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFRvZG8gPSAodG9kbykgPT4ge1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGlkPVwiJHt0b2RvLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLWNoZWNrICR7dG9kby5jb21wbGV0ZWQgPyBcInRvZG8tY2hlY2tcIiA6IG51bGx9XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7dG9kby50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXBsYW5cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNhbGVuZGFyLXdlZWtcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHt0b2RvLmRhdGV9PC9zcGFuPiAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtc3RhciAke3RvZG8uaW1wb3J0YW50ID8gXCJ0b2RvLXN0YXJcIiA6IG51bGx9XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWxcIj48L2k+ICAgIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbGk+YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHJlbmRlclByb2plY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1wcm9qZWN0IHVsJyk7XHJcbiAgICAgICAgdXNlclByb2plY3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgcHJvamVjdHMucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyUHJvamVjdC5pbm5lckhUTUwgKz0gYWRkUHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclRvZG9zID0gKHByb2plY3RJZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCB1bCcpO1xyXG4gICAgICAgIHVzZXJMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHByb2plY3RzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT0gcHJvamVjdElkKS50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJMaXN0LmlubmVySFRNTCArPSBhZGRUb2RvKHRvZG8pO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWl0ZW0nKTtcclxuICAgICAgICAgICAgYWxsSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfSwgaW5kZXggKiA3NSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlcnJNc2cgPSAodGV4dCwgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dGFyZ2V0fSAuZXJyLW1zZ2ApLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkID0gKG5vZGUpID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xyXG4gICAgICAgIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJy5zZWxlY3RlZCcpO1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2FkZEV2ZW50LCByZW5kZXJQcm9qZWN0LCByZW5kZXJUb2Rvc31cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVkaXQ7IiwiaW1wb3J0IEJnVGhlbWUgZnJvbSBcIi4vYmdUaGVtZVwiO1xyXG5pbXBvcnQgY3JlYXRlRWRpdCBmcm9tIFwiLi9jcmVhdGVFZGl0XCI7XHJcblxyXG5jb25zdCBwYWdlID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGJnVGhlbWUgPSBuZXcgQmdUaGVtZSgpO1xyXG5cclxuICAgIGNvbnN0IGxvYWRQYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGluaXRCdXR0b25zKCk7XHJcbiAgICAgICAgY3JlYXRlRWRpdC5hZGRFdmVudCgpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgfSBcclxuXHJcbiAgICBjb25zdCBpbml0QnV0dG9ucyA9ICgpID0+IHsgICAgXHJcbiAgICAgICAgY29uc3Qgb3Blbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtYmFycycpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS14bWFyaycpOyAgIFxyXG4gICAgICAgIGNvbnN0IHRoZW1lSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZScpO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLWxpc3QgdWwnKTtcclxuXHJcbiAgICAgICAgb3Blbk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZXaWR0aCgnMjFyZW0nKSk7XHJcbiAgICAgICAgY2xvc2VNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbmF2V2lkdGgoJzByZW0nKSk7XHJcbiAgICAgICAgdGhlbWVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoVGhlbWUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBjb25zb2xlLmxvZyhlLnRhcmdldC5pZCkpO1xyXG5cclxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWZhdWx0LXByb2plY3QgdWwgbGknKTtcclxuICAgICAgICBjb25zdCB1c2VyUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QgdWwgbGknKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdFByb2plY3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUaXRsZShwcm9qZWN0VGl0bGUsIGUudGFyZ2V0LmlubmVyVGV4dCwgZS50YXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWRpdC5yZW5kZXJUb2RvcyhlLnRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1c2VyUHJvamVjdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVRpdGxlKHByb2plY3RUaXRsZSwgZS50YXJnZXQuaW5uZXJUZXh0LCBlLnRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFZGl0LnJlbmRlclRvZG9zKGUudGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBPcGVucyxDbG9zZXMgcHJvamVjdCBjb2xsZWN0aW9uXHJcbiAgICBjb25zdCBuYXZXaWR0aCA9ICh3aWR0aCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvbGxlY3Rpb24nKS5zdHlsZS53aWR0aCA9IGAke3dpZHRofWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoVGhlbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoYmdUaGVtZS50aGVtZSA9PSAnbGlnaHQnKSBiZ1RoZW1lLnRoZW1lID0gJ2RhcmsnO1xyXG4gICAgICAgIGVsc2UgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICBcclxuICAgICAgICBsb2FkVGhlbWUoYmdUaGVtZS50aGVtZSk7XHJcbiAgICAgICAgYmdUaGVtZS5zYXZlVGhlbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRDdXJyZW50VGhlbWUgPSAoKSA9PiB7ICAgIFxyXG4gICAgICAgIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgXHJcbiAgICAgICAgaWYoYmdUaGVtZS5yZXN0b3JlVGhlbWUoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ1RoZW1lLnRoZW1lID0gYmdUaGVtZS5yZXN0b3JlVGhlbWUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL21hdGNoTWVkaWEgbWV0aG9kIHN1cHBvcnRlZFxyXG4gICAgICAgIGVsc2UgaWYod2luZG93Lm1hdGNoTWVkaWEpe1xyXG4gICAgICAgICAgICAvL09TIHRoZW1lIHNldHRpbmcgZGV0ZWN0ZWQgYXMgZGFya1xyXG4gICAgICAgICAgICBpZih3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpe1xyXG4gICAgICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdkYXJrJztcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRUaGVtZSA9ICh0aGVtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpO1xyXG4gICAgICAgIHJvb3Quc2V0QXR0cmlidXRlKCdjb2xvci1zY2hlbWUnLCBgJHt0aGVtZX1gKTsgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheVRpdGxlID0gKHRhcmdldCwgdGl0bGUsIGlkKSA9PiB7XHJcbiAgICAgICAgdGFyZ2V0LmlkID0gaWQ7XHJcbiAgICAgICAgdGFyZ2V0LmlubmVyVGV4dCA9IGAke3RpdGxlfWA7XHJcbiAgICAgICAgbmF2V2lkdGgoJzByZW0nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtsb2FkUGFnZSwgbG9hZFRoZW1lLCBnZXRDdXJyZW50VGhlbWUsIG5hdldpZHRofVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZTsiLCJjbGFzcyBQcm9qZWN0e1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIHRvZG9zID0gW10pe1xyXG4gICAgICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gdG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2F2ZVRvZG9zKCl7XHJcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZHRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXN0b3JlVG9kb3MoKXsgICAgICAgXHJcbiAgICAvLyAgICAgY29uc3Qgc2F2ZWR0b2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkdG9kb3MnKSk7XHJcbiAgICAvLyAgICAgaWYoc2F2ZWR0b2Rvcyl7XHJcbiAgICAvLyAgICAgICB0aGlzLnRvZG9zID0gc2F2ZWR0b2RvcztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XHJcblxyXG4vLyBjbGFzcyBQcm9qZWN0e1xyXG4vLyAgICAgY29uc3RydWN0b3IocHJvamVjdCl7XHJcbi8vICAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuLy8gICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgYWRkVG9kbyhuZXdUb2RvKXtcclxuLy8gICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZGVsZXRlVG9kbyh0aXRsZSl7XHJcbi8vICAgICAgICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9PSB0aXRsZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgaWZFeGlzdHModGl0bGUpe1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnRvZG9zLnNvbWUoKHRvZG8pID0+IHRvZG8udGl0bGUgPT09IHRpdGxlKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBnZXRQcm9qZWN0KHByb2plY3ROYW1lKXtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy50b2Rvcy5maW5kKChuYW1lKSA9PiBuYW1lID09PSBwcm9qZWN0TmFtZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgc2F2ZVRvZG9zKCl7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZHRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuLy8gICAgIH1cclxuICBcclxuLy8gICAgIHJlc3RvcmVUb2RvcygpeyAgICAgICBcclxuLy8gICAgICAgICBjb25zdCBzYXZlZHRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWR0b2RvcycpKTtcclxuLy8gICAgICAgICBpZihzYXZlZHRvZG9zKXtcclxuLy8gICAgICAgICAgIHRoaXMudG9kb3MgPSBzYXZlZHRvZG9zO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcclxuXHJcbmNsYXNzIFByb2plY3Rze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUHJvamVjdCh0aXRsZSl7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUHJvamVjdChwcm9qZWN0SWQpe1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRpdGxlLCBkYXRlLCBpbXBvcnRhbnQsIHByb2plY3RJZCl7XHJcbiAgICAgICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkYXRlLCBpbXBvcnRhbnQpO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PSBwcm9qZWN0SWQpLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG8odGl0bGUsIGRhdGUsIGNvbXBsZXRlZCwgaW1wb3J0YW50LCBwcm9qZWN0SWQsIHRvZG9JZCl7XHJcbiAgICAgICAgY29uc3QgZmluZFByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZCk7XHJcbiAgICAgICAgY29uc3QgZmluZFRvZG8gPSBmaW5kUHJvamVjdC50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSB0b2RvSWQpO1xyXG5cclxuICAgICAgICBmaW5kVG9kby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIGZpbmRUb2RvLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIGZpbmRUb2RvLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcclxuICAgICAgICBmaW5kVG9kby5pbXBvcnRhbnQgPSBpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9kbyhwcm9qZWN0SWQsIHRvZG9JZCl7XHJcbiAgICAgICAgY29uc3QgZmluZFByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZCk7XHJcbiAgICAgICAgY29uc3QgZmluZFRvZG8gPSBmaW5kUHJvamVjdC50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSB0b2RvSWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpbmRQcm9qZWN0ID0gZmluZFByb2plY3QudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLmlkICE9PSBmaW5kVG9kby5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVByb2plY3RzKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZFByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvamVjdHMpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlUHJvamVjdHMoKXsgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc2F2ZWRQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkUHJvamVjdHMnKSk7XHJcbiAgICAgICAgaWYoc2F2ZWRQcm9qZWN0cyl7XHJcbiAgICAgICAgICB0aGlzLnByb2plY3RzID0gc2F2ZWRQcm9qZWN0cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RzOyIsImNsYXNzIFRvZG97XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSA9IFwiTm8gdGl0bGVcIiwgZGF0ZSA9ICdObyBkYXRlJywgaW1wb3J0YW50ID0gZmFsc2Upe1xyXG4gICAgICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRhbnQgPSBpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGFnZSBmcm9tICcuL21vZHVsZXMvcGFnZSc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgcGFnZS5sb2FkVGhlbWUocGFnZS5nZXRDdXJyZW50VGhlbWUoKSk7XHJcbiAgICBwYWdlLmxvYWRQYWdlKCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==