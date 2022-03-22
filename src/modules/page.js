import BgTheme from "./bgTheme";
import Task from "./task";

const page = (() => {
    const bgTheme = new BgTheme();

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

export default page;