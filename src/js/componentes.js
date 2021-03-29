import { Todo, TodoList } from "../classes";

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const todoCount     = document.querySelector('.main');
const htmlTodoCount = document.querySelector('#todo-count');
const btnTodosCompletados  = document.querySelector('#all-completed');


export const todoList = new TodoList();


export const totalPendientes = () => {
    htmlTodoCount.innerHTML = todoList.tareasPendintes();
}

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class = "${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    return divTodoList.insertAdjacentHTML('beforeend', htmlTodo);
}


// Eventos
txtInput.addEventListener('keyup', (event) => {

    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        totalPendientes();
    }
});


divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){ // click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if(nombreElemento.includes('button')){ // hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.elimininarCompletados();
    
    const completados = document.querySelectorAll('.completed');
    for (const completado of completados) {
        completado.remove();
    }

});


ulFiltros.addEventListener('click', event => {
    const filtro = event.target.text;
    if(!filtro) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        (filtro == 'Pendientes') && completado ? elemento.classList.add('hidden') :
        (filtro == 'Completados') && !completado ? elemento.classList.add('hidden') : '';
    }
});

todoCount.addEventListener('click', () => {
    totalPendientes();
});



btnTodosCompletados.addEventListener('click', () => {
    const todos = divTodoList.querySelectorAll('li');
    
    const todosCompletados = () => {
        let todosCompleted = 0;
        for(const todo of todoList.todos){
            todo.completado ? todosCompleted++ : null;
        };
        return todosCompleted == todoList.todos.length;
    }

    const allTodosCompleted = todosCompletados();
    

    todos.forEach(elem => {

        const checked = () => {
            elem.classList.toggle('completed');
            elem.querySelector('input').toggleAttribute('checked');
            todoList.marcarCompletado(elem.getAttribute('data-id')); // data-id
        }
        
        if(elem.className == '') {
            checked();
        } else if (allTodosCompleted && (elem.className == 'completed')) {
            checked();
        }

    });

    location.reload();
});

