class Project{
    constructor(title){
        this.id = Date.now();
        this.title = title;
        this.todos = [];
    }
}

export default Project;