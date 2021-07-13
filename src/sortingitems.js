import { drop } from "lodash";


const curObj={curr:null}
function handelDragStart(ev){
    curObj.curr=this
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData('text/HTML', this.outerHTML)
    this.classList.add('dragElem');

}

 function drag_handeler(ev){
    ev.preventDefault();
    ev.dataTransfer.dropEffect="move"
    this.classList.add('over');
    return false;
}

 function drop_handler(ev){
    if (ev.stopPropagation) {
        ev.stopPropagation(); 
      }

      if (curObj.curr != this) {
        this.parentNode.removeChild(curObj.curr);
        var dropHTML = ev.dataTransfer.getData('text/html');
        console.log(dropHTML)
        this.insertAdjacentHTML('beforebegin',dropHTML);
        var dropElem = this.previousSibling;
        console.log(this)
        console.log(dropElem)
        
      }
      this.classList.remove('over');
  return false;
}

  function addHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('drop', handleDrop, false);
  
  }

export{handelDragStart, drag_handeler, drop_handler} 