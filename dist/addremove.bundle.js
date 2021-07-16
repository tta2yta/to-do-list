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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addremove.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQzs7QUFFM0I7QUFDUDtBQUNBLHdCQUF3Qiw4Q0FBUTtBQUNoQztBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERrQzs7QUFFbEM7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBLDhCQUE4Qix1QkFBdUI7QUFDckQ7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHVCQUF1QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRThEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRGQ7QUFHM0I7O0FBRU47QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUywrREFBK0Q7QUFDeEUsU0FBUyw4RUFBOEU7QUFDdkYsU0FBUywrRUFBK0U7QUFDeEYsU0FBUyx3RUFBd0U7QUFDakY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0NBQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlEQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxrREFBVTtBQUN2RDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBLHVDQUF1QyxrREFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMscURBQWE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGtDQUFrQyxZQUFZO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsK0NBQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDOUlBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhZGRyZW1vdmUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShldikge1xuICBpZiAoZXYua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBhZGRPYmogPSB7IGRlY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0SW5wdXQnKS52YWx1ZSwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IGxpc3RPYmoubGlzdEl0ZW1zLmxlbmd0aCArIDEgfTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtcyA9IFsuLi5saXN0T2JqLmxpc3RJdGVtcywgYWRkT2JqXTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJdGVtKCkge1xuICBpZiAodGhpcy5xdWVyeVNlbGVjdG9yKCcuZmEtdHJhc2gnKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbS5pbmRleCwgMTApICE9PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSk7XG4gICAgZmlsdGVyZWRMaXN0LmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBlbGVtZW50LmluZGV4ID0gaW5kZXggKyAxO1xuICAgIH0pO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGZpbHRlcmVkTGlzdCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVJdGVtKGV2KSB7XG4gIGlmIChldi5rZXlDb2RlID09PSAxMykge1xuICAgIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgICBjb25zdCBkZWNyaXB0aW9uID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyZW50Tm9kZS5pZDtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBvYmouaW5kZXggPT09IHBhcnNlSW50KGluZGV4LCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uZGVjcmlwdGlvbiA9IGRlY3JpcHRpb247XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb21wbHRlZCgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICBjb25zdCBmaWx0ZXJlZExpc3QgPSBsaXN0T2JqLmxpc3RJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcGxldGVkICE9PSB0cnVlKTtcbiAgbGlzdE9iai5zZXRMaXN0SXRlbXMoZmlsdGVyZWRMaXN0KTtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnO1xuXG5mdW5jdGlvbiBjaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5jaGVja2VkKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0aGlja1N5YiwgdGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bkNoZWNrQ29tcGxldGUoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLmlkID0gYGljb24tJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNoZWNrYm94LCB0aGlzKTtcbiAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2hlY2tib3hoYW5kbGVyKGVsZW0pIHtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbn1cblxuZXhwb3J0IHsgY2hlY2tDb21wbGV0ZSwgdW5DaGVja0NvbXBsZXRlLCBhZGRDaGVja2JveGhhbmRsZXIgfTtcbiIsImltcG9ydCB7IHVuQ2hlY2tDb21wbGV0ZSB9IGZyb20gJy4vY2hlY2tzdGF0dXMnO1xuaW1wb3J0IHtcbiAgYWRkSXRlbSwgcmVtb3ZlSXRlbSwgdXBkYXRlSXRlbSwgY2xlYXJDb21wbHRlZCxcbn0gZnJvbSAnLi9hZGRyZW1vdmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGlzdEl0ZW1zID0gW107XG4gIH1cblxuICBzZXRMaXN0SXRlbXMob2JqID0gbnVsbCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdCcsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICB9XG5cbiAgZ2V0TGlzdEl0bWVzPSgpID0+IHtcbiAgICBjb25zdCBvYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvbGlzdCcpKTtcbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICB0aGlzLmxpc3RJdGVtcyA9IFtcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnRG91YmxlLXRhcCB0byBlZGl0JywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDEgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiBcIkRyYWcgJ24gZHJvcCB0byByZW9yZGVyIHlvdXIgbGlzdFwiLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMiB9LFxuICAgICAgICB7IGRlY3JpcHRpb246ICdNYW5hZ2UgYWxsIHlvdXIgbGlzdHMgaW4gb25lIHBsYWNlJywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDMgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnUmVzeW5jIHRvIGNsZWFyIG91dCB0aGUgb2xkJywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDQgfSxcbiAgICAgIF07XG4gICAgICB0aGlzLnNldExpc3RJdGVtcyh0aGlzLmxpc3RJdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcHBlZERhdGFBcnJheSA9IFtdO1xuICAgICAgT2JqZWN0LmtleXMob2JqKS5tYXAoKGtleSkgPT4gKG1hcHBlZERhdGFBcnJheS5wdXNoKG9ialtrZXldKSkpO1xuXG4gICAgICB0aGlzLmxpc3RJdGVtcyA9IG1hcHBlZERhdGFBcnJheTtcbiAgICB9XG4gIH1cblxuIGRpc3BsYXlJdGVtcz0oKSA9PiB7XG4gICBjb25zdCBsaXN0TWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICBjb25zdCBsaXN0SXRlbVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIGNvbnN0IGljb25SZWZyZXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgY29uc3QgaWNvbkVudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgaWNvblJlZnJlc2guY2xhc3NOYW1lID0gJ2ZhcyBmYS1zeW5jIGljb25SZWZyZXNoJztcbiAgIGljb25FbnRlci5jbGFzc05hbWUgPSAnZmFzIGZhLXBlbiBpY29uRW50ZXInO1xuICAgbGlzdEl0ZW1UaXRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnVG8gRG8gTGlzdCcpKTtcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoaWNvblJlZnJlc2gpO1xuICAgY29uc3QgbGlzdEl0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBsaXN0SXRlbUlucHV0LmNsYXNzTmFtZSA9ICdsaXN0SXRlbUlucHV0JztcbiAgIGNvbnN0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgIGxpc3RJbnB1dC5jbGFzc05hbWUgPSAnbGlzdElucHV0JztcbiAgIGxpc3RJbnB1dC5pZCA9ICdsaXN0SW5wdXQnO1xuICAgbGlzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRkSXRlbSwgZmFsc2UpO1xuICAgbGlzdElucHV0LnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuICAgbGlzdEl0ZW1JbnB1dC5hcHBlbmRDaGlsZChpY29uRW50ZXIpO1xuICAgbGlzdEl0ZW1UaXRsZS5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gbGlzdEl0ZW1UaXRsZSc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGxpc3RJbnB1dCk7XG4gICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbVRpdGxlKTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtSW5wdXQpO1xuICAgdGhpcy5saXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgIGNoZWNrYm94Lm5hbWUgPSBgY2hlY2tib3gtJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBjaGVja2JveC52YWx1ZSA9ICd2YWx1ZSc7XG4gICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgICAgaWYgKGl0ZW0uY29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICAgY29uc3QgdGhpY2tTeWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgdGhpY2tTeWIuY2xhc3NOYW1lID0gJ3RoaWNrU3liJztcbiAgICAgICB0aGlja1N5Yi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuQ2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICAgICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgn4pyUICcpO1xuICAgICAgIHRoaWNrU3liLmFwcGVuZENoaWxkKHQpO1xuICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRoaWNrU3liKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICB9XG4gICAgIGxpc3RJdGVtLmlkID0gaXRlbS5pbmRleDtcbiAgICAgbGlzdEl0ZW0uZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgbGlzdEl0ZW0uY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGxpc3RJdGVtRHJhZyc7XG4gICAgIGxpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWN0aXZlTGlzdCwgZmFsc2UpO1xuXG4gICAgIGNvbnN0IHRleHREZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICB0ZXh0RGVzYy5jbGFzc05hbWUgPSAndGV4dERlc2MnO1xuICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5kZWNyaXB0aW9uKTtcbiAgICAgdGV4dERlc2MuYXBwZW5kQ2hpbGQodCk7XG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRleHREZXNjKTtcblxuICAgICBjb25zdCBsaXN0SW5wdXREc2VjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgbGlzdElucHV0RHNlYy50eXBlID0gJ3RleHQnO1xuICAgICBsaXN0SW5wdXREc2VjLmNsYXNzTmFtZSA9ICdsaXN0SW5wdXREc2VjIGhpZGUnO1xuICAgICBsaXN0SW5wdXREc2VjLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlSXRlbSwgZmFsc2UpO1xuICAgICBsaXN0SW5wdXREc2VjLnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuXG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RJbnB1dERzZWMpO1xuXG4gICAgIGNvbnN0IHNwYW5TdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgIHNwYW5TdmcuY2xhc3NOYW1lID0gJ3NwYW5TdmcnO1xuICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgIGljb24uaWQgPSBgaWNvbi0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nO1xuICAgICBzcGFuU3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlSXRlbSwgZmFsc2UpO1xuICAgICBzcGFuU3ZnLmFwcGVuZENoaWxkKGljb24pO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChzcGFuU3ZnKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgfSk7XG4gICBpZiAodGhpcy5saXN0SXRlbXMgIT09IFtdKSB7XG4gICAgIGNvbnN0IGNsZWFyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNsZWFyTGluay5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gY2xlYXJMaW5rJztcbiAgICAgY2xlYXJMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDbGVhciBhbGwgY29tcGxldGVkJykpO1xuICAgICBjbGVhckxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhckNvbXBsdGVkLCBmYWxzZSk7XG4gICAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGNsZWFyTGluayk7XG4gICB9XG4gICByZXR1cm4gbGlzdE1haW47XG4gfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2ZUxpc3QoZSkge1xuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSAnbGlzdEl0ZW0gY2xlYXJMaW5rJykgcmV0dXJuIGZhbHNlO1xuICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCAmJiBlLnRhcmdldC5jbGFzc05hbWUgIT09ICd0ZXh0RGVzYycpIHJldHVybiBmYWxzZTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJdGVtJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJyk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZjZjlmOSc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpY29uLSR7dGhpcy5pZCAtIDF9YCkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtdHJhc2ggaWNvbicpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJbnB1dERzZWMnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0ucGFyZW50Tm9kZSAhPT0gdGhpcykge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlID09PSB0aGlzKSBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBpdGVtLnZhbHVlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5pbm5lckhUTUw7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIH0pO1xuXG4gIGlmICh0aGlzICE9PSBudWxsKSB7XG4gICAgY29uc3QgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICAgbGlzdElucHV0LmlkID0gJ2xpc3RJbnB1dCc7XG4gICAgbGlzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRkSXRlbSwgZmFsc2UpO1xuICAgIGxpc3RJbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hZGRyZW1vdmUuanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9