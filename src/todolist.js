export default class ToDoList{
    constructor(){
        this.listItems=[{decription:"reading", completed:false, index:1 }]
    }

 displayItems=()=>{
    const listMain= document.createElement('ul')
 this.listItems.forEach((item, index)=>{
     
     const listItem= document.createElement('li')
     listItem.id=item.index
     listItem.className="listItem"
     listItem.textContent=item.decription

     listMain.appendChild(listItem)
 })
 document.getElementById('list-container').appendChild(listMain)
}
}