import { drop } from "lodash";

const allowDrop=(ev)=>{
    ev.preventDefault();
}

 const drag_handeler=(ev)=>{
    ev.preventDefault();
    ev.dataTransfer.dropEffect="move"
}

 const drop_handler=(ev)=>{
    const data=ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
}

export{ allowDrop, drag_handeler, drop_handler} 