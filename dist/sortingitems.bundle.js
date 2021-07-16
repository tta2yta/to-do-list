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
/* harmony export */   "updateItem": () => (/* binding */ updateItem)
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
     listMain.appendChild(clearLink);
   }
   return listMain;
 }
}
function activeList(e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc29ydGluZ2l0ZW1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDOztBQUUzQjtBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx3QkFBd0IsOENBQVE7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q2tDOztBQUVsQztBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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c0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUJBQWlCLGlGQUFpRjtBQUNsRztBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RCxHQUFHO0FBQ0g7QUFDQSIsImZpbGUiOiJzb3J0aW5naXRlbXMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShldikge1xuICBpZiAoZXYua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBhZGRPYmogPSB7IGRlY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0SW5wdXQnKS52YWx1ZSwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IGxpc3RPYmoubGlzdEl0ZW1zLmxlbmd0aCArIDEgfTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtcyA9IFsuLi5saXN0T2JqLmxpc3RJdGVtcywgYWRkT2JqXTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJdGVtKCkge1xuICBpZiAodGhpcy5xdWVyeVNlbGVjdG9yKCcuZmEtdHJhc2gnKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbS5pbmRleCwgMTApICE9PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSk7XG5cbiAgICBmaWx0ZXJlZExpc3QuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5kZXggPSBpbmRleCArIDE7XG4gICAgfSk7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMoZmlsdGVyZWRMaXN0KTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUl0ZW0oZXYpIHtcbiAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGNvbnN0IGRlY3JpcHRpb24gPSB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJlbnROb2RlLmlkO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IG9iai5pbmRleCA9PT0gcGFyc2VJbnQoaW5kZXgsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5kZWNyaXB0aW9uID0gZGVjcmlwdGlvbjtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnO1xuXG5mdW5jdGlvbiBjaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5jaGVja2VkKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0aGlja1N5YiwgdGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bkNoZWNrQ29tcGxldGUoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLmlkID0gYGljb24tJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNoZWNrYm94LCB0aGlzKTtcbiAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2hlY2tib3hoYW5kbGVyKGVsZW0pIHtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbn1cblxuZXhwb3J0IHsgY2hlY2tDb21wbGV0ZSwgdW5DaGVja0NvbXBsZXRlLCBhZGRDaGVja2JveGhhbmRsZXIgfTtcbiIsImltcG9ydCB7IHVuQ2hlY2tDb21wbGV0ZSB9IGZyb20gJy4vY2hlY2tzdGF0dXMnO1xuaW1wb3J0IHsgYWRkSXRlbSwgcmVtb3ZlSXRlbSwgdXBkYXRlSXRlbSB9IGZyb20gJy4vYWRkcmVtb3ZlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RJdGVtcyA9IFtdO1xuICB9XG5cbiAgc2V0TGlzdEl0ZW1zKG9iaiA9IG51bGwpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3QnLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfVxuXG4gIGdldExpc3RJdG1lcz0oKSA9PiB7XG4gICAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3QnKSk7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5saXN0SXRlbXMgPSBbXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ0RvdWJsZS10YXAgdG8gZWRpdCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAxIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogXCJEcmFnICduIGRyb3AgdG8gcmVvcmRlciB5b3VyIGxpc3RcIiwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDIgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnTWFuYWdlIGFsbCB5b3VyIGxpc3RzIGluIG9uZSBwbGFjZScsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAzIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ1Jlc3luYyB0byBjbGVhciBvdXQgdGhlIG9sZCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiA0IH0sXG4gICAgICBdO1xuICAgICAgdGhpcy5zZXRMaXN0SXRlbXModGhpcy5saXN0SXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXBwZWREYXRhQXJyYXkgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IChtYXBwZWREYXRhQXJyYXkucHVzaChvYmpba2V5XSkpKTtcblxuICAgICAgdGhpcy5saXN0SXRlbXMgPSBtYXBwZWREYXRhQXJyYXk7XG4gICAgfVxuICB9XG5cbiBkaXNwbGF5SXRlbXM9KCkgPT4ge1xuICAgY29uc3QgbGlzdE1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgY29uc3QgbGlzdEl0ZW1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBjb25zdCBpY29uUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGNvbnN0IGljb25FbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGljb25SZWZyZXNoLmNsYXNzTmFtZSA9ICdmYXMgZmEtc3luYyBpY29uUmVmcmVzaCc7XG4gICBpY29uRW50ZXIuY2xhc3NOYW1lID0gJ2ZhcyBmYS1wZW4gaWNvbkVudGVyJztcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RvIERvIExpc3QnKSk7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGljb25SZWZyZXNoKTtcbiAgIGNvbnN0IGxpc3RJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgbGlzdEl0ZW1JbnB1dC5jbGFzc05hbWUgPSAnbGlzdEl0ZW1JbnB1dCc7XG4gICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQuaWQgPSAnbGlzdElucHV0JztcbiAgIGxpc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkZEl0ZW0sIGZhbHNlKTtcbiAgIGxpc3RJbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQoaWNvbkVudGVyKTtcbiAgIGxpc3RJdGVtVGl0bGUuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGxpc3RJdGVtVGl0bGUnO1xuICAgbGlzdEl0ZW1JbnB1dC5hcHBlbmRDaGlsZChsaXN0SW5wdXQpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1UaXRsZSk7XG4gICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbUlucHV0KTtcbiAgIHRoaXMubGlzdEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICBjaGVja2JveC5uYW1lID0gYGNoZWNrYm94LSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICAgICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gICAgIGlmIChpdGVtLmNvbXBsZXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0aGlja1N5Yik7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgfVxuICAgICBsaXN0SXRlbS5pZCA9IGl0ZW0uaW5kZXg7XG4gICAgIGxpc3RJdGVtLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgIGxpc3RJdGVtLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbURyYWcnO1xuICAgICBsaXN0SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFjdGl2ZUxpc3QsIGZhbHNlKTtcblxuICAgICBjb25zdCB0ZXh0RGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgdGV4dERlc2MuY2xhc3NOYW1lID0gJ3RleHREZXNjJztcbiAgICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGl0ZW0uZGVjcmlwdGlvbik7XG4gICAgIHRleHREZXNjLmFwcGVuZENoaWxkKHQpO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0ZXh0RGVzYyk7XG5cbiAgICAgY29uc3QgbGlzdElucHV0RHNlYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgIGxpc3RJbnB1dERzZWMudHlwZSA9ICd0ZXh0JztcbiAgICAgbGlzdElucHV0RHNlYy5jbGFzc05hbWUgPSAnbGlzdElucHV0RHNlYyBoaWRlJztcbiAgICAgbGlzdElucHV0RHNlYy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUl0ZW0sIGZhbHNlKTtcbiAgICAgbGlzdElucHV0RHNlYy5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcblxuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChsaXN0SW5wdXREc2VjKTtcblxuICAgICBjb25zdCBzcGFuU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICBzcGFuU3ZnLmNsYXNzTmFtZSA9ICdzcGFuU3ZnJztcbiAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgICBpY29uLmlkID0gYGljb24tJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBpY29uLmNsYXNzTmFtZSA9ICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJztcbiAgICAgc3BhblN2Zy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUl0ZW0sIGZhbHNlKTtcbiAgICAgc3BhblN2Zy5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoc3BhblN2Zyk7XG4gICAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgIH0pO1xuICAgaWYgKHRoaXMubGlzdEl0ZW1zICE9PSBbXSkge1xuICAgICBjb25zdCBjbGVhckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjbGVhckxpbmsuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGNsZWFyTGluayc7XG4gICAgIGNsZWFyTGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQ2xlYXIgYWxsIGNvbXBsZXRlZCcpKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQoY2xlYXJMaW5rKTtcbiAgIH1cbiAgIHJldHVybiBsaXN0TWFpbjtcbiB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWN0aXZlTGlzdChlKSB7XG4gIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3RleHREZXNjJykgcmV0dXJuIGZhbHNlO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdEl0ZW0nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nKTtcbiAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmNmOWY5JztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGljb24tJHt0aGlzLmlkIC0gMX1gKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhcyBmYS10cmFzaCBpY29uJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdElucHV0RHNlYycpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlICE9PSB0aGlzKSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGlmIChpdGVtLnBhcmVudE5vZGUgPT09IHRoaXMpIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGl0ZW0udmFsdWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmlubmVySFRNTDtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgaWYgKHRoaXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxpc3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGxpc3RJbnB1dC5jbGFzc05hbWUgPSAnbGlzdElucHV0JztcbiAgICBsaXN0SW5wdXQuaWQgPSAnbGlzdElucHV0JztcbiAgICBsaXN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGRJdGVtLCBmYWxzZSk7XG4gICAgbGlzdElucHV0LnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNoZWNrQ29tcGxldGUsIHVuQ2hlY2tDb21wbGV0ZSB9IGZyb20gJy4vY2hlY2tzdGF0dXMnO1xuaW1wb3J0IFRvRG9MaXN0LCB7IGFjdGl2ZUxpc3QgfSBmcm9tICcuL3RvZG9saXN0JztcbmltcG9ydCB7IHJlbW92ZUl0ZW0sIHVwZGF0ZUl0ZW0gfSBmcm9tICcuL2FkZHJlbW92ZSc7XG5cbmNvbnN0IGN1ck9iaiA9IHsgY3VycjogbnVsbCB9O1xuXG5mdW5jdGlvbiBoYW5kZWxEcmFnU3RhcnQoZXYpIHtcbiAgY3VyT2JqLmN1cnIgPSB0aGlzO1xuICBldi5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvSFRNTCcsIHRoaXMub3V0ZXJIVE1MKTtcbiAgdGhpcy5jbGFzc0xpc3QuYWRkKCdkcmFnRWxlbScpO1xufVxuXG5mdW5jdGlvbiBkcmFnSGFuZGVsZXIoZXYpIHtcbiAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgZXYuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gIGNvbnN0IHsgdG9wIH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB7IGJvdHRvbSB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgaWYgKGV2LmNsaWVudFkgPCAodG9wICsgYm90dG9tKSAvIDIpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ292ZXItYmVmb3JlJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWFmdGVyJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdvdmVyLWFmdGVyJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWJlZm9yZScpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZHJvcEhhbmRsZXIoZXYpIHtcbiAgaWYgKGV2LnN0b3BQcm9wYWdhdGlvbikge1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgaWYgKGN1ck9iai5jdXJyICE9PSB0aGlzKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGN1ck9iai5jdXJyKTtcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXItYmVmb3JlJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L2h0bWwnKSk7XG4gICAgICBhZGRIYW5kbGVycyh0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXItYWZ0ZXInKSkge1xuICAgICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvaHRtbCcpKTtcbiAgICAgIGFkZEhhbmRsZXJzKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICB9XG4gICAgVXBkYXRlTGlzdEluZGV4KCk7XG4gIH1cbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWJlZm9yZScpO1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYWZ0ZXInKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoKSB7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1iZWZvcmUnKTtcbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWFmdGVyJyk7XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnRW5kKCkge1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYmVmb3JlJyk7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1hZnRlcicpO1xufVxuXG5mdW5jdGlvbiBhZGRIYW5kbGVycyhlbGVtKSB7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgaGFuZGVsRHJhZ1N0YXJ0LCBmYWxzZSk7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnSGFuZGVsZXIsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBoYW5kbGVEcmFnTGVhdmUsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcEhhbmRsZXIsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgaGFuZGxlRHJhZ0VuZCwgZmFsc2UpO1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWN0aXZlTGlzdCwgZmFsc2UpO1xuICBpZiAoZWxlbS5xdWVyeVNlbGVjdG9yKCcuc3BhblN2ZycpICE9PSBudWxsKSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5zcGFuU3ZnJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVJdGVtLCBmYWxzZSk7XG4gIGlmIChlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpICE9PSBudWxsKSB7XG4gICAgZWxlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbS5xdWVyeVNlbGVjdG9yKCcudGhpY2tTeWInKSAhPT0gbnVsbCkge1xuICAgIGVsZW0ucXVlcnlTZWxlY3RvcignLnRoaWNrU3liJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpICE9PSBudWxsKSB7XG4gICAgZWxlbS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlSXRlbSwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIFVwZGF0ZUxpc3RJbmRleCgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBsZXQgY29tcGxldGVkID0gZmFsc2U7XG4gIGNvbnN0IG5ld09iaiA9IFtdO1xuICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdEl0ZW1EcmFnJykuZm9yRWFjaCgoaXRlbSwgaW5kZXhQb3MpID0+IHtcbiAgICBpZiAoaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKSA9PT0gbnVsbCkge1xuICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94JykuY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmV3T2JqLnB1c2goeyBkZWNyaXB0aW9uOiBpdGVtLnRleHRDb250ZW50LnJlcGxhY2UoJ+KclCAnLCAnJyksIGNvbXBsZXRlZCwgaW5kZXg6IGluZGV4UG9zICsgMSB9KTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gb2JqLmluZGV4ID09PSBwYXJzZUludChpdGVtLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uaW5kZXggPSBpbmRleFBvcyArIDE7XG4gICAgaXRlbS5pZCA9IGluZGV4UG9zICsgMTtcbiAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5pY29uJykuaWQgPSBgaWNvbi0ke2luZGV4UG9zfWA7XG4gIH0pO1xuICBsaXN0T2JqLnNldExpc3RJdGVtcyhuZXdPYmopO1xufVxuXG5leHBvcnQge1xuICBoYW5kZWxEcmFnU3RhcnQsIGRyYWdIYW5kZWxlciwgZHJvcEhhbmRsZXIsIGFkZEhhbmRsZXJzLFxufTsiXSwic291cmNlUm9vdCI6IiJ9