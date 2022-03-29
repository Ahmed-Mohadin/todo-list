class Todo{
    constructor(title = "No title", date = 'No date', important = false){
        this.id = Date.now();
        this.title = title;
        this.date = date;
        this.completed = false;
        this.important = important;
    }
}

export default Todo;