import BgTheme from "./bgTheme";
import createEdit from "./createEdit";

const page = (() => {
    const bgTheme = new BgTheme();

    const loadPage = () => {
        initButtons();
        createEdit.addEvent();
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
                createEdit.renderTodos(e.target.id);
            });
        });

        userProject.forEach((project) => {
            project.addEventListener('click', (e) => {
                displayTitle(projectTitle, e.target.innerText, e.target.id);
                createEdit.renderTodos(e.target.id);
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

export default page;