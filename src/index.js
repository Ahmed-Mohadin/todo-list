// Opens project collection
document.querySelector('.fa-bars').addEventListener('click', () => navWidth('16rem'));

// Closes project collection
document.querySelector('.fa-xmark').addEventListener('click', () => navWidth('0rem'));

const navWidth = (width) => {
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