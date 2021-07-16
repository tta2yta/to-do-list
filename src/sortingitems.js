import { checkComplete, unCheckComplete } from './checkstatus';
import ToDoList, { activeList } from './todolist';
import {removeItem} from './addremove'

const curObj = { curr: null };

function handelDragStart(ev) {
  curObj.curr = this;
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/HTML', this.outerHTML);
  this.classList.add('dragElem');
}

function dragHandeler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  const { top } = this.getBoundingClientRect();
  const { bottom } = this.getBoundingClientRect();
  if (ev.clientY < (top + bottom) / 2) {
    this.classList.add('over-before');
    this.classList.remove('over-after');
  } else {
    this.classList.add('over-after');
    this.classList.remove('over-before');
  }
  return false;
}

function dropHandler(ev) {
  if (ev.stopPropagation) {
    ev.stopPropagation();
  }

  if (curObj.curr !== this) {
    this.parentNode.removeChild(curObj.curr);
    if (this.classList.contains('over-before')) {
      this.insertAdjacentHTML('beforebegin', ev.dataTransfer.getData('text/html'));
      addHandlers(this.previousElementSibling);
    } else if (this.classList.contains('over-after')) {
      this.insertAdjacentHTML('afterend', ev.dataTransfer.getData('text/html'));
      addHandlers(this.nextElementSibling);
    }
    UpdateListIndex();
  }
  this.classList.remove('over-before');
  this.classList.remove('over-after');

  return false;
}
function handleDragLeave() {
  this.classList.remove('over-before');
  this.classList.remove('over-after');
}
function handleDragEnd() {
  this.classList.remove('over-before');
  this.classList.remove('over-after');
}

function addHandlers(elem) {
  elem.addEventListener('dragstart', handelDragStart, false);
  elem.addEventListener('dragover', dragHandeler, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', dropHandler, false);
  elem.addEventListener('dragend', handleDragEnd, false);
  elem.addEventListener('click', activeList, false);
  if (elem.querySelector('.spanSvg') !== null)
  elem.querySelector('.spanSvg').addEventListener('click', removeItem, false);
  if (elem.querySelector('.checkbox') !== null) {
    elem.querySelector('.checkbox').addEventListener('click', checkComplete, false);
  }
  if (elem.querySelector('.thickSyb') !== null) {
    elem.querySelector('.thickSyb').addEventListener('click', unCheckComplete, false);
  }
}

function UpdateListIndex() {
  const listObj = new ToDoList();
  let completed = false;
  const newObj = [];
  listObj.getListItmes();
  document.querySelectorAll('.listItemDrag').forEach((item, indexPos) => {
    if (item.querySelector('.checkbox') === null) {
      completed = true;
    } else if (item.querySelector('.checkbox').checked === true) {
      completed = true;
    } else {
      completed = false;
    }

    newObj.push({ decription: item.textContent.replace('✔ ', ''), completed, index: indexPos + 1 });
    const objIndex = listObj.listItems.findIndex(((obj) => obj.index === parseInt(item.id, 10)));
    listObj.listItems[objIndex].index = indexPos + 1;
    item.id = indexPos + 1;
    item.querySelector('.icon').id = `icon-${indexPos}`;
  });
  listObj.setListItems(newObj);
}

export {
  handelDragStart, dragHandeler, dropHandler, addHandlers,
};