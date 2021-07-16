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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/todolist.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFM0I7QUFDUDtBQUNBLHdCQUF3Qiw4Q0FBUTtBQUNoQztBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERrQzs7QUFFbEM7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBLDhCQUE4Qix1QkFBdUI7QUFDckQ7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHVCQUF1QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRThEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRGQ7QUFHM0I7O0FBRU47QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUywrREFBK0Q7QUFDeEUsU0FBUyw4RUFBOEU7QUFDdkYsU0FBUywrRUFBK0U7QUFDeEYsU0FBUyx3RUFBd0U7QUFDakY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0NBQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlEQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxrREFBVTtBQUN2RDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBLHVDQUF1QyxrREFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMscURBQWE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGtDQUFrQyxZQUFZO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsK0NBQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDOUlBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJ0b2RvbGlzdC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGV2KSB7XG4gIGlmIChldi5rZXlDb2RlID09PSAxMykge1xuICAgIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IGFkZE9iaiA9IHsgZGVjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3RJbnB1dCcpLnZhbHVlLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogbGlzdE9iai5saXN0SXRlbXMubGVuZ3RoICsgMSB9O1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zID0gWy4uLmxpc3RPYmoubGlzdEl0ZW1zLCBhZGRPYmpdO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oKSB7XG4gIGlmICh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5mYS10cmFzaCcpICE9PSBudWxsKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gbGlzdE9iai5saXN0SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBwYXJzZUludChpdGVtLmluZGV4LCAxMCkgIT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKTtcbiAgICBmaWx0ZXJlZExpc3QuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuaW5kZXggPSBpbmRleCArIDE7XG4gICAgfSk7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMoZmlsdGVyZWRMaXN0KTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUl0ZW0oZXYpIHtcbiAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGNvbnN0IGRlY3JpcHRpb24gPSB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJlbnROb2RlLmlkO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IG9iai5pbmRleCA9PT0gcGFyc2VJbnQoaW5kZXgsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5kZWNyaXB0aW9uID0gZGVjcmlwdGlvbjtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbXBsdGVkKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wbGV0ZWQgIT09IHRydWUpO1xuICBsaXN0T2JqLnNldExpc3RJdGVtcyhmaWx0ZXJlZExpc3QpO1xuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIHJldHVybiBmYWxzZTtcbn0iLCJpbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5cbmZ1bmN0aW9uIGNoZWNrQ29tcGxldGUoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLmNoZWNrZWQpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0SW5wdXREc2VjJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgY29uc3QgdGhpY2tTeWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpY2tTeWIuY2xhc3NOYW1lID0gJ3RoaWNrU3liJztcbiAgICB0aGlja1N5Yi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuQ2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgn4pyUICcpO1xuICAgIHRoaWNrU3liLmFwcGVuZENoaWxkKHQpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRoaWNrU3liLCB0aGlzKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuQ2hlY2tDb21wbGV0ZSgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBjaGVja2JveC5uYW1lID0gYGNoZWNrYm94LSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBjaGVja2JveC52YWx1ZSA9ICd2YWx1ZSc7XG4gIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBjaGVja2JveC5jbGFzc05hbWUgPSAnY2hlY2tib3gnO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5pY29uJykuaWQgPSBgaWNvbi0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2hlY2tib3gsIHRoaXMpO1xuICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja2JveGhhbmRsZXIoZWxlbSkge1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xufVxuXG5leHBvcnQgeyBjaGVja0NvbXBsZXRlLCB1bkNoZWNrQ29tcGxldGUsIGFkZENoZWNrYm94aGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgdW5DaGVja0NvbXBsZXRlIH0gZnJvbSAnLi9jaGVja3N0YXR1cyc7XG5pbXBvcnQge1xuICBhZGRJdGVtLCByZW1vdmVJdGVtLCB1cGRhdGVJdGVtLCBjbGVhckNvbXBsdGVkLFxufSBmcm9tICcuL2FkZHJlbW92ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5saXN0SXRlbXMgPSBbXTtcbiAgfVxuXG4gIHNldExpc3RJdGVtcyhvYmogPSBudWxsKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0JywgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH1cblxuICBnZXRMaXN0SXRtZXM9KCkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0JykpO1xuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgIHRoaXMubGlzdEl0ZW1zID0gW1xuICAgICAgICB7IGRlY3JpcHRpb246ICdEb3VibGUtdGFwIHRvIGVkaXQnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMSB9LFxuICAgICAgICB7IGRlY3JpcHRpb246IFwiRHJhZyAnbiBkcm9wIHRvIHJlb3JkZXIgeW91ciBsaXN0XCIsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAyIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ01hbmFnZSBhbGwgeW91ciBsaXN0cyBpbiBvbmUgcGxhY2UnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMyB9LFxuICAgICAgICB7IGRlY3JpcHRpb246ICdSZXN5bmMgdG8gY2xlYXIgb3V0IHRoZSBvbGQnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogNCB9LFxuICAgICAgXTtcbiAgICAgIHRoaXMuc2V0TGlzdEl0ZW1zKHRoaXMubGlzdEl0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFwcGVkRGF0YUFycmF5ID0gW107XG4gICAgICBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiAobWFwcGVkRGF0YUFycmF5LnB1c2gob2JqW2tleV0pKSk7XG5cbiAgICAgIHRoaXMubGlzdEl0ZW1zID0gbWFwcGVkRGF0YUFycmF5O1xuICAgIH1cbiAgfVxuXG4gZGlzcGxheUl0ZW1zPSgpID0+IHtcbiAgIGNvbnN0IGxpc3RNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgIGNvbnN0IGxpc3RJdGVtVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgY29uc3QgaWNvblJlZnJlc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICBjb25zdCBpY29uRW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICBpY29uUmVmcmVzaC5jbGFzc05hbWUgPSAnZmFzIGZhLXN5bmMgaWNvblJlZnJlc2gnO1xuICAgaWNvbkVudGVyLmNsYXNzTmFtZSA9ICdmYXMgZmEtcGVuIGljb25FbnRlcic7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUbyBEbyBMaXN0JykpO1xuICAgbGlzdEl0ZW1UaXRsZS5hcHBlbmRDaGlsZChpY29uUmVmcmVzaCk7XG4gICBjb25zdCBsaXN0SXRlbUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIGxpc3RJdGVtSW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJdGVtSW5wdXQnO1xuICAgY29uc3QgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgIGxpc3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgbGlzdElucHV0LmNsYXNzTmFtZSA9ICdsaXN0SW5wdXQnO1xuICAgbGlzdElucHV0LmlkID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGRJdGVtLCBmYWxzZSk7XG4gICBsaXN0SW5wdXQucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGljb25FbnRlcik7XG4gICBsaXN0SXRlbVRpdGxlLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbVRpdGxlJztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtVGl0bGUpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1JbnB1dCk7XG4gICB0aGlzLmxpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBjaGVja2JveC5jbGFzc05hbWUgPSAnY2hlY2tib3gnO1xuICAgICBpZiAoaXRlbS5jb21wbGV0ZWQgPT09IHRydWUpIHtcbiAgICAgICBjb25zdCB0aGlja1N5YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICB0aGlja1N5Yi5jbGFzc05hbWUgPSAndGhpY2tTeWInO1xuICAgICAgIHRoaWNrU3liLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gICAgICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCfinJQgJyk7XG4gICAgICAgdGhpY2tTeWIuYXBwZW5kQ2hpbGQodCk7XG4gICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGhpY2tTeWIpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgIH1cbiAgICAgbGlzdEl0ZW0uaWQgPSBpdGVtLmluZGV4O1xuICAgICBsaXN0SXRlbS5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICBsaXN0SXRlbS5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gbGlzdEl0ZW1EcmFnJztcbiAgICAgbGlzdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhY3RpdmVMaXN0LCBmYWxzZSk7XG5cbiAgICAgY29uc3QgdGV4dERlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgIHRleHREZXNjLmNsYXNzTmFtZSA9ICd0ZXh0RGVzYyc7XG4gICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLmRlY3JpcHRpb24pO1xuICAgICB0ZXh0RGVzYy5hcHBlbmRDaGlsZCh0KTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGV4dERlc2MpO1xuXG4gICAgIGNvbnN0IGxpc3RJbnB1dERzZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICBsaXN0SW5wdXREc2VjLnR5cGUgPSAndGV4dCc7XG4gICAgIGxpc3RJbnB1dERzZWMuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dERzZWMgaGlkZSc7XG4gICAgIGxpc3RJbnB1dERzZWMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVJdGVtLCBmYWxzZSk7XG4gICAgIGxpc3RJbnB1dERzZWMucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG5cbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdElucHV0RHNlYyk7XG5cbiAgICAgY29uc3Qgc3BhblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgc3BhblN2Zy5jbGFzc05hbWUgPSAnc3BhblN2Zyc7XG4gICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICAgaWNvbi5pZCA9IGBpY29uLSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgaWNvbi5jbGFzc05hbWUgPSAnZmFzIGZhLWVsbGlwc2lzLXYgaWNvbic7XG4gICAgIHNwYW5TdmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVJdGVtLCBmYWxzZSk7XG4gICAgIHNwYW5TdmcuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHNwYW5TdmcpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICB9KTtcbiAgIGlmICh0aGlzLmxpc3RJdGVtcyAhPT0gW10pIHtcbiAgICAgY29uc3QgY2xlYXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgY2xlYXJMaW5rLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBjbGVhckxpbmsnO1xuICAgICBjbGVhckxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0NsZWFyIGFsbCBjb21wbGV0ZWQnKSk7XG4gICAgIGNsZWFyTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyQ29tcGx0ZWQsIGZhbHNlKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQoY2xlYXJMaW5rKTtcbiAgIH1cbiAgIHJldHVybiBsaXN0TWFpbjtcbiB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWN0aXZlTGlzdChlKSB7XG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09ICdsaXN0SXRlbSBjbGVhckxpbmsnKSByZXR1cm4gZmFsc2U7XG4gIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0ICYmIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ3RleHREZXNjJykgcmV0dXJuIGZhbHNlO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdEl0ZW0nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nKTtcbiAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmNmOWY5JztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGljb24tJHt0aGlzLmlkIC0gMX1gKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhcyBmYS10cmFzaCBpY29uJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdElucHV0RHNlYycpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlICE9PSB0aGlzKSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICAgIGlmIChpdGVtLnBhcmVudE5vZGUgPT09IHRoaXMpIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGl0ZW0udmFsdWUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmlubmVySFRNTDtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgaWYgKHRoaXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxpc3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGxpc3RJbnB1dC5jbGFzc05hbWUgPSAnbGlzdElucHV0JztcbiAgICBsaXN0SW5wdXQuaWQgPSAnbGlzdElucHV0JztcbiAgICBsaXN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGRJdGVtLCBmYWxzZSk7XG4gICAgbGlzdElucHV0LnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3RvZG9saXN0LmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==