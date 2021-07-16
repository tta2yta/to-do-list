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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/checkstatus.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZHJlbW92ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDOztBQUUzQjtBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx3QkFBd0IsOENBQVE7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0JBQXdCLDhDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q2tDOztBQUVsQztBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0EsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsdUJBQXVCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFOEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEZDtBQUNjOztBQUUvQztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLCtEQUErRDtBQUN4RSxTQUFTLDhFQUE4RTtBQUN2RixTQUFTLCtFQUErRTtBQUN4RixTQUFTLHdFQUF3RTtBQUNqRjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywrQ0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0EsK0JBQStCLGVBQWU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMseURBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtEQUFVO0FBQ3ZEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0EsdUNBQXVDLGtEQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esa0NBQWtDLFlBQVk7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywrQ0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7VUMxSUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImNoZWNrc3RhdHVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb0RvTGlzdCBmcm9tICcuL3RvZG9saXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0oZXYpIHtcbiAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3QgYWRkT2JqID0geyBkZWNyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdElucHV0JykudmFsdWUsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiBsaXN0T2JqLmxpc3RJdGVtcy5sZW5ndGggKyAxIH07XG4gICAgbGlzdE9iai5saXN0SXRlbXMgPSBbLi4ubGlzdE9iai5saXN0SXRlbXMsIGFkZE9ial07XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcignLmZhLXRyYXNoJykgIT09IG51bGwpIHtcbiAgICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSBsaXN0T2JqLmxpc3RJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHBhcnNlSW50KGl0ZW0uaW5kZXgsIDEwKSAhPT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpO1xuXG4gICAgZmlsdGVyZWRMaXN0LmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBlbGVtZW50LmluZGV4ID0gaW5kZXggKyAxO1xuICAgIH0pO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGZpbHRlcmVkTGlzdCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVJdGVtKGV2KSB7XG4gIGlmIChldi5rZXlDb2RlID09PSAxMykge1xuICAgIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgICBjb25zdCBkZWNyaXB0aW9uID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyZW50Tm9kZS5pZDtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBvYmouaW5kZXggPT09IHBhcnNlSW50KGluZGV4LCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uZGVjcmlwdGlvbiA9IGRlY3JpcHRpb247XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCBUb0RvTGlzdCBmcm9tICcuL3RvZG9saXN0JztcblxuZnVuY3Rpb24gY2hlY2tDb21wbGV0ZSgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuY2hlY2tlZCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmxpc3RJbnB1dERzZWMnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25zdCB0aGlja1N5YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlja1N5Yi5jbGFzc05hbWUgPSAndGhpY2tTeWInO1xuICAgIHRoaWNrU3liLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCfinJQgJyk7XG4gICAgdGhpY2tTeWIuYXBwZW5kQ2hpbGQodCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpY2tTeWIsIHRoaXMpO1xuICB9IGVsc2Uge1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5DaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGNoZWNrYm94Lm5hbWUgPSBgY2hlY2tib3gtJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0SW5wdXREc2VjJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmljb24nKS5pZCA9IGBpY29uLSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjaGVja2JveCwgdGhpcyk7XG4gIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGFkZENoZWNrYm94aGFuZGxlcihlbGVtKSB7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG59XG5cbmV4cG9ydCB7IGNoZWNrQ29tcGxldGUsIHVuQ2hlY2tDb21wbGV0ZSwgYWRkQ2hlY2tib3hoYW5kbGVyIH07XG4iLCJpbXBvcnQgeyB1bkNoZWNrQ29tcGxldGUgfSBmcm9tICcuL2NoZWNrc3RhdHVzJztcbmltcG9ydCB7IGFkZEl0ZW0sIHJlbW92ZUl0ZW0sIHVwZGF0ZUl0ZW0gfSBmcm9tICcuL2FkZHJlbW92ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5saXN0SXRlbXMgPSBbXTtcbiAgfVxuXG4gIHNldExpc3RJdGVtcyhvYmogPSBudWxsKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0JywgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH1cblxuICBnZXRMaXN0SXRtZXM9KCkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0JykpO1xuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgIHRoaXMubGlzdEl0ZW1zID0gW1xuICAgICAgICB7IGRlY3JpcHRpb246ICdEb3VibGUtdGFwIHRvIGVkaXQnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMSB9LFxuICAgICAgICB7IGRlY3JpcHRpb246IFwiRHJhZyAnbiBkcm9wIHRvIHJlb3JkZXIgeW91ciBsaXN0XCIsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAyIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ01hbmFnZSBhbGwgeW91ciBsaXN0cyBpbiBvbmUgcGxhY2UnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMyB9LFxuICAgICAgICB7IGRlY3JpcHRpb246ICdSZXN5bmMgdG8gY2xlYXIgb3V0IHRoZSBvbGQnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogNCB9LFxuICAgICAgXTtcbiAgICAgIHRoaXMuc2V0TGlzdEl0ZW1zKHRoaXMubGlzdEl0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFwcGVkRGF0YUFycmF5ID0gW107XG4gICAgICBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiAobWFwcGVkRGF0YUFycmF5LnB1c2gob2JqW2tleV0pKSk7XG5cbiAgICAgIHRoaXMubGlzdEl0ZW1zID0gbWFwcGVkRGF0YUFycmF5O1xuICAgIH1cbiAgfVxuXG4gZGlzcGxheUl0ZW1zPSgpID0+IHtcbiAgIGNvbnN0IGxpc3RNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgIGNvbnN0IGxpc3RJdGVtVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgY29uc3QgaWNvblJlZnJlc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICBjb25zdCBpY29uRW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICBpY29uUmVmcmVzaC5jbGFzc05hbWUgPSAnZmFzIGZhLXN5bmMgaWNvblJlZnJlc2gnO1xuICAgaWNvbkVudGVyLmNsYXNzTmFtZSA9ICdmYXMgZmEtcGVuIGljb25FbnRlcic7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUbyBEbyBMaXN0JykpO1xuICAgbGlzdEl0ZW1UaXRsZS5hcHBlbmRDaGlsZChpY29uUmVmcmVzaCk7XG4gICBjb25zdCBsaXN0SXRlbUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIGxpc3RJdGVtSW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJdGVtSW5wdXQnO1xuICAgY29uc3QgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgIGxpc3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgbGlzdElucHV0LmNsYXNzTmFtZSA9ICdsaXN0SW5wdXQnO1xuICAgbGlzdElucHV0LmlkID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGRJdGVtLCBmYWxzZSk7XG4gICBsaXN0SW5wdXQucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGljb25FbnRlcik7XG4gICBsaXN0SXRlbVRpdGxlLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbVRpdGxlJztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtVGl0bGUpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1JbnB1dCk7XG4gICB0aGlzLmxpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBjaGVja2JveC5jbGFzc05hbWUgPSAnY2hlY2tib3gnO1xuICAgICBpZiAoaXRlbS5jb21wbGV0ZWQgPT09IHRydWUpIHtcbiAgICAgICBjb25zdCB0aGlja1N5YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICB0aGlja1N5Yi5jbGFzc05hbWUgPSAndGhpY2tTeWInO1xuICAgICAgIHRoaWNrU3liLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gICAgICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCfinJQgJyk7XG4gICAgICAgdGhpY2tTeWIuYXBwZW5kQ2hpbGQodCk7XG4gICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGhpY2tTeWIpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgIH1cbiAgICAgbGlzdEl0ZW0uaWQgPSBpdGVtLmluZGV4O1xuICAgICBsaXN0SXRlbS5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICBsaXN0SXRlbS5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gbGlzdEl0ZW1EcmFnJztcbiAgICAgbGlzdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhY3RpdmVMaXN0LCBmYWxzZSk7XG5cbiAgICAgY29uc3QgdGV4dERlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgIHRleHREZXNjLmNsYXNzTmFtZSA9ICd0ZXh0RGVzYyc7XG4gICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLmRlY3JpcHRpb24pO1xuICAgICB0ZXh0RGVzYy5hcHBlbmRDaGlsZCh0KTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGV4dERlc2MpO1xuXG4gICAgIGNvbnN0IGxpc3RJbnB1dERzZWMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICBsaXN0SW5wdXREc2VjLnR5cGUgPSAndGV4dCc7XG4gICAgIGxpc3RJbnB1dERzZWMuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dERzZWMgaGlkZSc7XG4gICAgIGxpc3RJbnB1dERzZWMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVJdGVtLCBmYWxzZSk7XG4gICAgIGxpc3RJbnB1dERzZWMucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG5cbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQobGlzdElucHV0RHNlYyk7XG5cbiAgICAgY29uc3Qgc3BhblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgc3BhblN2Zy5jbGFzc05hbWUgPSAnc3BhblN2Zyc7XG4gICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdmcnKTtcbiAgICAgaWNvbi5pZCA9IGBpY29uLSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgaWNvbi5jbGFzc05hbWUgPSAnZmFzIGZhLWVsbGlwc2lzLXYgaWNvbic7XG4gICAgIHNwYW5TdmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVJdGVtLCBmYWxzZSk7XG4gICAgIHNwYW5TdmcuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHNwYW5TdmcpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICB9KTtcbiAgIGlmICh0aGlzLmxpc3RJdGVtcyAhPT0gW10pIHtcbiAgICAgY29uc3QgY2xlYXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgY2xlYXJMaW5rLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBjbGVhckxpbmsnO1xuICAgICBjbGVhckxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ0NsZWFyIGFsbCBjb21wbGV0ZWQnKSk7XG4gICAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGNsZWFyTGluayk7XG4gICB9XG4gICByZXR1cm4gbGlzdE1haW47XG4gfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2ZUxpc3QoZSkge1xuICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCAmJiBlLnRhcmdldC5jbGFzc05hbWUgIT09ICd0ZXh0RGVzYycpIHJldHVybiBmYWxzZTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJdGVtJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJyk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZjZjlmOSc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpY29uLSR7dGhpcy5pZCAtIDF9YCkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtdHJhc2ggaWNvbicpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJbnB1dERzZWMnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0ucGFyZW50Tm9kZSAhPT0gdGhpcykge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRleHREZXNjJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlID09PSB0aGlzKSBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBpdGVtLnZhbHVlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5pbm5lckhUTUw7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIH0pO1xuXG4gIGlmICh0aGlzICE9PSBudWxsKSB7XG4gICAgY29uc3QgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICAgbGlzdElucHV0LmlkID0gJ2xpc3RJbnB1dCc7XG4gICAgbGlzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRkSXRlbSwgZmFsc2UpO1xuICAgIGxpc3RJbnB1dC5wbGFjZWhvbGRlciA9ICdBZGQgdG8geW91ciBsaXN0JztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jaGVja3N0YXR1cy5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=