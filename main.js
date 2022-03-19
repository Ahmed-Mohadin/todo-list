/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// 
document.querySelector('.fa-bars').addEventListener('click', () => {
    navWidth('16rem');    
});

document.querySelector('.fa-xmark').addEventListener('click', () => {
    navWidth('0rem');
})

function navWidth(width){
    document.querySelector('.project-collection').style.width = `${width}`;
}

const themeCheckbox = document.querySelector('.theme #theme-change');
themeCheckbox.addEventListener('click', (e) => {
    if(e.target.checked === true){
        document.body.classList.remove("light");
    }
    else{
        document.body.classList.add("light");
    }
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLG1FQUFtRSxNQUFNO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtYmFycycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbmF2V2lkdGgoJzE2cmVtJyk7ICAgIFxyXG59KTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS14bWFyaycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbmF2V2lkdGgoJzByZW0nKTtcclxufSlcclxuXHJcbmZ1bmN0aW9uIG5hdldpZHRoKHdpZHRoKXtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvbGxlY3Rpb24nKS5zdHlsZS53aWR0aCA9IGAke3dpZHRofWA7XHJcbn1cclxuXHJcbmNvbnN0IHRoZW1lQ2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUgI3RoZW1lLWNoYW5nZScpO1xyXG50aGVtZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGlmKGUudGFyZ2V0LmNoZWNrZWQgPT09IHRydWUpe1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImxpZ2h0XCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJsaWdodFwiKTtcclxuICAgIH1cclxufSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=