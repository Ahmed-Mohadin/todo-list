class Todo{
    constructor(title, date, important){
        this.id = Date.now();
        this.title = title;
        this.date = date;
        this.completed = false;
        this.important = important;
    }
}

export default Todo;