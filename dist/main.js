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
    }

    const handleForm = (e) => {
        e.preventDefault();
        const formProject = document.querySelector('form .form-project');
        const formTodo = document.querySelector('form .form-todo');
        const projectTitle = document.querySelector('.user-list .project-title');

        if(!formProject.classList.contains('not-active')){
            const projectName = e.target[0].value;
            projects.createProject(projectName);
            renderProject();
            renderTodos(projectTitle.id);
        }
        if(!formTodo.classList.contains('not-active')){
            const todoTitle = e.target[3].value;
            const todoDate = e.target[4].value;
            const todoImportant = e.target[5].checked;

            projects.addTodo(todoTitle, todoDate, false, todoImportant, projectTitle.id);
            renderTodos(projectTitle.id);
        }
        _page__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();
        closeForm();
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
        })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSw4REFBYTtBQUNqQixDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9iZ1RoZW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUVkaXQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcGFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJnVGhlbWV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMudGhlbWUgPSAnJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZVRoZW1lKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZFRoZW1lXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudGhlbWUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVzdG9yZVRoZW1lKCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZFRoZW1lJykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZ1RoZW1lOyIsImltcG9ydCBwYWdlIGZyb20gJy4vcGFnZSc7XHJcbmltcG9ydCBQcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcclxuXHJcbmNvbnN0IGNyZWF0ZUVkaXQgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuXHJcbiAgICBjb25zdCBhZGRFdmVudCA9ICgpID0+IHtcclxuICAgICAgICBpbml0QnV0dG9ucygpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7ICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwbGF5Rm9ybSk7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVGb3JtKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheUZvcm0gPSAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1wcm9qZWN0IC5hZGQtcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSAuZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXByb2plY3QgYnV0dG9uW3R5cGU9XCJidXR0b25cIl0nKTtcclxuICAgXHJcbiAgICAgICAgY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QgLmFkZC10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSBmb3JtIC5mb3JtLXRvZG8nKTtcclxuICAgICAgICBjb25zdCBkZWxldGVUb2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tdG9kbyBidXR0b25bdHlwZT1cImJ1dHRvblwiXScpO1xyXG4gXHJcbiAgICAgICAgaWYoKGFkZFByb2plY3RCdG4uY29udGFpbnMoZS50YXJnZXQpIHx8IGZvcm1Qcm9qZWN0LmNvbnRhaW5zKGUudGFyZ2V0KSkgXHJcbiAgICAgICAgICAgICYmICFkZWxldGVQcm9qZWN0QnRuLmNvbnRhaW5zKGUudGFyZ2V0KVxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgICAgICBvcGVuRm9ybShmb3JtUHJvamVjdCk7XHJcbiAgICAgICAgICAgIHBhZ2UubmF2V2lkdGgoJzByZW0nKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoKGFkZFRvZG9CdG4uY29udGFpbnMoZS50YXJnZXQpIHx8IGZvcm1Ub2RvLmNvbnRhaW5zKGUudGFyZ2V0KSkgXHJcbiAgICAgICAgICAgICYmICFkZWxldGVUb2RvQnRuLmNvbnRhaW5zKGUudGFyZ2V0KVxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgICAgICBvcGVuRm9ybShmb3JtVG9kbyk7XHJcbiAgICAgICAgICAgIHBhZ2UubmF2V2lkdGgoJzByZW0nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighZm9ybVByb2plY3QuY29udGFpbnMoZS50YXJnZXQpIHx8ICFmb3JtVG9kby5jb250YWlucyhlLnRhcmdldCkpe1xyXG4gICAgICAgICAgICBjbG9zZUZvcm0oKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wZW5Gb3JtID0gKGZvcm0pID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXknKTtcclxuXHJcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmxheScpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtIC5mb3JtLXByb2plY3QnKS5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUgZm9ybSAuZm9ybS10b2RvJykuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUZvcm0gPSAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBmb3JtUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0gLmZvcm0tcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Ub2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSAuZm9ybS10b2RvJyk7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG5cclxuICAgICAgICBpZighZm9ybVByb2plY3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtYWN0aXZlJykpe1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGUudGFyZ2V0WzBdLnZhbHVlO1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdCgpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighZm9ybVRvZG8uY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtYWN0aXZlJykpe1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvVGl0bGUgPSBlLnRhcmdldFszXS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgdG9kb0RhdGUgPSBlLnRhcmdldFs0XS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgdG9kb0ltcG9ydGFudCA9IGUudGFyZ2V0WzVdLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgICAgICBwcm9qZWN0cy5hZGRUb2RvKHRvZG9UaXRsZSwgdG9kb0RhdGUsIGZhbHNlLCB0b2RvSW1wb3J0YW50LCBwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYWdlLmxvYWRQYWdlKCk7XHJcbiAgICAgICAgY2xvc2VGb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pZCA9IHByb2plY3QuaWQ7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICBgPGxpIGNsYXNzPVwicHJvamVjdC1pdGVtXCIgaWQ9XCIke3Byb2plY3QuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtwcm9qZWN0LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWxcIj48L2k+XHJcbiAgICAgICAgICAgIDwvbGk+YCAgICAgXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRUb2RvID0gKHRvZG8pID0+IHtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIGA8bGkgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBpZD1cIiR7dG9kby5pZH1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1jaGVjayAke3RvZG8uY29tcGxldGVkID8gXCJ0b2RvLWNoZWNrXCIgOiBudWxsfVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3RvZG8udGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1wbGFuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci13ZWVrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7dG9kby5kYXRlfTwvc3Bhbj4gICAgXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXN0YXIgJHt0b2RvLmltcG9ydGFudCA/IFwidG9kby1zdGFyXCIgOiBudWxsfVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWVsbGlwc2lzLXZlcnRpY2FsXCI+PC9pPiAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPmAgICAgICAgXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLXByb2plY3QgdWwnKTtcclxuICAgICAgICB1c2VyUHJvamVjdC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJQcm9qZWN0LmlubmVySFRNTCArPSBhZGRQcm9qZWN0KHByb2plY3QpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdElkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1saXN0IHVsJyk7XHJcbiAgICAgICAgdXNlckxpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgcHJvamVjdHMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PSBwcm9qZWN0SWQpLnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcclxuICAgICAgICAgICAgdXNlckxpc3QuaW5uZXJIVE1MICs9IGFkZFRvZG8odG9kbyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJyk7XHJcbiAgICAgICAgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnLnNlbGVjdGVkJyk7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7YWRkRXZlbnQsIHJlbmRlclByb2plY3QsIHJlbmRlclRvZG9zfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRWRpdDsiLCJpbXBvcnQgQmdUaGVtZSBmcm9tIFwiLi9iZ1RoZW1lXCI7XHJcbmltcG9ydCBjcmVhdGVFZGl0IGZyb20gXCIuL2NyZWF0ZUVkaXRcIjtcclxuXHJcbmNvbnN0IHBhZ2UgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgYmdUaGVtZSA9IG5ldyBCZ1RoZW1lKCk7XHJcblxyXG4gICAgY29uc3QgbG9hZFBhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcclxuICAgICAgICBjcmVhdGVFZGl0LmFkZEV2ZW50KCk7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4geyAgICBcclxuICAgICAgICBjb25zdCBvcGVuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS1iYXJzJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXhtYXJrJyk7ICAgXHJcbiAgICAgICAgY29uc3QgdGhlbWVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItbGlzdCB1bCcpO1xyXG5cclxuICAgICAgICBvcGVuTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdldpZHRoKCcyMXJlbScpKTtcclxuICAgICAgICBjbG9zZU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZXaWR0aCgnMHJlbScpKTtcclxuICAgICAgICB0aGVtZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUaGVtZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1saXN0IC5wcm9qZWN0LXRpdGxlJyk7XHJcbiAgICAgICAgcHJvamVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlZmF1bHQtcHJvamVjdCB1bCBsaScpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdCB1bCBsaScpO1xyXG5cclxuICAgICAgICBkZWZhdWx0UHJvamVjdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVRpdGxlKHByb2plY3RUaXRsZSwgZS50YXJnZXQuaW5uZXJUZXh0LCBlLnRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1c2VyUHJvamVjdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVRpdGxlKHByb2plY3RUaXRsZSwgZS50YXJnZXQuaW5uZXJUZXh0LCBlLnRhcmdldC5pZCk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFZGl0LnJlbmRlclRvZG9zKGUudGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBPcGVucyxDbG9zZXMgcHJvamVjdCBjb2xsZWN0aW9uXHJcbiAgICBjb25zdCBuYXZXaWR0aCA9ICh3aWR0aCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvbGxlY3Rpb24nKS5zdHlsZS53aWR0aCA9IGAke3dpZHRofWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoVGhlbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoYmdUaGVtZS50aGVtZSA9PSAnbGlnaHQnKSBiZ1RoZW1lLnRoZW1lID0gJ2RhcmsnO1xyXG4gICAgICAgIGVsc2UgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICBcclxuICAgICAgICBsb2FkVGhlbWUoYmdUaGVtZS50aGVtZSk7XHJcbiAgICAgICAgYmdUaGVtZS5zYXZlVGhlbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRDdXJyZW50VGhlbWUgPSAoKSA9PiB7ICAgIFxyXG4gICAgICAgIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgXHJcbiAgICAgICAgaWYoYmdUaGVtZS5yZXN0b3JlVGhlbWUoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ1RoZW1lLnRoZW1lID0gYmdUaGVtZS5yZXN0b3JlVGhlbWUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL21hdGNoTWVkaWEgbWV0aG9kIHN1cHBvcnRlZFxyXG4gICAgICAgIGVsc2UgaWYod2luZG93Lm1hdGNoTWVkaWEpe1xyXG4gICAgICAgICAgICAvL09TIHRoZW1lIHNldHRpbmcgZGV0ZWN0ZWQgYXMgZGFya1xyXG4gICAgICAgICAgICBpZih3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpe1xyXG4gICAgICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdkYXJrJztcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRUaGVtZSA9ICh0aGVtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpO1xyXG4gICAgICAgIHJvb3Quc2V0QXR0cmlidXRlKCdjb2xvci1zY2hlbWUnLCBgJHt0aGVtZX1gKTsgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheVRpdGxlID0gKHRhcmdldCwgdGl0bGUsIGlkKSA9PiB7XHJcbiAgICAgICAgdGFyZ2V0LmlkID0gaWQ7XHJcbiAgICAgICAgdGFyZ2V0LmlubmVyVGV4dCA9IGAke3RpdGxlfWA7XHJcbiAgICAgICAgbmF2V2lkdGgoJzByZW0nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtsb2FkUGFnZSwgbG9hZFRoZW1lLCBnZXRDdXJyZW50VGhlbWUsIG5hdldpZHRofVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZTsiLCJjbGFzcyBQcm9qZWN0e1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIHRvZG9zID0gW10pe1xyXG4gICAgICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gdG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2F2ZVRvZG9zKCl7XHJcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZHRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXN0b3JlVG9kb3MoKXsgICAgICAgXHJcbiAgICAvLyAgICAgY29uc3Qgc2F2ZWR0b2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkdG9kb3MnKSk7XHJcbiAgICAvLyAgICAgaWYoc2F2ZWR0b2Rvcyl7XHJcbiAgICAvLyAgICAgICB0aGlzLnRvZG9zID0gc2F2ZWR0b2RvcztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XHJcblxyXG4vLyBjbGFzcyBQcm9qZWN0e1xyXG4vLyAgICAgY29uc3RydWN0b3IocHJvamVjdCl7XHJcbi8vICAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuLy8gICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgYWRkVG9kbyhuZXdUb2RvKXtcclxuLy8gICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZGVsZXRlVG9kbyh0aXRsZSl7XHJcbi8vICAgICAgICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9PSB0aXRsZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgaWZFeGlzdHModGl0bGUpe1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnRvZG9zLnNvbWUoKHRvZG8pID0+IHRvZG8udGl0bGUgPT09IHRpdGxlKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBnZXRQcm9qZWN0KHByb2plY3ROYW1lKXtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy50b2Rvcy5maW5kKChuYW1lKSA9PiBuYW1lID09PSBwcm9qZWN0TmFtZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgc2F2ZVRvZG9zKCl7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZHRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuLy8gICAgIH1cclxuICBcclxuLy8gICAgIHJlc3RvcmVUb2RvcygpeyAgICAgICBcclxuLy8gICAgICAgICBjb25zdCBzYXZlZHRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWR0b2RvcycpKTtcclxuLy8gICAgICAgICBpZihzYXZlZHRvZG9zKXtcclxuLy8gICAgICAgICAgIHRoaXMudG9kb3MgPSBzYXZlZHRvZG9zO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcclxuXHJcbmNsYXNzIFByb2plY3Rze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUHJvamVjdCh0aXRsZSl7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUHJvamVjdChwcm9qZWN0SWQpe1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRpdGxlLCBkYXRlLCBjb21wbGV0ZWQsIGltcG9ydGFudCwgcHJvamVjdElkKXtcclxuICAgICAgICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8odGl0bGUsIGRhdGUsIGNvbXBsZXRlZCwgaW1wb3J0YW50KTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT0gcHJvamVjdElkKS50b2Rvcy5wdXNoKG5ld1RvZG8pO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvKHRpdGxlLCBkYXRlLCBjb21wbGV0ZWQsIGltcG9ydGFudCwgcHJvamVjdElkLCB0b2RvSWQpe1xyXG4gICAgICAgIGNvbnN0IGZpbmRQcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWQpO1xyXG4gICAgICAgIGNvbnN0IGZpbmRUb2RvID0gZmluZFByb2plY3QudG9kb3MuZmluZCgodG9kbykgPT4gdG9kby5pZCA9PT0gdG9kb0lkKTtcclxuXHJcbiAgICAgICAgZmluZFRvZG8udGl0bGUgPSB0aXRsZTtcclxuICAgICAgICBmaW5kVG9kby5kYXRlID0gZGF0ZTtcclxuICAgICAgICBmaW5kVG9kby5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XHJcbiAgICAgICAgZmluZFRvZG8uaW1wb3J0YW50ID0gaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG8ocHJvamVjdElkLCB0b2RvSWQpe1xyXG4gICAgICAgIGNvbnN0IGZpbmRQcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWQpO1xyXG4gICAgICAgIGNvbnN0IGZpbmRUb2RvID0gZmluZFByb2plY3QudG9kb3MuZmluZCgodG9kbykgPT4gdG9kby5pZCA9PT0gdG9kb0lkKTtcclxuICAgICAgICBcclxuICAgICAgICBmaW5kUHJvamVjdCA9IGZpbmRQcm9qZWN0LnRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5pZCAhPT0gZmluZFRvZG8uaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVQcm9qZWN0cygpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZWRQcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb2plY3RzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZVByb2plY3RzKCl7ICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHNhdmVkUHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZFByb2plY3RzJykpO1xyXG4gICAgICAgIGlmKHNhdmVkUHJvamVjdHMpe1xyXG4gICAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHNhdmVkUHJvamVjdHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0czsiLCJjbGFzcyBUb2Rve1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRhdGUgPSAnTm8gZGF0ZScsIGNvbXBsZXRlZCA9IGZhbHNlLCBpbXBvcnRhbnQgPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5pZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRhbnQgPSBpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGFnZSBmcm9tICcuL21vZHVsZXMvcGFnZSc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgcGFnZS5sb2FkVGhlbWUocGFnZS5nZXRDdXJyZW50VGhlbWUoKSk7XHJcbiAgICBwYWdlLmxvYWRQYWdlKCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==