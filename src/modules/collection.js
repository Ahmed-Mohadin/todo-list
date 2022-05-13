import { toDate, isToday, isThisWeek, subDays, parseISO } from "date-fns";
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

    titleTaken(title){
        return this.projects.find((project) => project.title == title);
    }

    addProject(title){
        const newProject = new Project(title);
        this.projects.push(newProject);
    }

    editProject(title, projectId){
        const foundProject = this.projects.find((project) => project.id == projectId);
        foundProject.title = title;
    }
    
    deleteProject(projectId){
        this.projects = this.projects.filter((project) => project.id != projectId);
    }

    addTodo(title, date, important, projectId){
        const newTodo = new Todo(title, date, important);
        this.projects.find((project) => project.id == projectId).todos.push(newTodo);
        this.sortTodos();
    }

    editTodo(title, date, important, todoId){
        this.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(todo.id == todoId){
                    todo.title = title;
                    todo.date = date;
                    todo.important = important;
                }
            });
        });
        this.sortTodos();
    }

    deleteTodo(todoId){
        this.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(todo.id == todoId){
                    project.todos = project.todos.filter((todo) => todo.id != todoId);                    
                }
            });
        });
        this.sortTodos();
    }

    todoCheck(todoId){
        this.todoStatus(todoId, 'complete');
        this.sortTodos();
    }

    todoStar(todoId){
        this.todoStatus(todoId, 'important');
        this.sortTodos();
    }
    
    todoStatus(todoId, status){
        this.projects.forEach((project) => {
            if(project.title == 'All Tasks' || project.title == 'Today' ||
               project.title == 'This Week' || project.title == 'Important'){
                return;
            } else{
                project.todos.forEach((todo) => {
                    if(todo.id == todoId){
                        if(status == 'complete'){
                            todo.completed == true ? todo.completed = false : todo.completed = true;
                        } 
                        if(status == 'important'){
                            todo.important == true ? todo.important = false : todo.important = true;                            
                        }
                    }
                });    
            }
        });
    }

    getHomeTodos(title){
        this.projects.forEach((project) => {
            if(project.title == title){
                project.todos = [];
                this.projects.forEach((prj) => {
                    if(prj.title == 'All Tasks' || prj.title == 'Today' ||
                       prj.title == 'This Week' || prj.title == 'Important') return;
                    prj.todos.forEach((todo) => {
                        const taskDate = toDate(parseISO(todo.date));
                        switch(title){
                            case 'All Tasks':
                                project.todos.push(todo);
                                break;
                            case 'Today':
                                if(isToday(taskDate)) project.todos.push(todo);
                                break;
                            case 'This Week':
                                if(isThisWeek(subDays(taskDate, 1))) project.todos.push(todo);
                                break;
                            case 'Important':
                                if(todo.important) project.todos.push(todo);
                                break;
                            default:
                                return
                        }
                    });
                });
            }
        });
    }

    getAllTodos(){
        this.getHomeTodos('All Tasks');        
    }

    getTodayTodos(){
        this.getHomeTodos('Today')
    }

    getTodosThisWeek(){
        this.getHomeTodos('This Week');
    }

    getImportantTodos(){
        this.getHomeTodos('Important');
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
            });
        });
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