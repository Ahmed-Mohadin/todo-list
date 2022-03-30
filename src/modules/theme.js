class Theme{
    constructor(){
        this.mode = 'light';
    }

    switchMode(){
        this.mode == 'light' ? this.mode = 'dark' : this.mode = 'light';
    }

    saveMode(){
        localStorage.setItem("savedMode", JSON.stringify(this.mode));
    }
    
    restoreMode(){                
        return JSON.parse(localStorage.getItem('savedMode'));
    }
}

export default Theme;