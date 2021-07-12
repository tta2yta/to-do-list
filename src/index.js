import './style.css';
import ToDoList from './todolist';

const listObj = new ToDoList();

document.getElementById('list-container').appendChild(listObj.displayItems());