import './style.css';
import ToDoList from './todolist';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const listObj = new ToDoList();

document.getElementById('list-container').appendChild(listObj.displayItems());