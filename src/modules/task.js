export default class Task{
    constructor(title, date = 'No date'){
        this.id = new Date.now();
        this.title = title;
        this.date = date;
        this.completed = false;
        this.important = false;
    }
}