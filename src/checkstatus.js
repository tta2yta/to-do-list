import ToDoList from './todolist';

const listObj = new ToDoList();

function checkComplete() {
    const listObj = new ToDoList();
  if (document.getElementById(this.id).checked) {
    // this.parentNode.querySelector(`.textDesc-${this.parentNode.id - 1}`).classList.add('completed');
   this.parentNode.querySelector('.textDesc').classList.add('completed');
    const thickSyb = document.createElement('span');
    thickSyb.className = 'thickSyb';
    thickSyb.addEventListener('click', unCheckComplete, false);
    const t = document.createTextNode('✔ ');
    thickSyb.appendChild(t);
    listObj.getListItmes();
    const objIndex = listObj.listItems.findIndex((obj => obj.index == this.parentNode.id));
    listObj.listItems[objIndex].completed=true
    listObj.setListItems(listObj.listItems)
    this.parentNode.replaceChild(thickSyb, this);
    
  }
  else{
    listObj.getListItmes();
    const objIndex = listObj.listItems.findIndex((obj => obj.index == this.parentNode.id));
    listObj.listItems[objIndex].completed=false
    listObj.setListItems(listObj.listItems)
  }
}

function unCheckComplete() {
    const listObj = new ToDoList();
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = `checkbox-${this.parentNode.id - 1}`;
  checkbox.value = 'value';
  checkbox.id = `checkbox-${this.parentNode.id - 1}`;
  checkbox.className = 'checkbox';
  // document.querySelector(`.textDesc-${this.parentNode.id - 1}`).classList.remove('completed');
  this.parentNode.querySelector('.textDesc').classList.remove('completed');
  this.parentNode.querySelector('.icon').id=`icon-${this.parentNode.id - 1}`
  listObj.getListItmes();
  const objIndex = listObj.listItems.findIndex((obj => obj.index == this.parentNode.id));
  listObj.listItems[objIndex].completed=false
  this.parentNode.replaceChild(checkbox, this);
  listObj.setListItems(listObj.listItems)
  checkbox.addEventListener('click', checkComplete, false);
}

function addCheckboxhandler(elem) {
  elem.addEventListener('click', checkComplete, false);
}

export { checkComplete, unCheckComplete, addCheckboxhandler };
