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
/* harmony export */   "BgTheme": () => (/* binding */ BgTheme)
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
/* harmony import */ var _modules_bgTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/bgTheme */ "./src/modules/bgTheme.js");


// Opens project collection
document.querySelector('.fa-bars').addEventListener('click', () => navWidth('16rem'));

// Closes project collection
document.querySelector('.fa-xmark').addEventListener('click', () => navWidth('0rem'));

const navWidth = (width) => {
    document.querySelector('.project-collection').style.width = `${width}`;
}


const themeIcon = document.querySelector('.theme');
const bgTheme = new _modules_bgTheme__WEBPACK_IMPORTED_MODULE_0__.BgTheme();
const getCurrentTheme = () => {    
    bgTheme.theme = 'light';

    if(bgTheme.restoreTheme()){
        bgTheme.theme = bgTheme.restoreTheme();
        return bgTheme.theme;
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

// bgTheme.restoreTheme();
themeIcon.addEventListener('click', switchTheme);
function switchTheme(){
    if(bgTheme.theme == 'light') bgTheme.theme = 'dark';
    else bgTheme.theme = 'light';

    loadTheme(bgTheme.theme);
    bgTheme.saveTheme();
}

function loadTheme(theme){
    const root = document.querySelector(':root');
    root.setAttribute('color-scheme', `${theme}`); 
}

document.addEventListener('DOMContentLoaded', function () {
    loadTheme(getCurrentTheme());
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsTUFBTTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2JnVGhlbWUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJnVGhlbWV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMudGhlbWUgPSAnJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2F2ZVRoZW1lKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlZFRoZW1lXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudGhlbWUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVzdG9yZVRoZW1lKCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlZFRoZW1lJykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0JnVGhlbWV9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtCZ1RoZW1lfSBmcm9tICcuL21vZHVsZXMvYmdUaGVtZSc7XHJcblxyXG4vLyBPcGVucyBwcm9qZWN0IGNvbGxlY3Rpb25cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLWJhcnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5hdldpZHRoKCcxNnJlbScpKTtcclxuXHJcbi8vIENsb3NlcyBwcm9qZWN0IGNvbGxlY3Rpb25cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXhtYXJrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuYXZXaWR0aCgnMHJlbScpKTtcclxuXHJcbmNvbnN0IG5hdldpZHRoID0gKHdpZHRoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb2xsZWN0aW9uJykuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1gO1xyXG59XHJcblxyXG5cclxuY29uc3QgdGhlbWVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lJyk7XHJcbmNvbnN0IGJnVGhlbWUgPSBuZXcgQmdUaGVtZSgpO1xyXG5jb25zdCBnZXRDdXJyZW50VGhlbWUgPSAoKSA9PiB7ICAgIFxyXG4gICAgYmdUaGVtZS50aGVtZSA9ICdsaWdodCc7XHJcblxyXG4gICAgaWYoYmdUaGVtZS5yZXN0b3JlVGhlbWUoKSl7XHJcbiAgICAgICAgYmdUaGVtZS50aGVtZSA9IGJnVGhlbWUucmVzdG9yZVRoZW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIGJnVGhlbWUudGhlbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy9tYXRjaE1lZGlhIG1ldGhvZCBzdXBwb3J0ZWRcclxuICAgIGVsc2UgaWYod2luZG93Lm1hdGNoTWVkaWEpe1xyXG4gICAgICAgIC8vT1MgdGhlbWUgc2V0dGluZyBkZXRlY3RlZCBhcyBkYXJrXHJcbiAgICAgICAgaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKXtcclxuICAgICAgICAgICAgYmdUaGVtZS50aGVtZSA9ICdkYXJrJztcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG4vLyBiZ1RoZW1lLnJlc3RvcmVUaGVtZSgpO1xyXG50aGVtZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hUaGVtZSk7XHJcbmZ1bmN0aW9uIHN3aXRjaFRoZW1lKCl7XHJcbiAgICBpZihiZ1RoZW1lLnRoZW1lID09ICdsaWdodCcpIGJnVGhlbWUudGhlbWUgPSAnZGFyayc7XHJcbiAgICBlbHNlIGJnVGhlbWUudGhlbWUgPSAnbGlnaHQnO1xyXG5cclxuICAgIGxvYWRUaGVtZShiZ1RoZW1lLnRoZW1lKTtcclxuICAgIGJnVGhlbWUuc2F2ZVRoZW1lKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRUaGVtZSh0aGVtZSl7XHJcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKTtcclxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdjb2xvci1zY2hlbWUnLCBgJHt0aGVtZX1gKTsgXHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2FkVGhlbWUoZ2V0Q3VycmVudFRoZW1lKCkpO1xyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=