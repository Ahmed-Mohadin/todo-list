import Project from "./project";
import Todo from "./todo";

class Collection{
    constructor(){
        this.projects = [];
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
            project.todos.forEach((todo) => {
                if(todo.id == todoId){
                    if(todo.completed){
                        todo.completed = false;
                    } else{
                        todo.completed = true;
                    }    
                }
            })
        })
    }

    todoStar(todoId){
        this.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(todo.id == todoId){
                    if(todo.important){
                        todo.important = false;
                    } else{
                        todo.important = true;
                    }    
                }
            })
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