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
        const defaultProject = document.querySelectorAll('.default-project ul li');
        const userProject = document.querySelectorAll('.user-project ul li');

        defaultProject.forEach((project) => {
            if(projectTitle.id == project.id){
                selected(project);
            }
            project.addEventListener('click', () => {
                displayTitle(projectTitle, project.innerText, project.id);
                _createEdit__WEBPACK_IMPORTED_MODULE_1__["default"].renderTodos(project.id);
                selected(project.target);
            });
        });

        userProject.forEach((project) => {
            if(projectTitle.id == project.id){
                selected(project);
            }
            project.addEventListener('click', () => {
                displayTitle(projectTitle, project.innerText, project.id);
                _createEdit__WEBPACK_IMPORTED_MODULE_1__["default"].renderTodos(project.id);
                selected(project);
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

    const selected = (target) => {
        resetSelected();
        target.classList.add('selected');
    }

    const resetSelected = () => {
        document.querySelectorAll('.default-project ul li').forEach((prj) => prj.classList.remove('selected'));
        document.querySelectorAll('.user-project ul li').forEach((prj) => prj.classList.remove('selected'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSTs7Ozs7O1VDVm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7QUFDbEM7QUFDQTtBQUNBLElBQUksK0RBQWMsQ0FBQyxxRUFBb0I7QUFDdkMsSUFBSSw4REFBYTtBQUNqQixDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9iZ1RoZW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZUVkaXQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcGFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJnVGhlbWV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMudGhlbWUgPSAnJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZVRoZW1lKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZFRoZW1lXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudGhlbWUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVzdG9yZVRoZW1lKCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZFRoZW1lJykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCZ1RoZW1lOyIsImltcG9ydCBwYWdlIGZyb20gJy4vcGFnZSc7XHJcbmltcG9ydCBQcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcclxuXHJcbmNvbnN0IGNyZWF0ZUVkaXQgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuXHJcbiAgICBjb25zdCBhZGRFdmVudCA9ICgpID0+IHtcclxuICAgICAgICBpbml0QnV0dG9ucygpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7ICAgICAgICBcclxuICAgICAgICBjb25zdCBmb3JtUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlIC5mb3JtLXByb2plY3QnKTtcclxuICAgICAgICBjb25zdCBmb3JtVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlIC5mb3JtLXRvZG8nKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0UGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdCB1bCBsaSAuZmEtcGVuLXRvLXNxdWFyZScpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwbGF5Rm9ybSk7XHJcblxyXG4gICAgICAgIGZvcm1Qcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZUZvcm1Qcm9qZWN0KTtcclxuICAgICAgICBmb3JtVG9kby5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVGb3JtVG9kbyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheUZvcm0gPSAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1wcm9qZWN0IC5hZGQtcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUgLmZvcm0tcHJvamVjdCcpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1wcm9qZWN0IGJ1dHRvblt0eXBlPVwiYnV0dG9uXCJdJyk7XHJcbiAgIFxyXG4gICAgICAgIGNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0IC5hZGQtdG9kbycpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Ub2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUgLmZvcm0tdG9kbycpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS10b2RvIGJ1dHRvblt0eXBlPVwiYnV0dG9uXCJdJyk7XHJcbiBcclxuICAgICAgICBpZigoYWRkUHJvamVjdEJ0bi5jb250YWlucyhlLnRhcmdldCkgfHwgZm9ybVByb2plY3QuY29udGFpbnMoZS50YXJnZXQpKSBcclxuICAgICAgICAgICAgJiYgIWRlbGV0ZVByb2plY3RCdG4uY29udGFpbnMoZS50YXJnZXQpXHJcbiAgICAgICAgICAgICl7XHJcbiAgICAgICAgICAgIG9wZW5Gb3JtKCcuZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHBhZ2UubmF2V2lkdGgoJzByZW0nKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoKGFkZFRvZG9CdG4uY29udGFpbnMoZS50YXJnZXQpIHx8IGZvcm1Ub2RvLmNvbnRhaW5zKGUudGFyZ2V0KSkgXHJcbiAgICAgICAgICAgICYmICFkZWxldGVUb2RvQnRuLmNvbnRhaW5zKGUudGFyZ2V0KVxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgICAgICBvcGVuRm9ybSgnLmZvcm0tdG9kbycpO1xyXG4gICAgICAgICAgICBwYWdlLm5hdldpZHRoKCcwcmVtJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIWZvcm1Qcm9qZWN0LmNvbnRhaW5zKGUudGFyZ2V0KSB8fCAhZm9ybVRvZG8uY29udGFpbnMoZS50YXJnZXQpKXtcclxuICAgICAgICAgICAgY2xvc2VGb3JtKCk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcGVuRm9ybSA9IChmb3JtKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFzaWRlICR7Zm9ybX1gKS5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmxheScpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS1wcm9qZWN0JykuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlIC5mb3JtLXRvZG8nKS5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGVyck1zZygnJywgJ2Zvcm0tcHJvamVjdCcpO1xyXG4gICAgICAgIGVyck1zZygnJywgJ2Zvcm0tdG9kbycpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUZvcm1Qcm9qZWN0ID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgZm9ybVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZSAuZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGUudGFyZ2V0WzBdO1xyXG5cclxuICAgICAgICBpZihmb3JtUHJvamVjdC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0TmFtZS52YWx1ZSAhPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdHMuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdE5hbWUudmFsdWUgPSAnJzsgICAgXHJcbiAgICAgICAgICAgICAgICBjbG9zZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UubG9hZFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZXJyTXNnKCdJbnZhbGlkIFByb2plY3QnLCAnZm9ybS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVyck1zZygnJywgJ2Zvcm0tcHJvamVjdCcpLCAyNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVGb3JtVG9kbyA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1Ub2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUgLmZvcm0tdG9kbycpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWxpc3QgLnByb2plY3QtdGl0bGUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdG9kb1RpdGxlID0gZS50YXJnZXRbMF07XHJcbiAgICAgICAgY29uc3QgdG9kb0RhdGUgPSBlLnRhcmdldFsxXTtcclxuICAgICAgICBjb25zdCB0b2RvSW1wb3J0YW50ID0gZS50YXJnZXRbMl07XHJcblxyXG4gICAgICAgIGlmKGZvcm1Ub2RvLmNsYXNzTGlzdC5jb250YWlucygnbm90LWFjdGl2ZScpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIGlmKHRvZG9UaXRsZS52YWx1ZSAhPT0gJycgJiYgdG9kb0RhdGUudmFsdWUgIT09ICcnKXtcclxuICAgICAgICAgICAgICAgIHByb2plY3RzLmFkZFRvZG8odG9kb1RpdGxlLnZhbHVlLCB0b2RvRGF0ZS52YWx1ZSwgdG9kb0ltcG9ydGFudC5jaGVja2VkLCBwcm9qZWN0VGl0bGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdFRpdGxlLmlkKTtcclxuICAgICAgICAgICAgICAgIHRvZG9UaXRsZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdG9kb0RhdGUudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHRvZG9JbXBvcnRhbnQuY2hlY2tlZCA9IGZhbHNlOyAgXHJcbiAgICAgICAgICAgICAgICBjbG9zZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UubG9hZFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVyck1zZygnSW52YWxpZCBUb2RvJywgJ2Zvcm0tdG9kbycpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlcnJNc2coJycsICdmb3JtLXRvZG8nKSwgMjUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pZCA9IHByb2plY3QuaWQ7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICBgPGxpIGNsYXNzPVwicHJvamVjdC1pdGVtXCIgaWQ9XCIke3Byb2plY3QuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtwcm9qZWN0LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiIGlkPVwiJHtwcm9qZWN0LmlkfVwiPjwvaT5cclxuICAgICAgICAgICAgPC9saT5gICAgICBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFRvZG8gPSAodG9kbykgPT4ge1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGlkPVwiJHt0b2RvLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLWNoZWNrICR7dG9kby5jb21wbGV0ZWQgPyBcInRvZG8tY2hlY2tcIiA6IG51bGx9XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7dG9kby50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXBsYW5cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNhbGVuZGFyLXdlZWtcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHt0b2RvLmRhdGV9PC9zcGFuPiAgICBcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8taWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtc3RhciAke3RvZG8uaW1wb3J0YW50ID8gXCJ0b2RvLXN0YXJcIiA6IG51bGx9XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiIGlkPVwiJHt0b2RvLmlkfVwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItcHJvamVjdCB1bCcpO1xyXG4gICAgICAgIHVzZXJQcm9qZWN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHByb2plY3RzLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgdXNlclByb2plY3QuaW5uZXJIVE1MICs9IGFkZFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJUb2RvcyA9IChwcm9qZWN0SWQpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWxpc3QgdWwnKTtcclxuICAgICAgICB1c2VyTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBwcm9qZWN0cy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09IHByb2plY3RJZCkudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgICAgICAgICB1c2VyTGlzdC5pbm5lckhUTUwgKz0gYWRkVG9kbyh0b2RvKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtJyk7XHJcbiAgICAgICAgICAgIGFsbEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0sIGluZGV4ICogNzUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXJyTXNnID0gKHRleHQsIHRhcmdldCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3RhcmdldH0gLmVyci1tc2dgKS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7YWRkRXZlbnQsIHJlbmRlclByb2plY3QsIHJlbmRlclRvZG9zfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRWRpdDsiLCJpbXBvcnQgQmdUaGVtZSBmcm9tIFwiLi9iZ1RoZW1lXCI7XHJcbmltcG9ydCBjcmVhdGVFZGl0IGZyb20gXCIuL2NyZWF0ZUVkaXRcIjtcclxuXHJcbmNvbnN0IHBhZ2UgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgYmdUaGVtZSA9IG5ldyBCZ1RoZW1lKCk7XHJcblxyXG4gICAgY29uc3QgbG9hZFBhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaW5pdEJ1dHRvbnMoKTtcclxuICAgICAgICBjcmVhdGVFZGl0LmFkZEV2ZW50KCk7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIGNvbnN0IGluaXRCdXR0b25zID0gKCkgPT4geyAgICBcclxuICAgICAgICBjb25zdCBvcGVuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS1iYXJzJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXhtYXJrJyk7ICAgXHJcbiAgICAgICAgY29uc3QgdGhlbWVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItbGlzdCB1bCcpO1xyXG5cclxuICAgICAgICBvcGVuTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdldpZHRoKCcyMXJlbScpKTtcclxuICAgICAgICBjbG9zZU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZXaWR0aCgnMHJlbScpKTtcclxuICAgICAgICB0aGVtZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUaGVtZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1saXN0IC5wcm9qZWN0LXRpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVmYXVsdC1wcm9qZWN0IHVsIGxpJyk7XHJcbiAgICAgICAgY29uc3QgdXNlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0IHVsIGxpJyk7XHJcblxyXG4gICAgICAgIGRlZmF1bHRQcm9qZWN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdFRpdGxlLmlkID09IHByb2plY3QuaWQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQocHJvamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUaXRsZShwcm9qZWN0VGl0bGUsIHByb2plY3QuaW5uZXJUZXh0LCBwcm9qZWN0LmlkKTtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVkaXQucmVuZGVyVG9kb3MocHJvamVjdC5pZCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZChwcm9qZWN0LnRhcmdldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1c2VyUHJvamVjdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3RUaXRsZS5pZCA9PSBwcm9qZWN0LmlkKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkKHByb2plY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5VGl0bGUocHJvamVjdFRpdGxlLCBwcm9qZWN0LmlubmVyVGV4dCwgcHJvamVjdC5pZCk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFZGl0LnJlbmRlclRvZG9zKHByb2plY3QuaWQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQocHJvamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3BlbnMsQ2xvc2VzIHByb2plY3QgY29sbGVjdGlvblxyXG4gICAgY29uc3QgbmF2V2lkdGggPSAod2lkdGgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb2xsZWN0aW9uJykuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFRoZW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGJnVGhlbWUudGhlbWUgPT0gJ2xpZ2h0JykgYmdUaGVtZS50aGVtZSA9ICdkYXJrJztcclxuICAgICAgICBlbHNlIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgXHJcbiAgICAgICAgbG9hZFRoZW1lKGJnVGhlbWUudGhlbWUpO1xyXG4gICAgICAgIGJnVGhlbWUuc2F2ZVRoZW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Q3VycmVudFRoZW1lID0gKCkgPT4geyAgICBcclxuICAgICAgICBiZ1RoZW1lLnRoZW1lID0gJ2xpZ2h0JztcclxuICAgIFxyXG4gICAgICAgIGlmKGJnVGhlbWUucmVzdG9yZVRoZW1lKCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gYmdUaGVtZS50aGVtZSA9IGJnVGhlbWUucmVzdG9yZVRoZW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9tYXRjaE1lZGlhIG1ldGhvZCBzdXBwb3J0ZWRcclxuICAgICAgICBlbHNlIGlmKHdpbmRvdy5tYXRjaE1lZGlhKXtcclxuICAgICAgICAgICAgLy9PUyB0aGVtZSBzZXR0aW5nIGRldGVjdGVkIGFzIGRhcmtcclxuICAgICAgICAgICAgaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKXtcclxuICAgICAgICAgICAgICAgIGJnVGhlbWUudGhlbWUgPSAnZGFyayc7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBsb2FkVGhlbWUgPSAodGhlbWUpID0+IHtcclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKTtcclxuICAgICAgICByb290LnNldEF0dHJpYnV0ZSgnY29sb3Itc2NoZW1lJywgYCR7dGhlbWV9YCk7IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlUaXRsZSA9ICh0YXJnZXQsIHRpdGxlLCBpZCkgPT4ge1xyXG4gICAgICAgIHRhcmdldC5pZCA9IGlkO1xyXG4gICAgICAgIHRhcmdldC5pbm5lclRleHQgPSBgJHt0aXRsZX1gO1xyXG4gICAgICAgIG5hdldpZHRoKCcwcmVtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSAodGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgcmVzZXRTZWxlY3RlZCgpO1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc2V0U2VsZWN0ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlZmF1bHQtcHJvamVjdCB1bCBsaScpLmZvckVhY2goKHByaikgPT4gcHJqLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QgdWwgbGknKS5mb3JFYWNoKChwcmopID0+IHByai5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtsb2FkUGFnZSwgbG9hZFRoZW1lLCBnZXRDdXJyZW50VGhlbWUsIG5hdldpZHRofVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZTsiLCJjbGFzcyBQcm9qZWN0e1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIHRvZG9zID0gW10pe1xyXG4gICAgICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gdG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2F2ZVRvZG9zKCl7XHJcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZHRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZXN0b3JlVG9kb3MoKXsgICAgICAgXHJcbiAgICAvLyAgICAgY29uc3Qgc2F2ZWR0b2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkdG9kb3MnKSk7XHJcbiAgICAvLyAgICAgaWYoc2F2ZWR0b2Rvcyl7XHJcbiAgICAvLyAgICAgICB0aGlzLnRvZG9zID0gc2F2ZWR0b2RvcztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XHJcblxyXG4vLyBjbGFzcyBQcm9qZWN0e1xyXG4vLyAgICAgY29uc3RydWN0b3IocHJvamVjdCl7XHJcbi8vICAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuLy8gICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgYWRkVG9kbyhuZXdUb2RvKXtcclxuLy8gICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZGVsZXRlVG9kbyh0aXRsZSl7XHJcbi8vICAgICAgICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9PSB0aXRsZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgaWZFeGlzdHModGl0bGUpe1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnRvZG9zLnNvbWUoKHRvZG8pID0+IHRvZG8udGl0bGUgPT09IHRpdGxlKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBnZXRQcm9qZWN0KHByb2plY3ROYW1lKXtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy50b2Rvcy5maW5kKChuYW1lKSA9PiBuYW1lID09PSBwcm9qZWN0TmFtZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgc2F2ZVRvZG9zKCl7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZHRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb3MpKTtcclxuLy8gICAgIH1cclxuICBcclxuLy8gICAgIHJlc3RvcmVUb2RvcygpeyAgICAgICBcclxuLy8gICAgICAgICBjb25zdCBzYXZlZHRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2F2ZWR0b2RvcycpKTtcclxuLy8gICAgICAgICBpZihzYXZlZHRvZG9zKXtcclxuLy8gICAgICAgICAgIHRoaXMudG9kb3MgPSBzYXZlZHRvZG9zO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG9cIjtcclxuXHJcbmNsYXNzIFByb2plY3Rze1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUHJvamVjdCh0aXRsZSl7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUHJvamVjdChwcm9qZWN0SWQpe1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRpdGxlLCBkYXRlLCBpbXBvcnRhbnQsIHByb2plY3RJZCl7XHJcbiAgICAgICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkYXRlLCBpbXBvcnRhbnQpO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PSBwcm9qZWN0SWQpLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG8odGl0bGUsIGRhdGUsIGNvbXBsZXRlZCwgaW1wb3J0YW50LCBwcm9qZWN0SWQsIHRvZG9JZCl7XHJcbiAgICAgICAgY29uc3QgZmluZFByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZCk7XHJcbiAgICAgICAgY29uc3QgZmluZFRvZG8gPSBmaW5kUHJvamVjdC50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSB0b2RvSWQpO1xyXG5cclxuICAgICAgICBmaW5kVG9kby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIGZpbmRUb2RvLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIGZpbmRUb2RvLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcclxuICAgICAgICBmaW5kVG9kby5pbXBvcnRhbnQgPSBpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9kbyhwcm9qZWN0SWQsIHRvZG9JZCl7XHJcbiAgICAgICAgY29uc3QgZmluZFByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZCk7XHJcbiAgICAgICAgY29uc3QgZmluZFRvZG8gPSBmaW5kUHJvamVjdC50b2Rvcy5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSB0b2RvSWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpbmRQcm9qZWN0ID0gZmluZFByb2plY3QudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLmlkICE9PSBmaW5kVG9kby5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVByb2plY3RzKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZFByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvamVjdHMpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlUHJvamVjdHMoKXsgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc2F2ZWRQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkUHJvamVjdHMnKSk7XHJcbiAgICAgICAgaWYoc2F2ZWRQcm9qZWN0cyl7XHJcbiAgICAgICAgICB0aGlzLnByb2plY3RzID0gc2F2ZWRQcm9qZWN0cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RzOyIsImNsYXNzIFRvZG97XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSA9IFwiTm8gdGl0bGVcIiwgZGF0ZSA9ICdObyBkYXRlJywgaW1wb3J0YW50ID0gZmFsc2Upe1xyXG4gICAgICAgIHRoaXMuaWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRhbnQgPSBpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGFnZSBmcm9tICcuL21vZHVsZXMvcGFnZSc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgcGFnZS5sb2FkVGhlbWUocGFnZS5nZXRDdXJyZW50VGhlbWUoKSk7XHJcbiAgICBwYWdlLmxvYWRQYWdlKCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==