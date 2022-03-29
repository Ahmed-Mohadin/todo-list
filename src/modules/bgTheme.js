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

export default BgTheme;