/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addremove.js":
/*!**************************!*\
  !*** ./src/addremove.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addItem": () => (/* binding */ addItem),
/* harmony export */   "removeItem": () => (/* binding */ removeItem),
/* harmony export */   "updateItem": () => (/* binding */ updateItem),
/* harmony export */   "clearComplted": () => (/* binding */ clearComplted)
/* harmony export */ });
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todolist */ "./src/todolist.js");


function addItem(ev) {
  if (ev.keyCode === 13) {
    const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_0__.default();
    listObj.getListItmes();
    const addObj = { decription: document.getElementById('listInput').value, completed: false, index: listObj.listItems.length + 1 };
    listObj.listItems = [...listObj.listItems, addObj];
    listObj.setListItems(listObj.listItems);
    window.location.reload();
    return false;
  }
  return false;
}

function removeItem() {
  if (this.querySelector('.fa-trash') !== null) {
    
    filteredList.forEach((element, index) => {
      element.index = index + 1;
    });
    listObj.setListItems(filteredList);
    window.location.reload();
    return false;
  }
  return false;
}

function updateItem(ev) {
  if (ev.keyCode === 13) {
    const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_0__.default();
    const decription = this.value;
    const index = this.parentNode.id;
    listObj.getListItmes();
    const objIndex = listObj.listItems.findIndex(((obj) => obj.index === parseInt(index, 10)));
    listObj.listItems[objIndex].decription = decription;
    listObj.setListItems(listObj.listItems);
    window.location.reload();
    return false;
  }
  return false;
}

function clearComplted(){
    const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_0__.default();
    listObj.getListItmes();
    const filteredList = listObj.listItems.filter((item) => item.completed !== true);
    listObj.setListItems(filteredList);
    window.location.reload();
    return false;

}

/***/ }),

/***/ "./src/checkstatus.js":
/*!****************************!*\
  !*** ./src/checkstatus.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkComplete": () => (/* binding */ checkComplete),
/* harmony export */   "unCheckComplete": () => (/* binding */ unCheckComplete),
/* harmony export */   "addCheckboxhandler": () => (/* binding */ addCheckboxhandler)
/* harmony export */ });
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todolist */ "./src/todolist.js");


function checkComplete() {
  const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_0__.default();
  if (document.getElementById(this.id).checked) {
    this.parentNode.querySelector('.textDesc').classList.add('completed');
    this.parentNode.querySelector('.listInputDsec').classList.add('hide');
    this.parentNode.querySelector('.textDesc').classList.remove('hide');
    const thickSyb = document.createElement('span');
    thickSyb.className = 'thickSyb';
    thickSyb.addEventListener('click', unCheckComplete, false);
    const t = document.createTextNode('✔ ');
    thickSyb.appendChild(t);
    listObj.getListItmes();
    const objIndex = listObj.listItems.findIndex(((obj) => parseInt(obj.index, 10) === parseInt(this.parentNode.id, 10)));
    listObj.listItems[objIndex].completed = true;
    listObj.setListItems(listObj.listItems);
    this.parentNode.replaceChild(thickSyb, this);
  } else {
    listObj.getListItmes();
    const objIndex = listObj.listItems.findIndex(((obj) => parseInt(obj.index, 10) === parseInt(this.parentNode.id, 10)));
    listObj.listItems[objIndex].completed = false;
    listObj.setListItems(listObj.listItems);
  }
}

function unCheckComplete() {
  const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_0__.default();
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = `checkbox-${this.parentNode.id - 1}`;
  checkbox.value = 'value';
  checkbox.id = `checkbox-${this.parentNode.id - 1}`;
  checkbox.className = 'checkbox';
  this.parentNode.querySelector('.textDesc').classList.remove('completed');
  this.parentNode.querySelector('.listInputDsec').classList.add('hide');
  this.parentNode.querySelector('.textDesc').classList.remove('hide');
  this.parentNode.querySelector('.icon').id = `icon-${this.parentNode.id - 1}`;
  listObj.getListItmes();
  const objIndex = listObj.listItems.findIndex(((obj) => parseInt(obj.index, 10) === parseInt(this.parentNode.id, 10)));
  listObj.listItems[objIndex].completed = false;
  this.parentNode.replaceChild(checkbox, this);
  listObj.setListItems(listObj.listItems);
  checkbox.addEventListener('click', checkComplete, false);
}

function addCheckboxhandler(elem) {
  elem.addEventListener('click', checkComplete, false);
}




/***/ }),

/***/ "./src/todolist.js":
/*!*************************!*\
  !*** ./src/todolist.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList),
/* harmony export */   "activeList": () => (/* binding */ activeList)
/* harmony export */ });
/* harmony import */ var _checkstatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkstatus */ "./src/checkstatus.js");
/* harmony import */ var _addremove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addremove */ "./src/addremove.js");



class ToDoList {
  constructor() {
    this.listItems = [];
  }

  setListItems(obj = null) {
    localStorage.setItem('todolist', JSON.stringify(obj));
  }

  getListItmes=() => {
    const obj = JSON.parse(localStorage.getItem('todolist'));
    if (obj === null) {
      this.listItems = [
        { decription: 'Double-tap to edit', completed: false, index: 1 },
        { decription: "Drag 'n drop to reorder your list", completed: false, index: 2 },
        { decription: 'Manage all your lists in one place', completed: false, index: 3 },
        { decription: 'Resync to clear out the old', completed: false, index: 4 },
      ];
      this.setListItems(this.listItems);
    } else {
      const mappedDataArray = [];
      Object.keys(obj).map((key) => (mappedDataArray.push(obj[key])));

      this.listItems = mappedDataArray;
    }
  }

 displayItems=() => {
   const listMain = document.createElement('ul');
   const listItemTitle = document.createElement('li');
   const iconRefresh = document.createElement('i');
   const iconEnter = document.createElement('i');
   iconRefresh.className = 'fas fa-sync iconRefresh';
   iconEnter.className = 'fas fa-pen iconEnter';
   listItemTitle.appendChild(document.createTextNode('To Do List'));
   listItemTitle.appendChild(iconRefresh);
   const listItemInput = document.createElement('li');
   listItemInput.className = 'listItemInput';
   const listInput = document.createElement('input');
   listInput.type = 'text';
   listInput.className = 'listInput';
   listInput.id = 'listInput';
   listInput.addEventListener('keyup', _addremove__WEBPACK_IMPORTED_MODULE_1__.addItem, false);
   listInput.placeholder = 'Add to your list';
   listItemInput.appendChild(iconEnter);
   listItemTitle.className = 'listItem listItemTitle';
   listItemInput.appendChild(listInput);
   listMain.appendChild(listItemTitle);
   listMain.appendChild(listItemInput);
   this.listItems.forEach((item) => {
     const listItem = document.createElement('li');
     const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.name = `checkbox-${item.index - 1}`;
     checkbox.value = 'value';
     checkbox.id = `checkbox-${item.index - 1}`;
     checkbox.className = 'checkbox';
     if (item.completed === true) {
       const thickSyb = document.createElement('span');
       thickSyb.className = 'thickSyb';
       thickSyb.addEventListener('click', _checkstatus__WEBPACK_IMPORTED_MODULE_0__.unCheckComplete, false);
       const t = document.createTextNode('✔ ');
       thickSyb.appendChild(t);
       listItem.appendChild(thickSyb);
     } else {
       checkbox.checked = false;
       listItem.appendChild(checkbox);
     }
     listItem.id = item.index;
     listItem.draggable = true;
     listItem.className = 'listItem listItemDrag';
     listItem.addEventListener('click', activeList, false);

     const textDesc = document.createElement('span');
     textDesc.className = 'textDesc';
     const t = document.createTextNode(item.decription);
     textDesc.appendChild(t);
     listItem.appendChild(textDesc);

     const listInputDsec = document.createElement('input');
     listInputDsec.type = 'text';
     listInputDsec.className = 'listInputDsec hide';
     listInputDsec.addEventListener('keyup', _addremove__WEBPACK_IMPORTED_MODULE_1__.updateItem, false);
     listInputDsec.placeholder = 'Add to your list';

     listItem.appendChild(listInputDsec);

     const spanSvg = document.createElement('span');
     spanSvg.className = 'spanSvg';
     const icon = document.createElement('svg');
     icon.id = `icon-${item.index - 1}`;
     icon.className = 'fas fa-ellipsis-v icon';
     spanSvg.addEventListener('click', _addremove__WEBPACK_IMPORTED_MODULE_1__.removeItem, false);
     spanSvg.appendChild(icon);
     listItem.appendChild(spanSvg);
     listMain.appendChild(listItem);
   });
   if (this.listItems !== []) {
     const clearLink = document.createElement('li');
     clearLink.className = 'listItem clearLink';
     clearLink.appendChild(document.createTextNode('Clear all completed'));
     clearLink.addEventListener('click', _addremove__WEBPACK_IMPORTED_MODULE_1__.clearComplted, false);
     listMain.appendChild(clearLink);
   }
   return listMain;
 }
}
function activeList(e) {
  if(e.target.className==='listItem clearLink')
  return false
  if (e.target !== e.currentTarget && e.target.className !== 'textDesc') return false;
  document.querySelectorAll('.listItem').forEach((item) => {
    item.style.backgroundColor = 'white';
  });
  document.querySelectorAll('.icon').forEach((item) => {
    item.setAttribute('class', 'fas fa-ellipsis-v icon');
  });
  document.getElementById(this.id).style.backgroundColor = '#fcf9f9';
  document.getElementById(`icon-${this.id - 1}`).setAttribute('class', 'fas fa-trash icon');
  this.parentNode.querySelectorAll('.listInputDsec').forEach((item) => {
    if (item.parentNode !== this) {
      item.classList.add('hide');
      item.parentNode.querySelector('.textDesc').classList.remove('hide');
    }
    if (item.parentNode === this) item.classList.remove('hide');
    item.value = this.querySelector('.textDesc').innerHTML;
    this.querySelector('.textDesc').classList.add('hide');
  });

  if (this !== null) {
    const listInput = document.createElement('input');
    listInput.type = 'text';
    listInput.className = 'listInput';
    listInput.id = 'listInput';
    listInput.addEventListener('keyup', _addremove__WEBPACK_IMPORTED_MODULE_1__.addItem, false);
    listInput.placeholder = 'Add to your list';
  }
  return false;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/sortingitems.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handelDragStart": () => (/* binding */ handelDragStart),
/* harmony export */   "dragHandeler": () => (/* binding */ dragHandeler),
/* harmony export */   "dropHandler": () => (/* binding */ dropHandler),
/* harmony export */   "addHandlers": () => (/* binding */ addHandlers)
/* harmony export */ });
/* harmony import */ var _checkstatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkstatus */ "./src/checkstatus.js");
/* harmony import */ var _todolist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todolist */ "./src/todolist.js");
/* harmony import */ var _addremove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addremove */ "./src/addremove.js");




const curObj = { curr: null };

function handelDragStart(ev) {
  curObj.curr = this;
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/HTML', this.outerHTML);
  this.classList.add('dragElem');
}

function dragHandeler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  const { top } = this.getBoundingClientRect();
  const { bottom } = this.getBoundingClientRect();
  if (ev.clientY < (top + bottom) / 2) {
    this.classList.add('over-before');
    this.classList.remove('over-after');
  } else {
    this.classList.add('over-after');
    this.classList.remove('over-before');
  }
  return false;
}

function dropHandler(ev) {
  if (ev.stopPropagation) {
    ev.stopPropagation();
  }

  if (curObj.curr !== this) {
    this.parentNode.removeChild(curObj.curr);
    if (this.classList.contains('over-before')) {
      this.insertAdjacentHTML('beforebegin', ev.dataTransfer.getData('text/html'));
      addHandlers(this.previousElementSibling);
    } else if (this.classList.contains('over-after')) {
      this.insertAdjacentHTML('afterend', ev.dataTransfer.getData('text/html'));
      addHandlers(this.nextElementSibling);
    }
    UpdateListIndex();
  }
  this.classList.remove('over-before');
  this.classList.remove('over-after');

  return false;
}
function handleDragLeave() {
  this.classList.remove('over-before');
  this.classList.remove('over-after');
}
function handleDragEnd() {
  this.classList.remove('over-before');
  this.classList.remove('over-after');
}

function addHandlers(elem) {
  elem.addEventListener('dragstart', handelDragStart, false);
  elem.addEventListener('dragover', dragHandeler, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', dropHandler, false);
  elem.addEventListener('dragend', handleDragEnd, false);
  elem.addEventListener('click', _todolist__WEBPACK_IMPORTED_MODULE_1__.activeList, false);
  if (elem.querySelector('.spanSvg') !== null) elem.querySelector('.spanSvg').addEventListener('click', _addremove__WEBPACK_IMPORTED_MODULE_2__.removeItem, false);
  if (elem.querySelector('.checkbox') !== null) {
    elem.querySelector('.checkbox').addEventListener('click', _checkstatus__WEBPACK_IMPORTED_MODULE_0__.checkComplete, false);
  }
  if (elem.querySelector('.thickSyb') !== null) {
    elem.querySelector('.thickSyb').addEventListener('click', _checkstatus__WEBPACK_IMPORTED_MODULE_0__.unCheckComplete, false);
  }
  if (elem.querySelector('.listInputDsec') !== null) {
    elem.querySelector('.listInputDsec').addEventListener('keyup', _addremove__WEBPACK_IMPORTED_MODULE_2__.updateItem, false);
  }
}

function UpdateListIndex() {
  const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_1__.default();
  let completed = false;
  const newObj = [];
  listObj.getListItmes();
  document.querySelectorAll('.listItemDrag').forEach((item, indexPos) => {
    if (item.querySelector('.checkbox') === null) {
      completed = true;
    } else if (item.querySelector('.checkbox').checked === true) {
      completed = true;
    } else {
      completed = false;
    }

    newObj.push({ decription: item.textContent.replace('✔ ', ''), completed, index: indexPos + 1 });
    const objIndex = listObj.listItems.findIndex(((obj) => obj.index === parseInt(item.id, 10)));
    listObj.listItems[objIndex].index = indexPos + 1;
    item.id = indexPos + 1;
    item.querySelector('.icon').id = `icon-${indexPos}`;
  });
  listObj.setListItems(newObj);
}


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc29ydGluZ2l0ZW1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFM0I7QUFDUDtBQUNBLHdCQUF3Qiw4Q0FBUTtBQUNoQztBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx3QkFBd0IsOENBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLHdCQUF3Qiw4Q0FBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRrQzs7QUFFbEM7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNB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QWU7QUFDN0U7QUFDQTtBQUNBLG1FQUFtRSxrREFBVTtBQUM3RTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDhDQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlCQUFpQixpRkFBaUY7QUFDbEc7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQsR0FBRztBQUNIO0FBQ0EiLCJmaWxlIjoic29ydGluZ2l0ZW1zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb0RvTGlzdCBmcm9tICcuL3RvZG9saXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0oZXYpIHtcbiAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3QgYWRkT2JqID0geyBkZWNyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdElucHV0JykudmFsdWUsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiBsaXN0T2JqLmxpc3RJdGVtcy5sZW5ndGggKyAxIH07XG4gICAgbGlzdE9iai5saXN0SXRlbXMgPSBbLi4ubGlzdE9iai5saXN0SXRlbXMsIGFkZE9ial07XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcignLmZhLXRyYXNoJykgIT09IG51bGwpIHtcbiAgICBcbiAgICBmaWx0ZXJlZExpc3QuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5kZXggPSBpbmRleCArIDE7XG4gICAgfSk7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMoZmlsdGVyZWRMaXN0KTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUl0ZW0oZXYpIHtcbiAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGNvbnN0IGRlY3JpcHRpb24gPSB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJlbnROb2RlLmlkO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IG9iai5pbmRleCA9PT0gcGFyc2VJbnQoaW5kZXgsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5kZWNyaXB0aW9uID0gZGVjcmlwdGlvbjtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbXBsdGVkKCl7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gbGlzdE9iai5saXN0SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXBsZXRlZCAhPT0gdHJ1ZSk7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMoZmlsdGVyZWRMaXN0KTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59IiwiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnO1xuXG5mdW5jdGlvbiBjaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5jaGVja2VkKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0aGlja1N5YiwgdGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bkNoZWNrQ29tcGxldGUoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLmlkID0gYGljb24tJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNoZWNrYm94LCB0aGlzKTtcbiAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2hlY2tib3hoYW5kbGVyKGVsZW0pIHtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbn1cblxuZXhwb3J0IHsgY2hlY2tDb21wbGV0ZSwgdW5DaGVja0NvbXBsZXRlLCBhZGRDaGVja2JveGhhbmRsZXIgfTtcbiIsImltcG9ydCB7IHVuQ2hlY2tDb21wbGV0ZSB9IGZyb20gJy4vY2hlY2tzdGF0dXMnO1xuaW1wb3J0IHsgYWRkSXRlbSwgcmVtb3ZlSXRlbSwgdXBkYXRlSXRlbSwgY2xlYXJDb21wbHRlZCB9IGZyb20gJy4vYWRkcmVtb3ZlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RJdGVtcyA9IFtdO1xuICB9XG5cbiAgc2V0TGlzdEl0ZW1zKG9iaiA9IG51bGwpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3QnLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfVxuXG4gIGdldExpc3RJdG1lcz0oKSA9PiB7XG4gICAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3QnKSk7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5saXN0SXRlbXMgPSBbXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ0RvdWJsZS10YXAgdG8gZWRpdCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAxIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogXCJEcmFnICduIGRyb3AgdG8gcmVvcmRlciB5b3VyIGxpc3RcIiwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDIgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnTWFuYWdlIGFsbCB5b3VyIGxpc3RzIGluIG9uZSBwbGFjZScsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAzIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ1Jlc3luYyB0byBjbGVhciBvdXQgdGhlIG9sZCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiA0IH0sXG4gICAgICBdO1xuICAgICAgdGhpcy5zZXRMaXN0SXRlbXModGhpcy5saXN0SXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXBwZWREYXRhQXJyYXkgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IChtYXBwZWREYXRhQXJyYXkucHVzaChvYmpba2V5XSkpKTtcblxuICAgICAgdGhpcy5saXN0SXRlbXMgPSBtYXBwZWREYXRhQXJyYXk7XG4gICAgfVxuICB9XG5cbiBkaXNwbGF5SXRlbXM9KCkgPT4ge1xuICAgY29uc3QgbGlzdE1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgY29uc3QgbGlzdEl0ZW1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBjb25zdCBpY29uUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGNvbnN0IGljb25FbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGljb25SZWZyZXNoLmNsYXNzTmFtZSA9ICdmYXMgZmEtc3luYyBpY29uUmVmcmVzaCc7XG4gICBpY29uRW50ZXIuY2xhc3NOYW1lID0gJ2ZhcyBmYS1wZW4gaWNvbkVudGVyJztcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RvIERvIExpc3QnKSk7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGljb25SZWZyZXNoKTtcbiAgIGNvbnN0IGxpc3RJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgbGlzdEl0ZW1JbnB1dC5jbGFzc05hbWUgPSAnbGlzdEl0ZW1JbnB1dCc7XG4gICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQuaWQgPSAnbGlzdElucHV0JztcbiAgIGxpc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkZEl0ZW0sIGZhbHNlKTtcbiAgIGxpc3RJbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQoaWNvbkVudGVyKTtcbiAgIGxpc3RJdGVtVGl0bGUuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGxpc3RJdGVtVGl0bGUnO1xuICAgbGlzdEl0ZW1JbnB1dC5hcHBlbmRDaGlsZChsaXN0SW5wdXQpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1UaXRsZSk7XG4gICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbUlucHV0KTtcbiAgIHRoaXMubGlzdEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICBjaGVja2JveC5uYW1lID0gYGNoZWNrYm94LSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICAgICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gICAgIGlmIChpdGVtLmNvbXBsZXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0aGlja1N5Yik7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgfVxuICAgICBsaXN0SXRlbS5pZCA9IGl0ZW0uaW5kZXg7XG4gICAgIGxpc3RJdGVtLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgIGxpc3RJdGVtLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbURyYWcnO1xuICAgICBsaXN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjdGl2ZUxpc3QsIGZhbHNlKTtcblxuICAgICBjb25zdCB0ZXh0RGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgdGV4dERlc2MuY2xhc3NOYW1lID0gJ3RleHREZXNjJztcbiAgICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0uZGVjcmlwdGlvbik7XG4gICAgIHRleHREZXNjLmFwcGVuZENoaWxkKHQpO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0ZXh0RGVzYyk7XG5cbiAgICAgY29uc3QgbGlzdElucHV0RHNlYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgIGxpc3RJbnB1dERzZWMudHlwZSA9ICd0ZXh0JztcbiAgICAgbGlzdElucHV0RHNlYy5jbGFzc05hbWUgPSAnbGlzdElucHV0RHNlYyBoaWRlJztcbiAgICAgbGlzdElucHV0RHNlYy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUl0ZW0sIGZhbHNlKTtcbiAgICAgbGlzdElucHV0RHNlYy5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcblxuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChsaXN0SW5wdXREc2VjKTtcblxuICAgICBjb25zdCBzcGFuU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICBzcGFuU3ZnLmNsYXNzTmFtZSA9ICdzcGFuU3ZnJztcbiAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgICBpY29uLmlkID0gYGljb24tJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBpY29uLmNsYXNzTmFtZSA9ICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJztcbiAgICAgc3BhblN2Zy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUl0ZW0sIGZhbHNlKTtcbiAgICAgc3BhblN2Zy5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoc3BhblN2Zyk7XG4gICAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgIH0pO1xuICAgaWYgKHRoaXMubGlzdEl0ZW1zICE9PSBbXSkge1xuICAgICBjb25zdCBjbGVhckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjbGVhckxpbmsuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGNsZWFyTGluayc7XG4gICAgIGNsZWFyTGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQ2xlYXIgYWxsIGNvbXBsZXRlZCcpKTtcbiAgICAgY2xlYXJMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJDb21wbHRlZCwgZmFsc2UpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChjbGVhckxpbmspO1xuICAgfVxuICAgcmV0dXJuIGxpc3RNYWluO1xuIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmVMaXN0KGUpIHtcbiAgaWYoZS50YXJnZXQuY2xhc3NOYW1lPT09J2xpc3RJdGVtIGNsZWFyTGluaycpXG4gIHJldHVybiBmYWxzZVxuICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCAmJiBlLnRhcmdldC5jbGFzc05hbWUgIT09ICd0ZXh0RGVzYycpIHJldHVybiBmYWxzZTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJdGVtJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJyk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZjZjlmOSc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpY29uLSR7dGhpcy5pZCAtIDF9YCkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtdHJhc2ggaWNvbicpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJbnB1dERzZWMnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0ucGFyZW50Tm9kZSAhPT0gdGhpcykge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlID09PSB0aGlzKSBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBpdGVtLnZhbHVlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5pbm5lckhUTUw7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIH0pO1xuXG4gIGlmICh0aGlzICE9PSBudWxsKSB7XG4gICAgY29uc3QgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICAgbGlzdElucHV0LmlkID0gJ2xpc3RJbnB1dCc7XG4gICAgbGlzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRkSXRlbSwgZmFsc2UpO1xuICAgIGxpc3RJbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjaGVja0NvbXBsZXRlLCB1bkNoZWNrQ29tcGxldGUgfSBmcm9tICcuL2NoZWNrc3RhdHVzJztcbmltcG9ydCBUb0RvTGlzdCwgeyBhY3RpdmVMaXN0IH0gZnJvbSAnLi90b2RvbGlzdCc7XG5pbXBvcnQgeyByZW1vdmVJdGVtLCB1cGRhdGVJdGVtIH0gZnJvbSAnLi9hZGRyZW1vdmUnO1xuXG5jb25zdCBjdXJPYmogPSB7IGN1cnI6IG51bGwgfTtcblxuZnVuY3Rpb24gaGFuZGVsRHJhZ1N0YXJ0KGV2KSB7XG4gIGN1ck9iai5jdXJyID0gdGhpcztcbiAgZXYuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L0hUTUwnLCB0aGlzLm91dGVySFRNTCk7XG4gIHRoaXMuY2xhc3NMaXN0LmFkZCgnZHJhZ0VsZW0nKTtcbn1cblxuZnVuY3Rpb24gZHJhZ0hhbmRlbGVyKGV2KSB7XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICBjb25zdCB7IHRvcCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgeyBib3R0b20gfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGlmIChldi5jbGllbnRZIDwgKHRvcCArIGJvdHRvbSkgLyAyKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdvdmVyLWJlZm9yZScpO1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1hZnRlcicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnb3Zlci1hZnRlcicpO1xuICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1iZWZvcmUnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRyb3BIYW5kbGVyKGV2KSB7XG4gIGlmIChldi5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGlmIChjdXJPYmouY3VyciAhPT0gdGhpcykge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjdXJPYmouY3Vycik7XG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyLWJlZm9yZScpKSB7XG4gICAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9odG1sJykpO1xuICAgICAgYWRkSGFuZGxlcnModGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyLWFmdGVyJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L2h0bWwnKSk7XG4gICAgICBhZGRIYW5kbGVycyh0aGlzLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgfVxuICAgIFVwZGF0ZUxpc3RJbmRleCgpO1xuICB9XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1iZWZvcmUnKTtcbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWFmdGVyJyk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKCkge1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYmVmb3JlJyk7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1hZnRlcicpO1xufVxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VuZCgpIHtcbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWJlZm9yZScpO1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYWZ0ZXInKTtcbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcnMoZWxlbSkge1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGhhbmRlbERyYWdTdGFydCwgZmFsc2UpO1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ0hhbmRlbGVyLCBmYWxzZSk7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgaGFuZGxlRHJhZ0xlYXZlLCBmYWxzZSk7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3BIYW5kbGVyLCBmYWxzZSk7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGhhbmRsZURyYWdFbmQsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjdGl2ZUxpc3QsIGZhbHNlKTtcbiAgaWYgKGVsZW0ucXVlcnlTZWxlY3RvcignLnNwYW5TdmcnKSAhPT0gbnVsbCkgZWxlbS5xdWVyeVNlbGVjdG9yKCcuc3BhblN2ZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlSXRlbSwgZmFsc2UpO1xuICBpZiAoZWxlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKSAhPT0gbnVsbCkge1xuICAgIGVsZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW0ucXVlcnlTZWxlY3RvcignLnRoaWNrU3liJykgIT09IG51bGwpIHtcbiAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy50aGlja1N5YicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW0ucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKSAhPT0gbnVsbCkge1xuICAgIGVsZW0ucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUl0ZW0sIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBVcGRhdGVMaXN0SW5kZXgoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgbGV0IGNvbXBsZXRlZCA9IGZhbHNlO1xuICBjb25zdCBuZXdPYmogPSBbXTtcbiAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJdGVtRHJhZycpLmZvckVhY2goKGl0ZW0sIGluZGV4UG9zKSA9PiB7XG4gICAgaWYgKGl0ZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94JykgPT09IG51bGwpIHtcbiAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5ld09iai5wdXNoKHsgZGVjcmlwdGlvbjogaXRlbS50ZXh0Q29udGVudC5yZXBsYWNlKCfinJQgJywgJycpLCBjb21wbGV0ZWQsIGluZGV4OiBpbmRleFBvcyArIDEgfSk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IG9iai5pbmRleCA9PT0gcGFyc2VJbnQoaXRlbS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmluZGV4ID0gaW5kZXhQb3MgKyAxO1xuICAgIGl0ZW0uaWQgPSBpbmRleFBvcyArIDE7XG4gICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLmlkID0gYGljb24tJHtpbmRleFBvc31gO1xuICB9KTtcbiAgbGlzdE9iai5zZXRMaXN0SXRlbXMobmV3T2JqKTtcbn1cblxuZXhwb3J0IHtcbiAgaGFuZGVsRHJhZ1N0YXJ0LCBkcmFnSGFuZGVsZXIsIGRyb3BIYW5kbGVyLCBhZGRIYW5kbGVycyxcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==