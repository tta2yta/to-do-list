
const allowDrop=(ev)=>{
    ev.preventDefault();
}

const drag_handeler=(ev)=>{
    ev.preventDefault();
    ev.dataTransfer.dropEffect="move"
}