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
    const listObj = new _todolist__WEBPACK_IMPORTED_MODULE_0__.default();
    listObj.getListItmes();
    const filteredList = listObj.listItems.filter((item) => parseInt(item.index, 10) !== parseInt(this.parentNode.id, 10));
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

function clearComplted() {
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
  if (e.target.className === 'listItem clearLink') return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc29ydGluZ2l0ZW1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFM0I7QUFDUDtBQUNBLHdCQUF3Qiw4Q0FBUTtBQUNoQztBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERrQzs7QUFFbEM7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQSw4REFBOEQseURBQWU7QUFDN0U7QUFDQTtBQUNBLG1FQUFtRSxrREFBVTtBQUM3RTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDhDQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlCQUFpQixpRkFBaUY7QUFDbEc7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQsR0FBRztBQUNIO0FBQ0EiLCJmaWxlIjoic29ydGluZ2l0ZW1zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb0RvTGlzdCBmcm9tICcuL3RvZG9saXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0oZXYpIHtcbiAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3QgYWRkT2JqID0geyBkZWNyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdElucHV0JykudmFsdWUsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiBsaXN0T2JqLmxpc3RJdGVtcy5sZW5ndGggKyAxIH07XG4gICAgbGlzdE9iai5saXN0SXRlbXMgPSBbLi4ubGlzdE9iai5saXN0SXRlbXMsIGFkZE9ial07XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcignLmZhLXRyYXNoJykgIT09IG51bGwpIHtcbiAgICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSBsaXN0T2JqLmxpc3RJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHBhcnNlSW50KGl0ZW0uaW5kZXgsIDEwKSAhPT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpO1xuICAgIGZpbHRlcmVkTGlzdC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgZWxlbWVudC5pbmRleCA9IGluZGV4ICsgMTtcbiAgICB9KTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhmaWx0ZXJlZExpc3QpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSXRlbShldikge1xuICBpZiAoZXYua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgY29uc3QgZGVjcmlwdGlvbiA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmVudE5vZGUuaWQ7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gb2JqLmluZGV4ID09PSBwYXJzZUludChpbmRleCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmRlY3JpcHRpb24gPSBkZWNyaXB0aW9uO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29tcGx0ZWQoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgY29uc3QgZmlsdGVyZWRMaXN0ID0gbGlzdE9iai5saXN0SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXBsZXRlZCAhPT0gdHJ1ZSk7XG4gIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGZpbHRlcmVkTGlzdCk7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCBUb0RvTGlzdCBmcm9tICcuL3RvZG9saXN0JztcblxuZnVuY3Rpb24gY2hlY2tDb21wbGV0ZSgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuY2hlY2tlZCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25zdCB0aGlja1N5YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlja1N5Yi5jbGFzc05hbWUgPSAndGhpY2tTeWInO1xuICAgIHRoaWNrU3liLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCfinJQgJyk7XG4gICAgdGhpY2tTeWIuYXBwZW5kQ2hpbGQodCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpY2tTeWIsIHRoaXMpO1xuICB9IGVsc2Uge1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5DaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGNoZWNrYm94Lm5hbWUgPSBgY2hlY2tib3gtJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0SW5wdXREc2VjJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmljb24nKS5pZCA9IGBpY29uLSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjaGVja2JveCwgdGhpcyk7XG4gIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGFkZENoZWNrYm94aGFuZGxlcihlbGVtKSB7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG59XG5cbmV4cG9ydCB7IGNoZWNrQ29tcGxldGUsIHVuQ2hlY2tDb21wbGV0ZSwgYWRkQ2hlY2tib3hoYW5kbGVyIH07XG4iLCJpbXBvcnQgeyB1bkNoZWNrQ29tcGxldGUgfSBmcm9tICcuL2NoZWNrc3RhdHVzJztcbmltcG9ydCB7XG4gIGFkZEl0ZW0sIHJlbW92ZUl0ZW0sIHVwZGF0ZUl0ZW0sIGNsZWFyQ29tcGx0ZWQsXG59IGZyb20gJy4vYWRkcmVtb3ZlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RJdGVtcyA9IFtdO1xuICB9XG5cbiAgc2V0TGlzdEl0ZW1zKG9iaiA9IG51bGwpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3QnLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfVxuXG4gIGdldExpc3RJdG1lcz0oKSA9PiB7XG4gICAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3QnKSk7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5saXN0SXRlbXMgPSBbXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ0RvdWJsZS10YXAgdG8gZWRpdCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAxIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogXCJEcmFnICduIGRyb3AgdG8gcmVvcmRlciB5b3VyIGxpc3RcIiwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDIgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnTWFuYWdlIGFsbCB5b3VyIGxpc3RzIGluIG9uZSBwbGFjZScsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAzIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ1Jlc3luYyB0byBjbGVhciBvdXQgdGhlIG9sZCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiA0IH0sXG4gICAgICBdO1xuICAgICAgdGhpcy5zZXRMaXN0SXRlbXModGhpcy5saXN0SXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXBwZWREYXRhQXJyYXkgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IChtYXBwZWREYXRhQXJyYXkucHVzaChvYmpba2V5XSkpKTtcblxuICAgICAgdGhpcy5saXN0SXRlbXMgPSBtYXBwZWREYXRhQXJyYXk7XG4gICAgfVxuICB9XG5cbiBkaXNwbGF5SXRlbXM9KCkgPT4ge1xuICAgY29uc3QgbGlzdE1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgY29uc3QgbGlzdEl0ZW1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBjb25zdCBpY29uUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGNvbnN0IGljb25FbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGljb25SZWZyZXNoLmNsYXNzTmFtZSA9ICdmYXMgZmEtc3luYyBpY29uUmVmcmVzaCc7XG4gICBpY29uRW50ZXIuY2xhc3NOYW1lID0gJ2ZhcyBmYS1wZW4gaWNvbkVudGVyJztcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RvIERvIExpc3QnKSk7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGljb25SZWZyZXNoKTtcbiAgIGNvbnN0IGxpc3RJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgbGlzdEl0ZW1JbnB1dC5jbGFzc05hbWUgPSAnbGlzdEl0ZW1JbnB1dCc7XG4gICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQuaWQgPSAnbGlzdElucHV0JztcbiAgIGxpc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkZEl0ZW0sIGZhbHNlKTtcbiAgIGxpc3RJbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQoaWNvbkVudGVyKTtcbiAgIGxpc3RJdGVtVGl0bGUuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGxpc3RJdGVtVGl0bGUnO1xuICAgbGlzdEl0ZW1JbnB1dC5hcHBlbmRDaGlsZChsaXN0SW5wdXQpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1UaXRsZSk7XG4gICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbUlucHV0KTtcbiAgIHRoaXMubGlzdEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICBjaGVja2JveC5uYW1lID0gYGNoZWNrYm94LSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICAgICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gICAgIGlmIChpdGVtLmNvbXBsZXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0aGlja1N5Yik7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgfVxuICAgICBsaXN0SXRlbS5pZCA9IGl0ZW0uaW5kZXg7XG4gICAgIGxpc3RJdGVtLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgIGxpc3RJdGVtLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbURyYWcnO1xuICAgICBsaXN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjdGl2ZUxpc3QsIGZhbHNlKTtcblxuICAgICBjb25zdCB0ZXh0RGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgdGV4dERlc2MuY2xhc3NOYW1lID0gJ3RleHREZXNjJztcbiAgICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0uZGVjcmlwdGlvbik7XG4gICAgIHRleHREZXNjLmFwcGVuZENoaWxkKHQpO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0ZXh0RGVzYyk7XG5cbiAgICAgY29uc3QgbGlzdElucHV0RHNlYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgIGxpc3RJbnB1dERzZWMudHlwZSA9ICd0ZXh0JztcbiAgICAgbGlzdElucHV0RHNlYy5jbGFzc05hbWUgPSAnbGlzdElucHV0RHNlYyBoaWRlJztcbiAgICAgbGlzdElucHV0RHNlYy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUl0ZW0sIGZhbHNlKTtcbiAgICAgbGlzdElucHV0RHNlYy5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcblxuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChsaXN0SW5wdXREc2VjKTtcblxuICAgICBjb25zdCBzcGFuU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICBzcGFuU3ZnLmNsYXNzTmFtZSA9ICdzcGFuU3ZnJztcbiAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgICBpY29uLmlkID0gYGljb24tJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBpY29uLmNsYXNzTmFtZSA9ICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJztcbiAgICAgc3BhblN2Zy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUl0ZW0sIGZhbHNlKTtcbiAgICAgc3BhblN2Zy5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoc3BhblN2Zyk7XG4gICAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgIH0pO1xuICAgaWYgKHRoaXMubGlzdEl0ZW1zICE9PSBbXSkge1xuICAgICBjb25zdCBjbGVhckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjbGVhckxpbmsuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGNsZWFyTGluayc7XG4gICAgIGNsZWFyTGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQ2xlYXIgYWxsIGNvbXBsZXRlZCcpKTtcbiAgICAgY2xlYXJMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJDb21wbHRlZCwgZmFsc2UpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChjbGVhckxpbmspO1xuICAgfVxuICAgcmV0dXJuIGxpc3RNYWluO1xuIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmVMaXN0KGUpIHtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2xpc3RJdGVtIGNsZWFyTGluaycpIHJldHVybiBmYWxzZTtcbiAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQgJiYgZS50YXJnZXQuY2xhc3NOYW1lICE9PSAndGV4dERlc2MnKSByZXR1cm4gZmFsc2U7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0SXRlbScpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaWNvbicpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmFzIGZhLWVsbGlwc2lzLXYgaWNvbicpO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmY2Y5ZjknO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaWNvbi0ke3RoaXMuaWQgLSAxfWApLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmFzIGZhLXRyYXNoIGljb24nKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0SW5wdXREc2VjJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtLnBhcmVudE5vZGUgIT09IHRoaXMpIHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgaXRlbS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgaWYgKGl0ZW0ucGFyZW50Tm9kZSA9PT0gdGhpcykgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgaXRlbS52YWx1ZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuaW5uZXJIVE1MO1xuICAgIHRoaXMucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9KTtcblxuICBpZiAodGhpcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbGlzdElucHV0LmNsYXNzTmFtZSA9ICdsaXN0SW5wdXQnO1xuICAgIGxpc3RJbnB1dC5pZCA9ICdsaXN0SW5wdXQnO1xuICAgIGxpc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkZEl0ZW0sIGZhbHNlKTtcbiAgICBsaXN0SW5wdXQucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY2hlY2tDb21wbGV0ZSwgdW5DaGVja0NvbXBsZXRlIH0gZnJvbSAnLi9jaGVja3N0YXR1cyc7XG5pbXBvcnQgVG9Eb0xpc3QsIHsgYWN0aXZlTGlzdCB9IGZyb20gJy4vdG9kb2xpc3QnO1xuaW1wb3J0IHsgcmVtb3ZlSXRlbSwgdXBkYXRlSXRlbSB9IGZyb20gJy4vYWRkcmVtb3ZlJztcblxuY29uc3QgY3VyT2JqID0geyBjdXJyOiBudWxsIH07XG5cbmZ1bmN0aW9uIGhhbmRlbERyYWdTdGFydChldikge1xuICBjdXJPYmouY3VyciA9IHRoaXM7XG4gIGV2LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9IVE1MJywgdGhpcy5vdXRlckhUTUwpO1xuICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2RyYWdFbGVtJyk7XG59XG5cbmZ1bmN0aW9uIGRyYWdIYW5kZWxlcihldikge1xuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICBldi5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgY29uc3QgeyB0b3AgfSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHsgYm90dG9tIH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBpZiAoZXYuY2xpZW50WSA8ICh0b3AgKyBib3R0b20pIC8gMikge1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnb3Zlci1iZWZvcmUnKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYWZ0ZXInKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ292ZXItYWZ0ZXInKTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYmVmb3JlJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcm9wSGFuZGxlcihldikge1xuICBpZiAoZXYuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBpZiAoY3VyT2JqLmN1cnIgIT09IHRoaXMpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3VyT2JqLmN1cnIpO1xuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnb3Zlci1iZWZvcmUnKSkge1xuICAgICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvaHRtbCcpKTtcbiAgICAgIGFkZEhhbmRsZXJzKHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnb3Zlci1hZnRlcicpKSB7XG4gICAgICB0aGlzLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9odG1sJykpO1xuICAgICAgYWRkSGFuZGxlcnModGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIH1cbiAgICBVcGRhdGVMaXN0SW5kZXgoKTtcbiAgfVxuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYmVmb3JlJyk7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1hZnRlcicpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZSgpIHtcbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWJlZm9yZScpO1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYWZ0ZXInKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbmQoKSB7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1iZWZvcmUnKTtcbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWFmdGVyJyk7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXJzKGVsZW0pIHtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBoYW5kZWxEcmFnU3RhcnQsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdIYW5kZWxlciwgZmFsc2UpO1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGhhbmRsZURyYWdMZWF2ZSwgZmFsc2UpO1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcm9wSGFuZGxlciwgZmFsc2UpO1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBoYW5kbGVEcmFnRW5kLCBmYWxzZSk7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhY3RpdmVMaXN0LCBmYWxzZSk7XG4gIGlmIChlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5zcGFuU3ZnJykgIT09IG51bGwpIGVsZW0ucXVlcnlTZWxlY3RvcignLnNwYW5TdmcnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUl0ZW0sIGZhbHNlKTtcbiAgaWYgKGVsZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94JykgIT09IG51bGwpIHtcbiAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtLnF1ZXJ5U2VsZWN0b3IoJy50aGlja1N5YicpICE9PSBudWxsKSB7XG4gICAgZWxlbS5xdWVyeVNlbGVjdG9yKCcudGhpY2tTeWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuQ2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0SW5wdXREc2VjJykgIT09IG51bGwpIHtcbiAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0SW5wdXREc2VjJykuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVJdGVtLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVXBkYXRlTGlzdEluZGV4KCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgY29uc3QgbmV3T2JqID0gW107XG4gIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0SXRlbURyYWcnKS5mb3JFYWNoKChpdGVtLCBpbmRleFBvcykgPT4ge1xuICAgIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpID09PSBudWxsKSB7XG4gICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKS5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZXdPYmoucHVzaCh7IGRlY3JpcHRpb246IGl0ZW0udGV4dENvbnRlbnQucmVwbGFjZSgn4pyUICcsICcnKSwgY29tcGxldGVkLCBpbmRleDogaW5kZXhQb3MgKyAxIH0pO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBvYmouaW5kZXggPT09IHBhcnNlSW50KGl0ZW0uaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5pbmRleCA9IGluZGV4UG9zICsgMTtcbiAgICBpdGVtLmlkID0gaW5kZXhQb3MgKyAxO1xuICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLmljb24nKS5pZCA9IGBpY29uLSR7aW5kZXhQb3N9YDtcbiAgfSk7XG4gIGxpc3RPYmouc2V0TGlzdEl0ZW1zKG5ld09iaik7XG59XG5cbmV4cG9ydCB7XG4gIGhhbmRlbERyYWdTdGFydCwgZHJhZ0hhbmRlbGVyLCBkcm9wSGFuZGxlciwgYWRkSGFuZGxlcnMsXG59OyJdLCJzb3VyY2VSb290IjoiIn0=