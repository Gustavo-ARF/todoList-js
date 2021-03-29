export class TodoList {

    constructor(){
        this.cargarLocalStorage();
        this.tareasPendintes();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
        this.tareasPendintes();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id );
        this.guardarLocalStorage();
        this.tareasPendintes();
    }

    marcarCompletado(id){
        for(const todo of this.todos){

            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.tareasPendintes();
                break;
            }
        }
    }

    elimininarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){

        localStorage.getItem('todo') ?
        this.todos = JSON.parse(localStorage.getItem('todo')) :
        this.todos = [];
    }

    tareasPendintes(){
        let pendientes = 0;
        this.todos.forEach(elem => {
            (!elem.completado === true) ? pendientes++ : null;
        });

        return pendientes;
    }

    
}