class Todo{
    constructor(title, date, important){
        this.id = Date.now();
        this.title = title;
        this.date = date;
        this.important = important;
        this.completed = false;
    }
}

export default Todo;