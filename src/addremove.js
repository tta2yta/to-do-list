import ToDoList from "./toDoList";

export function addItem(ev){
    if(ev.keyCode == 13){
        const listObj= new ToDoList();
        listObj.getListItmes();
        const addObj={decription:document.getElementById('listInput').value,completed:false,index:listObj.listItems.length + 1}
        listObj.listItems=[...listObj.listItems, addObj]
        listObj.setListItems(listObj.listItems)
        location.reload();
        return false;

      }

}

export function removeItem(){
    if(this.querySelector('.fa-trash') !== null){
        const listObj= new ToDoList();
        listObj.getListItmes();
        const filteredList= listObj.listItems.filter(item=>parseInt(item.index, 10) !==parseInt(this.parentNode.id, 10))
        
        filteredList.forEach((element, index) => {
            element.index=index + 1;   
        });
        listObj.setListItems(filteredList)
        location.reload();
        return false;
    }
}

export function updateItem(ev){
    if(ev.keyCode == 13){
        const listObj=new ToDoList();
        const decription=this.value;
        const index= this.parentNode.id;
        listObj.getListItmes();
        const objIndex = listObj.listItems.findIndex(((obj) => obj.index === parseInt(index, 10)));
        listObj.listItems[objIndex].decription = decription;
        listObj.setListItems(listObj.listItems)
        location.reload();
        return false;

    }
}