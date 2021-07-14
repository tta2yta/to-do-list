function checkComplete(ev){
console.log("jjj")

this.border=0
this.parentNode.querySelector('.textDesc').classList.add('completed')
const thickSyb=document.createElement('span');
thickSyb.className='thickSyb'
thickSyb.addEventListener('click', unCheckComplete, false);
const t = document.createTextNode("✔ "); 
thickSyb.appendChild(t)
this.parentNode.replaceChild(thickSyb, this);


}

function unCheckComplete(e){
    const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.name = `checkbox-${this.parentNode.id - 1}`;
     checkbox.value = 'value';
     checkbox.id = `checkbox-${this.parentNode.id - 1}`;
     checkbox.className="checkbox"
     this.parentNode.replaceChild(checkbox, this);
     checkbox.addEventListener('click', checkComplete, false);

}

function addCheckboxhandler(elem){
    elem.addEventListener('click', checkComplete, false);
}

export {checkComplete, addCheckboxhandler}

