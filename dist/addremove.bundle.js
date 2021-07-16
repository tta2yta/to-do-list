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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addremove.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDOztBQUUzQjtBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx3QkFBd0IsOENBQVE7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q2tDOztBQUVsQztBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0EsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsdUJBQXVCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFOEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEZDtBQUNjOztBQUUvQztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLCtEQUErRDtBQUN4RSxTQUFTLDhFQUE4RTtBQUN2RixTQUFTLCtFQUErRTtBQUN4RixTQUFTLHdFQUF3RTtBQUNqRjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywrQ0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseURBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtEQUFVO0FBQ3ZEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0EsdUNBQXVDLGtEQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esa0NBQWtDLFlBQVk7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywrQ0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7VUMxSUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImFkZHJlbW92ZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGV2KSB7XG4gIGlmIChldi5rZXlDb2RlID09PSAxMykge1xuICAgIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IGFkZE9iaiA9IHsgZGVjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3RJbnB1dCcpLnZhbHVlLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogbGlzdE9iai5saXN0SXRlbXMubGVuZ3RoICsgMSB9O1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zID0gWy4uLmxpc3RPYmoubGlzdEl0ZW1zLCBhZGRPYmpdO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oKSB7XG4gIGlmICh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5mYS10cmFzaCcpICE9PSBudWxsKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gbGlzdE9iai5saXN0SXRlbXMuZmlsdGVyKChpdGVtKSA9PiBwYXJzZUludChpdGVtLmluZGV4LCAxMCkgIT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKTtcblxuICAgIGZpbHRlcmVkTGlzdC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgZWxlbWVudC5pbmRleCA9IGluZGV4ICsgMTtcbiAgICB9KTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhmaWx0ZXJlZExpc3QpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSXRlbShldikge1xuICBpZiAoZXYua2V5Q29kZSA9PT0gMTMpIHtcbiAgICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgY29uc3QgZGVjcmlwdGlvbiA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmVudE5vZGUuaWQ7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gb2JqLmluZGV4ID09PSBwYXJzZUludChpbmRleCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmRlY3JpcHRpb24gPSBkZWNyaXB0aW9uO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0iLCJpbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi90b2RvbGlzdCc7XG5cbmZ1bmN0aW9uIGNoZWNrQ29tcGxldGUoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLmNoZWNrZWQpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0SW5wdXREc2VjJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgY29uc3QgdGhpY2tTeWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpY2tTeWIuY2xhc3NOYW1lID0gJ3RoaWNrU3liJztcbiAgICB0aGlja1N5Yi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuQ2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgn4pyUICcpO1xuICAgIHRoaWNrU3liLmFwcGVuZENoaWxkKHQpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRoaWNrU3liLCB0aGlzKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuQ2hlY2tDb21wbGV0ZSgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBjaGVja2JveC5uYW1lID0gYGNoZWNrYm94LSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBjaGVja2JveC52YWx1ZSA9ICd2YWx1ZSc7XG4gIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBjaGVja2JveC5jbGFzc05hbWUgPSAnY2hlY2tib3gnO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdElucHV0RHNlYycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5pY29uJykuaWQgPSBgaWNvbi0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2hlY2tib3gsIHRoaXMpO1xuICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja2JveGhhbmRsZXIoZWxlbSkge1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xufVxuXG5leHBvcnQgeyBjaGVja0NvbXBsZXRlLCB1bkNoZWNrQ29tcGxldGUsIGFkZENoZWNrYm94aGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgdW5DaGVja0NvbXBsZXRlIH0gZnJvbSAnLi9jaGVja3N0YXR1cyc7XG5pbXBvcnQgeyBhZGRJdGVtLCByZW1vdmVJdGVtLCB1cGRhdGVJdGVtIH0gZnJvbSAnLi9hZGRyZW1vdmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGlzdEl0ZW1zID0gW107XG4gIH1cblxuICBzZXRMaXN0SXRlbXMob2JqID0gbnVsbCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvbGlzdCcsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICB9XG5cbiAgZ2V0TGlzdEl0bWVzPSgpID0+IHtcbiAgICBjb25zdCBvYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvbGlzdCcpKTtcbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICB0aGlzLmxpc3RJdGVtcyA9IFtcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnRG91YmxlLXRhcCB0byBlZGl0JywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDEgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiBcIkRyYWcgJ24gZHJvcCB0byByZW9yZGVyIHlvdXIgbGlzdFwiLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMiB9LFxuICAgICAgICB7IGRlY3JpcHRpb246ICdNYW5hZ2UgYWxsIHlvdXIgbGlzdHMgaW4gb25lIHBsYWNlJywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDMgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnUmVzeW5jIHRvIGNsZWFyIG91dCB0aGUgb2xkJywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDQgfSxcbiAgICAgIF07XG4gICAgICB0aGlzLnNldExpc3RJdGVtcyh0aGlzLmxpc3RJdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcHBlZERhdGFBcnJheSA9IFtdO1xuICAgICAgT2JqZWN0LmtleXMob2JqKS5tYXAoKGtleSkgPT4gKG1hcHBlZERhdGFBcnJheS5wdXNoKG9ialtrZXldKSkpO1xuXG4gICAgICB0aGlzLmxpc3RJdGVtcyA9IG1hcHBlZERhdGFBcnJheTtcbiAgICB9XG4gIH1cblxuIGRpc3BsYXlJdGVtcz0oKSA9PiB7XG4gICBjb25zdCBsaXN0TWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICBjb25zdCBsaXN0SXRlbVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIGNvbnN0IGljb25SZWZyZXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgY29uc3QgaWNvbkVudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgaWNvblJlZnJlc2guY2xhc3NOYW1lID0gJ2ZhcyBmYS1zeW5jIGljb25SZWZyZXNoJztcbiAgIGljb25FbnRlci5jbGFzc05hbWUgPSAnZmFzIGZhLXBlbiBpY29uRW50ZXInO1xuICAgbGlzdEl0ZW1UaXRsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnVG8gRG8gTGlzdCcpKTtcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoaWNvblJlZnJlc2gpO1xuICAgY29uc3QgbGlzdEl0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBsaXN0SXRlbUlucHV0LmNsYXNzTmFtZSA9ICdsaXN0SXRlbUlucHV0JztcbiAgIGNvbnN0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgIGxpc3RJbnB1dC5jbGFzc05hbWUgPSAnbGlzdElucHV0JztcbiAgIGxpc3RJbnB1dC5pZCA9ICdsaXN0SW5wdXQnO1xuICAgbGlzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRkSXRlbSwgZmFsc2UpO1xuICAgbGlzdElucHV0LnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuICAgbGlzdEl0ZW1JbnB1dC5hcHBlbmRDaGlsZChpY29uRW50ZXIpO1xuICAgbGlzdEl0ZW1UaXRsZS5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gbGlzdEl0ZW1UaXRsZSc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGxpc3RJbnB1dCk7XG4gICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbVRpdGxlKTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtSW5wdXQpO1xuICAgdGhpcy5saXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgIGNoZWNrYm94Lm5hbWUgPSBgY2hlY2tib3gtJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBjaGVja2JveC52YWx1ZSA9ICd2YWx1ZSc7XG4gICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgICAgaWYgKGl0ZW0uY29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICAgY29uc3QgdGhpY2tTeWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgdGhpY2tTeWIuY2xhc3NOYW1lID0gJ3RoaWNrU3liJztcbiAgICAgICB0aGlja1N5Yi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuQ2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICAgICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgn4pyUICcpO1xuICAgICAgIHRoaWNrU3liLmFwcGVuZENoaWxkKHQpO1xuICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRoaWNrU3liKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICB9XG4gICAgIGxpc3RJdGVtLmlkID0gaXRlbS5pbmRleDtcbiAgICAgbGlzdEl0ZW0uZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgbGlzdEl0ZW0uY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGxpc3RJdGVtRHJhZyc7XG4gICAgIGxpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWN0aXZlTGlzdCwgZmFsc2UpO1xuXG4gICAgIGNvbnN0IHRleHREZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICB0ZXh0RGVzYy5jbGFzc05hbWUgPSAndGV4dERlc2MnO1xuICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5kZWNyaXB0aW9uKTtcbiAgICAgdGV4dERlc2MuYXBwZW5kQ2hpbGQodCk7XG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRleHREZXNjKTtcblxuICAgICBjb25zdCBsaXN0SW5wdXREc2VjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgbGlzdElucHV0RHNlYy50eXBlID0gJ3RleHQnO1xuICAgICBsaXN0SW5wdXREc2VjLmNsYXNzTmFtZSA9ICdsaXN0SW5wdXREc2VjIGhpZGUnO1xuICAgICBsaXN0SW5wdXREc2VjLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlSXRlbSwgZmFsc2UpO1xuICAgICBsaXN0SW5wdXREc2VjLnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuXG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RJbnB1dERzZWMpO1xuXG4gICAgIGNvbnN0IHNwYW5TdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgIHNwYW5TdmcuY2xhc3NOYW1lID0gJ3NwYW5TdmcnO1xuICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgIGljb24uaWQgPSBgaWNvbi0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nO1xuICAgICBzcGFuU3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlSXRlbSwgZmFsc2UpO1xuICAgICBzcGFuU3ZnLmFwcGVuZENoaWxkKGljb24pO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChzcGFuU3ZnKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgfSk7XG4gICBpZiAodGhpcy5saXN0SXRlbXMgIT09IFtdKSB7XG4gICAgIGNvbnN0IGNsZWFyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNsZWFyTGluay5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gY2xlYXJMaW5rJztcbiAgICAgY2xlYXJMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDbGVhciBhbGwgY29tcGxldGVkJykpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChjbGVhckxpbmspO1xuICAgfVxuICAgcmV0dXJuIGxpc3RNYWluO1xuIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmVMaXN0KGUpIHtcbiAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQgJiYgZS50YXJnZXQuY2xhc3NOYW1lICE9PSAndGV4dERlc2MnKSByZXR1cm4gZmFsc2U7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0SXRlbScpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaWNvbicpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmFzIGZhLWVsbGlwc2lzLXYgaWNvbicpO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmY2Y5ZjknO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaWNvbi0ke3RoaXMuaWQgLSAxfWApLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmFzIGZhLXRyYXNoIGljb24nKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0SW5wdXREc2VjJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtLnBhcmVudE5vZGUgIT09IHRoaXMpIHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgaXRlbS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gICAgaWYgKGl0ZW0ucGFyZW50Tm9kZSA9PT0gdGhpcykgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgaXRlbS52YWx1ZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuaW5uZXJIVE1MO1xuICAgIHRoaXMucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9KTtcblxuICBpZiAodGhpcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbGlzdElucHV0LmNsYXNzTmFtZSA9ICdsaXN0SW5wdXQnO1xuICAgIGxpc3RJbnB1dC5pZCA9ICdsaXN0SW5wdXQnO1xuICAgIGxpc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkZEl0ZW0sIGZhbHNlKTtcbiAgICBsaXN0SW5wdXQucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkcmVtb3ZlLmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==