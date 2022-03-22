import {BgTheme} from './modules/bgTheme';

// Opens project collection
document.querySelector('.fa-bars').addEventListener('click', () => navWidth('16rem'));

// Closes project collection
document.querySelector('.fa-xmark').addEventListener('click', () => navWidth('0rem'));

const navWidth = (width) => {
    document.querySelector('.project-collection').style.width = `${width}`;
}


const themeIcon = document.querySelector('.theme');
const bgTheme = new BgTheme();
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