import ToDoList from './todolist';

export function addItem(ev) {
  if (ev.keyCode === 13) {
    const listObj = new ToDoList();
    listObj.getListItmes();
    const addObj = { decription: document.getElementById('listInput').value, completed: false, index: listObj.listItems.length + 1 };
    listObj.listItems = [...listObj.listItems, addObj];
    listObj.setListItems(listObj.listItems);
    window.location.reload();
    return false;
  }
  return false;
}

export function removeItem() {
  if (this.querySelector('.fa-trash') !== null) {
    
    filteredList.forEach((element, index) => {
      element.index = index + 1;
    });
    listObj.setListItems(filteredList);
    window.location.reload();
    return false;
  }
  return false;
}

export function updateItem(ev) {
  if (ev.keyCode === 13) {
    const listObj = new ToDoList();
    const decription = this.value;
    const index = this.parentNode.id;
    listObj.getListItmes();
    const objIndex = listObj.listItems.findIndex(((obj) => obj.index === parseInt(index, 10)));
    listObj.listItems[objIndex].decription = decription;
    listObj.setListItems(listObj.listItems);
    window.location.reload();
    return false;
  }
  return false;
}

export function clearComplted(){
    const listObj = new ToDoList();
    listObj.getListItmes();
    const filteredList = listObj.listItems.filter((item) => item.completed !== true);
    listObj.setListItems(filteredList);
    window.location.reload();
    return false;

}