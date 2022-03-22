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
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");



const page = (() => {
    const bgTheme = new _bgTheme__WEBPACK_IMPORTED_MODULE_0__["default"]();

    const loadPage = () => {
        initButtons();
    }

    const initButtons = () => {    
        const openMenu = document.querySelector('.fa-bars');
        const closeMenu = document.querySelector('.fa-xmark');   
        const themeIcon = document.querySelector('.theme');

        const defaultProject = document.querySelectorAll('.default-project ul li');
        const userProject = document.querySelectorAll('.user-project ul li');

        openMenu.addEventListener('click', () => navWidth('16rem'));
        closeMenu.addEventListener('click', () => navWidth('0rem'));
        themeIcon.addEventListener('click', switchTheme);

        defaultProject.forEach((project) => {
            project.addEventListener('click', () => displayTitle(project.innerText));
        })

        userProject.forEach((project) => {
            project.addEventListener('click', () => displayTitle(project.innerText));
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

    const displayTitle = (title) => {
        const projectTitle = document.querySelector('.user-list .project-title');
        projectTitle.innerText = `${title}`;
        navWidth('0rem');
    }

    return {loadPage, getCurrentTheme, loadTheme}
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (page);

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task{
    constructor(title, date = 'No date'){
        this.id = new Date.now();
        this.title = title;
        this.date = date;
        this.completed = false;
        this.important = false;
    }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7O0FDZFU7QUFDTjtBQUMxQjtBQUNBO0FBQ0Esd0JBQXdCLGdEQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSxNQUFNO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsTUFBTTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7OztBQzdFSjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7QUFDbEM7QUFDQTtBQUNBLElBQUksK0RBQWMsQ0FBQyxxRUFBb0I7QUFDdkMsSUFBSSw4REFBYTtBQUNqQixDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9iZ1RoZW1lLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQmdUaGVtZXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzYXZlVGhlbWUoKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNhdmVkVGhlbWVcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy50aGVtZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXN0b3JlVGhlbWUoKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmVkVGhlbWUnKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJnVGhlbWU7IiwiaW1wb3J0IEJnVGhlbWUgZnJvbSBcIi4vYmdUaGVtZVwiO1xyXG5pbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XHJcblxyXG5jb25zdCBwYWdlID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGJnVGhlbWUgPSBuZXcgQmdUaGVtZSgpO1xyXG5cclxuICAgIGNvbnN0IGxvYWRQYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGluaXRCdXR0b25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5pdEJ1dHRvbnMgPSAoKSA9PiB7ICAgIFxyXG4gICAgICAgIGNvbnN0IG9wZW5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLWJhcnMnKTtcclxuICAgICAgICBjb25zdCBjbG9zZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEteG1hcmsnKTsgICBcclxuICAgICAgICBjb25zdCB0aGVtZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVmYXVsdC1wcm9qZWN0IHVsIGxpJyk7XHJcbiAgICAgICAgY29uc3QgdXNlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0IHVsIGxpJyk7XHJcblxyXG4gICAgICAgIG9wZW5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbmF2V2lkdGgoJzE2cmVtJykpO1xyXG4gICAgICAgIGNsb3NlTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdldpZHRoKCcwcmVtJykpO1xyXG4gICAgICAgIHRoZW1lSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaFRoZW1lKTtcclxuXHJcbiAgICAgICAgZGVmYXVsdFByb2plY3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGlzcGxheVRpdGxlKHByb2plY3QuaW5uZXJUZXh0KSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdXNlclByb2plY3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGlzcGxheVRpdGxlKHByb2plY3QuaW5uZXJUZXh0KSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBPcGVucyxDbG9zZXMgcHJvamVjdCBjb2xsZWN0aW9uXHJcbiAgICBjb25zdCBuYXZXaWR0aCA9ICh3aWR0aCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvbGxlY3Rpb24nKS5zdHlsZS53aWR0aCA9IGAke3dpZHRofWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoVGhlbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoYmdUaGVtZS50aGVtZSA9PSAnbGlnaHQnKSBiZ1RoZW1lLnRoZW1lID0gJ2RhcmsnO1xyXG4gICAgICAgIGVsc2UgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICBcclxuICAgICAgICBsb2FkVGhlbWUoYmdUaGVtZS50aGVtZSk7XHJcbiAgICAgICAgYmdUaGVtZS5zYXZlVGhlbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRDdXJyZW50VGhlbWUgPSAoKSA9PiB7ICAgIFxyXG4gICAgICAgIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgXHJcbiAgICAgICAgaWYoYmdUaGVtZS5yZXN0b3JlVGhlbWUoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBiZ1RoZW1lLnRoZW1lID0gYmdUaGVtZS5yZXN0b3JlVGhlbWUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL21hdGNoTWVkaWEgbWV0aG9kIHN1cHBvcnRlZFxyXG4gICAgICAgIGVsc2UgaWYod2luZG93Lm1hdGNoTWVkaWEpe1xyXG4gICAgICAgICAgICAvL09TIHRoZW1lIHNldHRpbmcgZGV0ZWN0ZWQgYXMgZGFya1xyXG4gICAgICAgICAgICBpZih3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpe1xyXG4gICAgICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdkYXJrJztcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRUaGVtZSA9ICh0aGVtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpO1xyXG4gICAgICAgIHJvb3Quc2V0QXR0cmlidXRlKCdjb2xvci1zY2hlbWUnLCBgJHt0aGVtZX1gKTsgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheVRpdGxlID0gKHRpdGxlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGlzdCAucHJvamVjdC10aXRsZScpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBgJHt0aXRsZX1gO1xyXG4gICAgICAgIG5hdldpZHRoKCcwcmVtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtsb2FkUGFnZSwgZ2V0Q3VycmVudFRoZW1lLCBsb2FkVGhlbWV9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2t7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGF0ZSA9ICdObyBkYXRlJyl7XHJcbiAgICAgICAgdGhpcy5pZCA9IG5ldyBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbXBvcnRhbnQgPSBmYWxzZTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBhZ2UgZnJvbSAnLi9tb2R1bGVzL3BhZ2UnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIHBhZ2UubG9hZFRoZW1lKHBhZ2UuZ2V0Q3VycmVudFRoZW1lKCkpO1xyXG4gICAgcGFnZS5sb2FkUGFnZSgpO1xyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=