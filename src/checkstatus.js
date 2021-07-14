function checkComplete(ev){
console.log(this.parentNode)
this.border=0
this.parentNode.classList.add('completed')
// this.parentNode.removeChild(this)
this.parentNode.replaceChild(document.createElement("span"), this);
}

function addCheckboxhandler(elem){
    elem.addEventListener('click', checkComplete, false);
}

export {checkComplete, addCheckboxhandler}

