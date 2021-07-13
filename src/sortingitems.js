
export default allowDrop=(ev)=>{
    ev.preventDefault();
}

export default  drag_handeler=(ev)=>{
    ev.preventDefault();
    ev.dataTransfer.dropEffect="move"
}

export default drop_handler=(ev)=>{
    const data=ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
}