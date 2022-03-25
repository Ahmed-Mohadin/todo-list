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
            _page__WEBPACK_IMPORTED_MODULE_0__["default"].navWidth('0rem');    
        }
        else if((addTodoBtn.contains(e.target) || formTodo.contains(e.target)) 
            && !deleteTodoBtn.contains(e.target)
            ){
            openForm(formTodo);
            _page__WEBPACK_IMPORTED_MODULE_0__["default"].navWidth('0rem');
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
                _page__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();
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
                _page__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();
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

    addTodo(title, date, completed, important, projectId){
        const newTodo = new _todo__WEBPACK_IMPORTED_MODULE_1__["default"](title, date, completed, important);
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
    constructor(title, date = 'No date', completed = false, important = false){
        this.id = Date.now();
        this.title = title;
        this.date = date;
        this.completed = completed;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDO0FBQ2xDO0FBQ0E7QUFDQSxJQUFJLCtEQUFjLENBQUMscUVBQW9CO0FBQ3ZDLElBQUksOERBQWE7QUFDakIsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvYmdUaGVtZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVFZGl0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCZ1RoZW1le1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnRoZW1lID0gJyc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNhdmVUaGVtZSgpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZWRUaGVtZVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRoZW1lKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc3RvcmVUaGVtZSgpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRUaGVtZScpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmdUaGVtZTsiLCJpbXBvcnQgcGFnZSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgUHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XHJcblxyXG5jb25zdCBjcmVhdGVFZGl0ID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gbmV3IFByb2plY3RzKCk7XHJcblxyXG4gICAgY29uc3QgYWRkRXZlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgaW5pdEJ1dHRvbnMoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4geyAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGlzcGxheUZvcm0pO1xyXG5cclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZUZvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlGb3JtID0gKGUpID0+IHtcclxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItcHJvamVjdCAuYWRkLXByb2plY3QnKTtcclxuICAgICAgICBjb25zdCBmb3JtUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0gLmZvcm0tcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wcm9qZWN0IGJ1dHRvblt0eXBlPVwiYnV0dG9uXCJdJyk7XHJcbiAgIFxyXG4gICAgICAgIGNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0IC5hZGQtdG9kbycpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Ub2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUgZm9ybSAuZm9ybS10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXRvZG8gYnV0dG9uW3R5cGU9XCJidXR0b25cIl0nKTtcclxuIFxyXG4gICAgICAgIGlmKChhZGRQcm9qZWN0QnRuLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmb3JtUHJvamVjdC5jb250YWlucyhlLnRhcmdldCkpIFxyXG4gICAgICAgICAgICAmJiAhZGVsZXRlUHJvamVjdEJ0bi5jb250YWlucyhlLnRhcmdldClcclxuICAgICAgICAgICAgKXtcclxuICAgICAgICAgICAgb3BlbkZvcm0oZm9ybVByb2plY3QpO1xyXG4gICAgICAgICAgICBwYWdlLm5hdldpZHRoKCcwcmVtJyk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKChhZGRUb2RvQnRuLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmb3JtVG9kby5jb250YWlucyhlLnRhcmdldCkpIFxyXG4gICAgICAgICAgICAmJiAhZGVsZXRlVG9kb0J0bi5jb250YWlucyhlLnRhcmdldClcclxuICAgICAgICAgICAgKXtcclxuICAgICAgICAgICAgb3BlbkZvcm0oZm9ybVRvZG8pO1xyXG4gICAgICAgICAgICBwYWdlLm5hdldpZHRoKCcwcmVtJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIWZvcm1Qcm9qZWN0LmNvbnRhaW5zKGUudGFyZ2V0KSB8fCAhZm9ybVRvZG8uY29udGFpbnMoZS50YXJnZXQpKXtcclxuICAgICAgICAgICAgY2xvc2VGb3JtKCk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcGVuRm9ybSA9IChmb3JtKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XHJcblxyXG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnbm90LWFjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlRm9ybSA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJsYXknKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSAuZm9ybS1wcm9qZWN0JykuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlIGZvcm0gLmZvcm0tdG9kbycpLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgZXJyTXNnKCcnLCAxKTtcclxuICAgICAgICBlcnJNc2coJycsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUZvcm0gPSAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBmb3JtUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0gLmZvcm0tcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Ub2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSAuZm9ybS10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGUudGFyZ2V0WzBdO1xyXG4gICAgICAgIGNvbnN0IHRvZG9UaXRsZSA9IGUudGFyZ2V0WzNdO1xyXG4gICAgICAgIGNvbnN0IHRvZG9EYXRlID0gZS50YXJnZXRbNF07XHJcbiAgICAgICAgY29uc3QgdG9kb0ltcG9ydGFudCA9IGUudGFyZ2V0WzVdO1xyXG5cclxuXHJcbiAgICAgICAgaWYoZm9ybVByb2plY3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtYWN0aXZlJykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgaWYocHJvamVjdE5hbWUudmFsdWUgIT09ICcnKXtcclxuICAgICAgICAgICAgICAgIHByb2plY3RzLmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdFRpdGxlLmlkKTtcclxuICAgICAgICAgICAgICAgIHByb2plY3ROYW1lLnZhbHVlID0gJyc7ICAgIFxyXG4gICAgICAgICAgICAgICAgY2xvc2VGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmxvYWRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVyck1zZygnSW52YWxpZCBQcm9qZWN0JywgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm9ybVRvZG8uY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtYWN0aXZlJykgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgaWYodG9kb1RpdGxlLnZhbHVlICE9PSAnJyAmJiB0b2RvRGF0ZS52YWx1ZSAhPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdHMuYWRkVG9kbyh0b2RvVGl0bGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RvRGF0ZS52YWx1ZSwgZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RvSW1wb3J0YW50LmNoZWNrZWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdFRpdGxlLmlkKTtcclxuICAgICAgICAgICAgICAgIHRvZG9UaXRsZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdG9kb0RhdGUudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHRvZG9JbXBvcnRhbnQuY2hlY2tlZCA9IGZhbHNlOyAgXHJcbiAgICAgICAgICAgICAgICBjbG9zZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UubG9hZFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyck1zZygnSW52YWxpZCBUb2RvJywgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pZCA9IHByb2plY3QuaWQ7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICBgPGxpIGNsYXNzPVwicHJvamVjdC1pdGVtXCIgaWQ9XCIke3Byb2plY3QuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtwcm9qZWN0LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWxcIj48L2k+XHJcbiAgICAgICAgICAgIDwvbGk+YCAgICAgXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRUb2RvID0gKHRvZG8pID0+IHtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIGA8bGkgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBpZD1cIiR7dG9kby5pZH1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1jaGVjayAke3RvZG8uY29tcGxldGVkID8gXCJ0b2RvLWNoZWNrXCIgOiBudWxsfVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3RvZG8udGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1wbGFuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci13ZWVrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7dG9kby5kYXRlfTwvc3Bhbj4gICAgXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXN0YXIgJHt0b2RvLmltcG9ydGFudCA/IFwidG9kby1zdGFyXCIgOiBudWxsfVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWVsbGlwc2lzLXZlcnRpY2FsXCI+PC9pPiAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItcHJvamVjdCB1bCcpO1xyXG4gICAgICAgIHVzZXJQcm9qZWN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHByb2plY3RzLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgdXNlclByb2plY3QuaW5uZXJIVE1MICs9IGFkZFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJUb2RvcyA9IChwcm9qZWN0SWQpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWxpc3QgdWwnKTtcclxuICAgICAgICB1c2VyTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09IHByb2plY3RJZCkudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgICAgICAgICB1c2VyTGlzdC5pbm5lckhUTUwgKz0gYWRkVG9kbyh0b2RvKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RJdGVtID0gYWxsSXRlbXNbYWxsSXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGFzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlcnJNc2cgPSAodGV4dCwgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmVyci1tc2cke3RhcmdldH1gKS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcclxuICAgICAgICBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCcuc2VsZWN0ZWQnKTtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthZGRFdmVudCwgcmVuZGVyUHJvamVjdCwgcmVuZGVyVG9kb3N9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFZGl0OyIsImltcG9ydCBCZ1RoZW1lIGZyb20gXCIuL2JnVGhlbWVcIjtcclxuaW1wb3J0IGNyZWF0ZUVkaXQgZnJvbSBcIi4vY3JlYXRlRWRpdFwiO1xyXG5cclxuY29uc3QgcGFnZSA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBiZ1RoZW1lID0gbmV3IEJnVGhlbWUoKTtcclxuXHJcbiAgICBjb25zdCBsb2FkUGFnZSA9ICgpID0+IHtcclxuICAgICAgICBpbml0QnV0dG9ucygpO1xyXG4gICAgICAgIGNyZWF0ZUVkaXQuYWRkRXZlbnQoKTtcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgIH0gXHJcblxyXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7ICAgIFxyXG4gICAgICAgIGNvbnN0IG9wZW5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLWJhcnMnKTtcclxuICAgICAgICBjb25zdCBjbG9zZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEteG1hcmsnKTsgICBcclxuICAgICAgICBjb25zdCB0aGVtZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXNlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1saXN0IHVsJyk7XHJcblxyXG4gICAgICAgIG9wZW5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbmF2V2lkdGgoJzIxcmVtJykpO1xyXG4gICAgICAgIGNsb3NlTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdldpZHRoKCcwcmVtJykpO1xyXG4gICAgICAgIHRoZW1lSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaFRoZW1lKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWxpc3QgLnByb2plY3QtdGl0bGUnKTtcclxuICAgICAgICBwcm9qZWN0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gY29uc29sZS5sb2coZS50YXJnZXQuaWQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVmYXVsdC1wcm9qZWN0IHVsIGxpJyk7XHJcbiAgICAgICAgY29uc3QgdXNlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0IHVsIGxpJyk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRQcm9qZWN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5VGl0bGUocHJvamVjdFRpdGxlLCBlLnRhcmdldC5pbm5lclRleHQsIGUudGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVkaXQucmVuZGVyVG9kb3MoZS50YXJnZXQuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXNlclByb2plY3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUaXRsZShwcm9qZWN0VGl0bGUsIGUudGFyZ2V0LmlubmVyVGV4dCwgZS50YXJnZXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWRpdC5yZW5kZXJUb2RvcyhlLnRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3BlbnMsQ2xvc2VzIHByb2plY3QgY29sbGVjdGlvblxyXG4gICAgY29uc3QgbmF2V2lkdGggPSAod2lkdGgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb2xsZWN0aW9uJykuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFRoZW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGJnVGhlbWUudGhlbWUgPT0gJ2xpZ2h0JykgYmdUaGVtZS50aGVtZSA9ICdkYXJrJztcclxuICAgICAgICBlbHNlIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgXHJcbiAgICAgICAgbG9hZFRoZW1lKGJnVGhlbWUudGhlbWUpO1xyXG4gICAgICAgIGJnVGhlbWUuc2F2ZVRoZW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Q3VycmVudFRoZW1lID0gKCkgPT4geyAgICBcclxuICAgICAgICBiZ1RoZW1lLnRoZW1lID0gJ2xpZ2h0JztcclxuICAgIFxyXG4gICAgICAgIGlmKGJnVGhlbWUucmVzdG9yZVRoZW1lKCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gYmdUaGVtZS50aGVtZSA9IGJnVGhlbWUucmVzdG9yZVRoZW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9tYXRjaE1lZGlhIG1ldGhvZCBzdXBwb3J0ZWRcclxuICAgICAgICBlbHNlIGlmKHdpbmRvdy5tYXRjaE1lZGlhKXtcclxuICAgICAgICAgICAgLy9PUyB0aGVtZSBzZXR0aW5nIGRldGVjdGVkIGFzIGRhcmtcclxuICAgICAgICAgICAgaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKXtcclxuICAgICAgICAgICAgICAgIGJnVGhlbWUudGhlbWUgPSAnZGFyayc7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBsb2FkVGhlbWUgPSAodGhlbWUpID0+IHtcclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKTtcclxuICAgICAgICByb290LnNldEF0dHJpYnV0ZSgnY29sb3Itc2NoZW1lJywgYCR7dGhlbWV9YCk7IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlUaXRsZSA9ICh0YXJnZXQsIHRpdGxlLCBpZCkgPT4ge1xyXG4gICAgICAgIHRhcmdldC5pZCA9IGlkO1xyXG4gICAgICAgIHRhcmdldC5pbm5lclRleHQgPSBgJHt0aXRsZX1gO1xyXG4gICAgICAgIG5hdldpZHRoKCcwcmVtJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7bG9hZFBhZ2UsIGxvYWRUaGVtZSwgZ2V0Q3VycmVudFRoZW1lLCBuYXZXaWR0aH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZ2U7IiwiY2xhc3MgUHJvamVjdHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCB0b2RvcyA9IFtdKXtcclxuICAgICAgICB0aGlzLmlkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy50b2RvcyA9IHRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNhdmVUb2Rvcygpe1xyXG4gICAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZWR0b2Rvc1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcmVzdG9yZVRvZG9zKCl7ICAgICAgIFxyXG4gICAgLy8gICAgIGNvbnN0IHNhdmVkdG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZHRvZG9zJykpO1xyXG4gICAgLy8gICAgIGlmKHNhdmVkdG9kb3Mpe1xyXG4gICAgLy8gICAgICAgdGhpcy50b2RvcyA9IHNhdmVkdG9kb3M7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xyXG5cclxuLy8gY2xhc3MgUHJvamVjdHtcclxuLy8gICAgIGNvbnN0cnVjdG9yKHByb2plY3Qpe1xyXG4vLyAgICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XHJcbi8vICAgICAgICAgdGhpcy50b2RvcyA9IFtdO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGFkZFRvZG8obmV3VG9kbyl7XHJcbi8vICAgICAgICAgdGhpcy50b2Rvcy5wdXNoKG5ld1RvZG8pO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGRlbGV0ZVRvZG8odGl0bGUpe1xyXG4vLyAgICAgICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby50aXRsZSAhPT0gdGl0bGUpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGlmRXhpc3RzKHRpdGxlKXtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy50b2Rvcy5zb21lKCh0b2RvKSA9PiB0b2RvLnRpdGxlID09PSB0aXRsZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZ2V0UHJvamVjdChwcm9qZWN0TmFtZSl7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMudG9kb3MuZmluZCgobmFtZSkgPT4gbmFtZSA9PT0gcHJvamVjdE5hbWUpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHNhdmVUb2Rvcygpe1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZWR0b2Rvc1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9zKSk7XHJcbi8vICAgICB9XHJcbiAgXHJcbi8vICAgICByZXN0b3JlVG9kb3MoKXsgICAgICAgXHJcbi8vICAgICAgICAgY29uc3Qgc2F2ZWR0b2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkdG9kb3MnKSk7XHJcbi8vICAgICAgICAgaWYoc2F2ZWR0b2Rvcyl7XHJcbi8vICAgICAgICAgICB0aGlzLnRvZG9zID0gc2F2ZWR0b2RvcztcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgVG9kbyBmcm9tIFwiLi90b2RvXCI7XHJcblxyXG5jbGFzcyBQcm9qZWN0c3tcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVByb2plY3QodGl0bGUpe1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVByb2plY3QocHJvamVjdElkKXtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC5pZCAhPT0gcHJvamVjdElkO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyh0aXRsZSwgZGF0ZSwgY29tcGxldGVkLCBpbXBvcnRhbnQsIHByb2plY3RJZCl7XHJcbiAgICAgICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkYXRlLCBjb21wbGV0ZWQsIGltcG9ydGFudCk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09IHByb2plY3RJZCkudG9kb3MucHVzaChuZXdUb2RvKTtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyh0aXRsZSwgZGF0ZSwgY29tcGxldGVkLCBpbXBvcnRhbnQsIHByb2plY3RJZCwgdG9kb0lkKXtcclxuICAgICAgICBjb25zdCBmaW5kUHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkKTtcclxuICAgICAgICBjb25zdCBmaW5kVG9kbyA9IGZpbmRQcm9qZWN0LnRvZG9zLmZpbmQoKHRvZG8pID0+IHRvZG8uaWQgPT09IHRvZG9JZCk7XHJcblxyXG4gICAgICAgIGZpbmRUb2RvLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgZmluZFRvZG8uZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgZmluZFRvZG8uY29tcGxldGVkID0gY29tcGxldGVkO1xyXG4gICAgICAgIGZpbmRUb2RvLmltcG9ydGFudCA9IGltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVUb2RvKHByb2plY3RJZCwgdG9kb0lkKXtcclxuICAgICAgICBjb25zdCBmaW5kUHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkKTtcclxuICAgICAgICBjb25zdCBmaW5kVG9kbyA9IGZpbmRQcm9qZWN0LnRvZG9zLmZpbmQoKHRvZG8pID0+IHRvZG8uaWQgPT09IHRvZG9JZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmluZFByb2plY3QgPSBmaW5kUHJvamVjdC50b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8uaWQgIT09IGZpbmRUb2RvLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlUHJvamVjdHMoKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNhdmVkUHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9qZWN0cykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVQcm9qZWN0cygpeyAgICAgICBcclxuICAgICAgICBjb25zdCBzYXZlZFByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWRQcm9qZWN0cycpKTtcclxuICAgICAgICBpZihzYXZlZFByb2plY3RzKXtcclxuICAgICAgICAgIHRoaXMucHJvamVjdHMgPSBzYXZlZFByb2plY3RzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdHM7IiwiY2xhc3MgVG9kb3tcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkYXRlID0gJ05vIGRhdGUnLCBjb21wbGV0ZWQgPSBmYWxzZSwgaW1wb3J0YW50ID0gZmFsc2Upe1xyXG4gICAgICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xyXG4gICAgICAgIHRoaXMuaW1wb3J0YW50ID0gaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2RvOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBhZ2UgZnJvbSAnLi9tb2R1bGVzL3BhZ2UnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIHBhZ2UubG9hZFRoZW1lKHBhZ2UuZ2V0Q3VycmVudFRoZW1lKCkpO1xyXG4gICAgcGFnZS5sb2FkUGFnZSgpO1xyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=