import Project from "./project";
import Todo from "./todo";

class Projects{
    constructor(){
        this.projects = [];
    }

    createProject(title){
        const newProject = new Project(title);
        this.projects.push(newProject);
    }

    editProject(title, projectId){
        this.projects.forEach((project) => {
            if(project.id == projectId) project.title = title;
        });
    }

    exists(title){
        return this.projects.find((project) => project.title == title);
    }
    
    deleteProject(projectId){
        this.projects = this.projects.filter((project) => project.id != projectId);
    }

    addTodo(title, date, important, projectId){
        const newTodo = new Todo(title, date, important);
        this.projects.find((project) => project.id == projectId).todos.push(newTodo);
    }

    editTodo(title, date, important, projectId, todoId){
        let findProject = this.projects.find((project) => project.id == projectId);
        let findTodo = findProject.todos.find((todo) => todo.id == todoId);
        findTodo.title = title;
        findTodo.date = date;
        findTodo.important = important;
    }

    removeTodo(projectId, todoId){
        let findProject = this.projects.find((project) => project.id == projectId);
        let findTodo = findProject.todos.find((todo) => todo.id == todoId);
        findProject.todos = findProject.todos.filter((todo) => todo.id != findTodo.id);
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

export default Projects;