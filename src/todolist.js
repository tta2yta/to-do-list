export default class ToDoList {
  constructor() {
    this.listItems = [
      { decription: 'Double-tap to edit', completed: false, index: 1 },
      { decription: "Drag 'n drop to reorder your list", completed: false, index: 2 },
      { decription: 'Manage all your lists in one place', completed: false, index: 3 },
      { decription: 'Resync to clear out the old', completed: false, index: 4 },
    ];
  }

  setListItems(obj=null){
    localStorage.setItem('todolist', JSON.stringify(obj));
  }

  getListItmes=()=>{
    this.listItems = JSON.parse(localStorage.getItem('todolist'));
    if (this.listItems === null) {
       this.listItems = [];
    }
  }

 displayItems=() => {
   const listMain = document.createElement('ul');
   const listItemTitle = document.createElement('li');
   const iconRefresh = document.createElement('i');
   const iconEnter = document.createElement('i');
   iconRefresh.className = 'fas fa-sync iconRefresh';
   iconEnter.className = 'fas fa-pen iconEnter';
   listItemTitle.appendChild(document.createTextNode('To Do List'));
   listItemTitle.appendChild(iconRefresh);
   const listItemInput = document.createElement('li');
   listItemInput.className = 'listItemInput';
   const listInput = document.createElement('input');
   listInput.type = 'text';
   listInput.className = 'listInput';
   listInput.placeholder = 'Add to your list';
   listItemInput.appendChild(iconEnter);
   listItemTitle.className = 'listItem listItemTitle';
   listItemInput.appendChild(listInput);
   listMain.appendChild(listItemTitle);
   listMain.appendChild(listItemInput);
   this.listItems.forEach((item, index) => {
     const listItem = document.createElement('li');
     const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.name = `checkbox-${index}`;
     checkbox.value = 'value';
     checkbox.id = `checkbox-${index}`;
     checkbox.className = 'checkbox';
     listItem.id = item.index;
     listItem.draggable = true;
     listItem.className = 'listItem listItemDrag';
     listItem.addEventListener('click', this.activeList, false);
     listItem.appendChild(checkbox);
     const textDesc = document.createElement('span');
     textDesc.className = `textDesc-${index}`;
     const t = document.createTextNode(item.decription);
     textDesc.appendChild(t);
     listItem.appendChild(textDesc);
     const icon = document.createElement('svg');
     icon.id = `icon-${index}`;
     icon.className = 'fas fa-ellipsis-v icon';
     listItem.appendChild(icon);
     listMain.appendChild(listItem);
   });
   if (this.listItems !== []) {
     const clearLink = document.createElement('li');
     clearLink.className = 'listItem clearLink';
     clearLink.appendChild(document.createTextNode('Clear all completed'));
     listMain.appendChild(clearLink);
   }
   return listMain;
 }

 activeList() {
   document.querySelectorAll('.listItem').forEach((item) => {
     item.style.backgroundColor = 'white';
   });
   document.querySelectorAll('.icon').forEach((item) => {
     item.setAttribute('class', 'fas fa-ellipsis-v icon');
   });
   document.getElementById(this.id).style.backgroundColor = '#fcf9f9';
   document.getElementById(`icon-${this.id - 1}`).setAttribute('class', 'fas fa-trash icon');
 }
}