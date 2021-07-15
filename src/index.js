import './style.css';
import ToDoList from './todolist';
import { addCheckboxhandler } from './checkstatus';
import { addHandlers } from './sortingitems';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const listObj = new ToDoList();
listObj.getListItmes();

document.getElementById('list-container').appendChild(listObj.displayItems());
const cols = document.querySelectorAll('.listItem');
[].forEach.call(cols, addHandlers);

const chkBox = document.querySelectorAll('.checkbox');
[].forEach.call(chkBox, addCheckboxhandler);