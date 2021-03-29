import './styles.css';
import {todoList, crearTodoHtml, totalPendientes} from './js/componentes.js';

console.log(todoList.todos);
todoList.todos.forEach(crearTodoHtml);
totalPendientes();
