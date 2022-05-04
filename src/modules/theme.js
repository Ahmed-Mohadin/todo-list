class Theme{
    constructor(){
        this.mode = 'light';
    }

    // Gets the current mode from localStorage or window.mathMedia
    getCurrentMode(){
        if(this.restoreMode()) return this.mode = this.restoreMode();
        // matchMedia method supported
        else if(window.matchMedia){
            // OS theme setting detected as dark
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                this.mode = 'dark';
            } else{
                this.mode = 'light';
            }
        }
    }

    // Switches mode and saves mode
    switchMode(){
        this.mode == 'light' ? this.mode = 'dark' : this.mode = 'light';
        this.saveMode();
    }

    // Saves mode in localStorage
    saveMode(){
        localStorage.setItem("savedMode", JSON.stringify(this.mode));
    }
    
    // Restores the mode from localStorage
    restoreMode(){                
        return JSON.parse(localStorage.getItem('savedMode'));
    }
}

export default Theme;