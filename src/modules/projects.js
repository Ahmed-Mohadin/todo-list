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

    deleteProject(projectId){
        this.projects = this.projects.filter((project) => {
            project.id !== projectId;
        })
    }

    addTodo(title, date, completed, important, projectId){
        const newTodo = new Todo(title, date, completed, important);
        this.projects.find((project) => project.id == projectId).todos.push(newTodo);
    }

    editTodo(title, date, completed, important, projectId, todoId){
        const findProject = this.projects.find((project) => project.id === projectId);
        const findTodo = findProject.todos.find((todo) => todo.id === todoId);

        findTodo.title = title;
        findTodo.date = date;
        findTodo.completed = completed;
        findTodo.important = important;
    }

    removeTodo(projectId, todoId){
        const findProject = this.projects.find((project) => project.id === projectId);
        const findTodo = findProject.todos.find((todo) => todo.id === todoId);
        
        findProject = findProject.todos.filter((todo) => todo.id !== findTodo.id);
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