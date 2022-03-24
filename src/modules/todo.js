class Todo{
    constructor(title, date = 'No date', completed = false, important = false){
        this.id = Date.now();
        this.title = title;
        this.date = date;
        this.completed = completed;
        this.important = important;
    }
}

export default Todo;