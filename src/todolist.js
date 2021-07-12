export default class ToDoList{
    constructor(){
        this.listItems=[
            {decription:"Double-tap to edit", completed:false, index:1 },
            {decription:"Drag 'n drop to reorder your list", completed:false, index:2 },
            {decription:"Manage all your lists in one place", completed:false, index:3 },
            {decription:"Resync to clear out the old", completed:false, index:4 }
        ]
    }

 displayItems=()=>{
    const listMain= document.createElement('ul')
    this.listItems.forEach((item, index)=>{
     
     const listItem= document.createElement('li')
     const checkbox = document.createElement('input');
     checkbox.type = "checkbox";
     checkbox.name = `checkbox-${index}`;
     checkbox.value = "value";
     checkbox.id = `checkbox-${index}`;
     listItem.id=item.index
     listItem.className="listItem"
     listItem.appendChild(checkbox);
     listItem.appendChild(document.createTextNode(item.decription))
     listMain.appendChild(listItem)
 })
 document.getElementById('list-container').appendChild(listMain)
}
}