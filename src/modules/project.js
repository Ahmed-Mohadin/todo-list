class Project{
    constructor(title, todos = []){
        this.id = Date.now();
        this.title = title;
        this.todos = todos;
    }
}

export default Project;