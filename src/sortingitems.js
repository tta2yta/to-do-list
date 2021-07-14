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
    const top=this.getBoundingClientRect().top;
    const bottom=this.getBoundingClientRect().bottom;
    if(e.clientY<(top+bottom)/2) {
        this.classList.add('over-before');
        this.classList.remove('over-after');
    }
    else {
        this.classList.add('over-right');
        this.classList.remove('over-after');
    }
    return false;
}

 function drop_handler(ev){
    if (ev.stopPropagation) {
        ev.stopPropagation(); 
      }

      if (curObj.curr != this) {
        if(this.classList.contains('over-before')) {
            this.insertAdjacentHTML('beforebegin',e.dataTransfer.getData('text/html'));
            addHandlers(this.previousElementSibling);
        }
        else if(this.classList.contains('over-after')) {
            this.insertAdjacentHTML('afterend',e.dataTransfer.getData('text/html'));
            addHandlers(this.nextElementSibling);
        }
        
      }
      this.classList.remove('over-before');
      this.classList.remove('over-after');
  return false;
}
function handleDragLeave(e) {
    this.classList.remove('dragover-before');
    this.classList.remove('dragover-after');
}
function handleDragEnd(e) {
    this.classList.remove('over-before');
    this.classList.remove('over-after');
}
  function addHandlers(elem) {
    elem.addEventListener('dragstart', handelDragStart, false);
    elem.addEventListener('dragover', drag_handeler, false);
    elem.addEventListener('drop', drop_handler, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('dragend', handleDragEnd, false);
  
  }

export{handelDragStart, drag_handeler, drop_handler, addHandlers} 