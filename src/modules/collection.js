import { addDays, format, isEqual, isWithinInterval, parseISO } from "date-fns";
import Project from "./project";
import Todo from "./todo";

class Collection{
    constructor(){
        this.projects = [];
        this.addProject('All Tasks');
        this.addProject('Today');
        this.addProject('This Week');
        this.addProject('Important');
    }

    foundProject(title){
        return this.projects.find((project) => project.title == title);
    }

    addProject(title){
        const newProject = new Project(title);
        this.projects.push(newProject);
    }

    editProject(title, projectId){
        this.projects.forEach((project) => {
            if(project.id == projectId) project.title = title;
        });
    }
    
    deleteProject(projectId){
        this.projects = this.projects.filter((project) => project.id != projectId);
    }

    addTodo(title, date, important, projectId){
        const newTodo = new Todo(title, date, important);
        this.projects.find((project) => project.id == projectId).todos.push(newTodo);
    }

    editTodo(title, date, important, todoId){
        this.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(todo.id == todoId){
                    todo.title = title;
                    todo.date = date;
                    todo.important = important;
                }
            })
        })
    }

    deleteTodo(todoId){
        this.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(todo.id == todoId){
                    project.todos = project.todos.filter((todo) => todo.id != todoId);                    
                }
            })
        })
    }

    todoCheck(todoId){
        this.projects.forEach((project) => {
            if(project.title == 'All Tasks' || project.title == 'Today' ||
            project.title == 'This Week' || project.title == 'Important'){
                return;
            } else{
                project.todos.forEach((todo) => {
                    if(todo.id == todoId){
                        if(todo.completed){
                            todo.completed = false;
                        } else{
                            todo.completed = true;
                        }    
                    }
                })    
            }
        })
    }

    todoStar(todoId){
        this.projects.forEach((project) => {
            if(project.title == 'All Tasks' || project.title == 'Today' ||
            project.title == 'This Week' || project.title == 'Important'){
                return;
            } else{
                project.todos.forEach((todo) => {
                    if(todo.id == todoId){
                        if(todo.important){
                            todo.important = false;
                            console.log('false')
                        } else{
                            todo.important = true;
                            console.log('true')
                        }    
                    }
                })    
            }
        })        
    }

    getAllTodos(){
        this.projects.forEach((project) => {
            if(project.title == 'All Tasks'){
                project.todos = [];
                this.projects.forEach((prj) => {
                    if(prj.title == 'All Tasks' || prj.title == 'Today' ||
                    prj.title == 'This Week' || prj.title == 'Important'){
                        return;
                    }
                    else{
                        prj.todos.forEach((todo) => project.todos.push(todo));
                        console.log(project.todos);
                    }
                })
            }
        })
    }

    getTodayTodos(){
        let today = Date.parse(format(new Date(), 'yyyy-MM-dd'));
        this.projects.forEach((project) => {
            if(project.title == 'Today'){
                project.todos = [];
                this.projects.forEach((prj) => {
                    if(prj.title == 'All Tasks' || prj.title == 'Today' ||
                    prj.title == 'This Week' || prj.title == 'Important') return;
                    prj.todos.forEach((todo) => {
                        let date = Date.parse(todo.date);
                        if(isEqual(date, today)){
                            project.todos.push(todo);
                        }        
                    });
                })
            }
        })
    }

    getTodosThisWeek(){
        this.projects.forEach((project) => {
            if(project.title == 'This Week'){
                project.todos = [];
                this.projects.forEach((prj) => {
                    if(prj.title == 'All Tasks' || prj.title == 'Today' ||
                    prj.title == 'This Week' || prj.title == 'Important') return;
                    prj.todos.forEach((todo) => {
                        let date = parseISO(todo.date);
                        if(this.checkNextWeek(date)){
                            project.todos.push(todo)
                        }
                    });
                })
            }
        })
    }

    //check if the date is within the interval of next week
    checkNextWeek(taskDate){
        let nextWeekPlus1 = addDays(new Date(), 8);  //interval does not count the edges so plus 1
        let today = new Date();
        return isWithinInterval(taskDate,{
            start: today,
            end: nextWeekPlus1
        });
    }

    getImportantTodos(){
        this.projects.forEach((project) => {
            if(project.title == 'Important'){
                project.todos = [];
                this.projects.forEach((prj) => {
                    if(prj.title == 'All Tasks' || prj.title == 'Today' ||
                    prj.title == 'This Week' || prj.title == 'Important') return;
                    prj.todos.forEach((todo) => {
                        if(todo.important){
                            project.todos.push(todo)
                        }
                    });
                })
            }
        })        
    }    

    sortTodos(){
        this.projects.forEach((project) => {
            project.todos.sort((a, b) => {
                if(a.completed && !b.completed) return 1;
                else if(!a.completed && b.completed) return -1;
                else if(a.important && !b.important) return -1;
                else if(!a.important && b.important) return 1;
                else if(a.date > b.date) return 1;
                else if(a.date < b.date) return -1;
                else return 0;
            })
        })
    }

    saveProjects(){
        localStorage.setItem("savedProjects", JSON.stringify(this.projects));
    }

    restoreProjects(){       
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects'));
        if(savedProjects){
          this.projects = savedProjects;
        }
    }
}

export default Collection;