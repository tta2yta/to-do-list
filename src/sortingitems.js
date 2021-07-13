import { drop } from "lodash";

function handelDragStart(ev){
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData('text/HTML', this.outerHTML)

}

 function drag_handeler(ev){
    ev.preventDefault();
    ev.dataTransfer.dropEffect="move"
    return false;
}

 function drop_handler(ev){
    const data=ev.dataTransfer.getData("text/plain");
    console.log(data)
    // ev.target.appendChild(document.getElementById(data));
}

export{handelDragStart, drag_handeler, drop_handler} 