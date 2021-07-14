import ToDoList from './todolist';
function checkComplete() {
  if (document.getElementById(this.id).checked) {
    this.parentNode.querySelector(`.textDesc-${this.parentNode.id - 1}`).classList.add('completed');
    const thickSyb = document.createElement('span');
    thickSyb.className = 'thickSyb';
    thickSyb.addEventListener('click', unCheckComplete, false);
    const t = document.createTextNode('✔ ');
    thickSyb.appendChild(t);
    const listObj = new ToDoList();
    const objIndex = listObj.listItems.find((obj => obj.index == this.parentNode.id));
    objIndex.completed=true;
    this.parentNode.replaceChild(thickSyb, this);
    
   
  }
}

function unCheckComplete() {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = `checkbox-${this.parentNode.id - 1}`;
  checkbox.value = 'value';
  checkbox.id = `checkbox-${this.parentNode.id - 1}`;
  checkbox.className = 'checkbox';
  document.querySelector(`.textDesc-${this.parentNode.id - 1}`).classList.remove('completed');
  const listObj = new ToDoList();
  const objIndex = listObj.listItems.find((obj => obj.index == this.parentNode.id));
  objIndex.completed=false;
  this.parentNode.replaceChild(checkbox, this);
  checkbox.addEventListener('click', checkComplete, false);
}

function addCheckboxhandler(elem) {
  elem.addEventListener('click', checkComplete, false);
}

export { checkComplete, addCheckboxhandler };
