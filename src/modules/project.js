class Project{
    constructor(title, todos = []){
        this.id = Date.now();
        this.title = title;
        this.todos = todos;
    }

    // saveTodos(){
    //     localStorage.setItem("savedtodos", JSON.stringify(this.todos));
    // }

    // restoreTodos(){       
    //     const savedtodos = JSON.parse(localStorage.getItem('savedtodos'));
    //     if(savedtodos){
    //       this.todos = savedtodos;
    //     }
    // }
}

export default Project;

// class Project{
//     constructor(project){
//         this.project = project;
//         this.todos = [];
//     }

//     addTodo(newTodo){
//         this.todos.push(newTodo);
//     }

//     deleteTodo(title){
//         this.todos = this.todos.filter((todo) => todo.title !== title);
//     }

//     ifExists(title){
//         return this.todos.some((todo) => todo.title === title);
//     }

//     getProject(projectName){
//         return this.todos.find((name) => name === projectName);
//     }

//     saveTodos(){
//         localStorage.setItem("savedtodos", JSON.stringify(this.todos));
//     }
  
//     restoreTodos(){       
//         const savedtodos = JSON.parse(localStorage.getItem('savedtodos'));
//         if(savedtodos){
//           this.todos = savedtodos;
//         }
//     }
// }

// export default Project;