import { drop } from "lodash";


const curObj={curr:null}
function handelDragStart(ev){
    curObj.curr=this
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData('text/HTML', this.outerHTML)

}

 function drag_handeler(ev){
    ev.preventDefault();
    ev.dataTransfer.dropEffect="move"
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
}

export{handelDragStart, drag_handeler, drop_handler} 