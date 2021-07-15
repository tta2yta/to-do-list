/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
     const icon = document.createElement('svg');
     icon.id = `icon-${item.index - 1}`;
     icon.className = 'fas fa-ellipsis-v icon';
     listItem.appendChild(icon);
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
function activeList() {
  document.querySelectorAll('.listItem').forEach((item) => {
    item.style.backgroundColor = 'white';
  });
  document.querySelectorAll('.icon').forEach((item) => {
    item.setAttribute('class', 'fas fa-ellipsis-v icon');
  });
  document.getElementById(this.id).style.backgroundColor = '#fcf9f9';
  document.getElementById(`icon-${this.id - 1}`).setAttribute('class', 'fas fa-trash icon');
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
  if (elem.querySelector('.checkbox') !== null) {
    elem.querySelector('.checkbox').addEventListener('click', _checkstatus__WEBPACK_IMPORTED_MODULE_0__.checkComplete, false);
  }
  if (elem.querySelector('.thickSyb') !== null) {
    elem.querySelector('.thickSyb').addEventListener('click', _checkstatus__WEBPACK_IMPORTED_MODULE_0__.unCheckComplete, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc29ydGluZ2l0ZW1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDOztBQUVsQztBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDhDQUFRO0FBQzlCO0FBQ0E7QUFDQSw4QkFBOEIsdUJBQXVCO0FBQ3JEO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0Esc0RBQXNELHVCQUF1QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRThEOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlDZDs7QUFFakM7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUywrREFBK0Q7QUFDeEUsU0FBUyw4RUFBOEU7QUFDdkYsU0FBUywrRUFBK0U7QUFDeEYsU0FBUyx3RUFBd0U7QUFDakY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlEQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxrQ0FBa0MsWUFBWTtBQUM5QyxDOzs7Ozs7VUN0R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTitEO0FBQ2I7O0FBRWxELGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTTtBQUNmLFNBQVMsU0FBUztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpREFBVTtBQUMzQztBQUNBLDhEQUE4RCx1REFBYTtBQUMzRTtBQUNBO0FBQ0EsOERBQThELHlEQUFlO0FBQzdFO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsOENBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUJBQWlCLGlGQUFpRjtBQUNsRztBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RCxHQUFHO0FBQ0g7QUFDQSIsImZpbGUiOiJzb3J0aW5naXRlbXMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnO1xuXG5mdW5jdGlvbiBjaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5jaGVja2VkKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgIGNvbnN0IHRoaWNrU3liID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaWNrU3liLmNsYXNzTmFtZSA9ICd0aGlja1N5Yic7XG4gICAgdGhpY2tTeWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bkNoZWNrQ29tcGxldGUsIGZhbHNlKTtcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ+KclCAnKTtcbiAgICB0aGlja1N5Yi5hcHBlbmRDaGlsZCh0KTtcbiAgICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBwYXJzZUludChvYmouaW5kZXgsIDEwKSA9PT0gcGFyc2VJbnQodGhpcy5wYXJlbnROb2RlLmlkLCAxMCkpKTtcbiAgICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0aGlja1N5YiwgdGhpcyk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bkNoZWNrQ29tcGxldGUoKSB7XG4gIGNvbnN0IGxpc3RPYmogPSBuZXcgVG9Eb0xpc3QoKTtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3gudmFsdWUgPSAndmFsdWUnO1xuICBjaGVja2JveC5pZCA9IGBjaGVja2JveC0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0RGVzYycpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmljb24nKS5pZCA9IGBpY29uLSR7dGhpcy5wYXJlbnROb2RlLmlkIC0gMX1gO1xuICBsaXN0T2JqLmdldExpc3RJdG1lcygpO1xuICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjaGVja2JveCwgdGhpcyk7XG4gIGxpc3RPYmouc2V0TGlzdEl0ZW1zKGxpc3RPYmoubGlzdEl0ZW1zKTtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGFkZENoZWNrYm94aGFuZGxlcihlbGVtKSB7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG59XG5cbmV4cG9ydCB7IGNoZWNrQ29tcGxldGUsIHVuQ2hlY2tDb21wbGV0ZSwgYWRkQ2hlY2tib3hoYW5kbGVyIH07XG4iLCJpbXBvcnQgeyB1bkNoZWNrQ29tcGxldGUgfSBmcm9tICcuL2NoZWNrc3RhdHVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RJdGVtcyA9IFtdO1xuICB9XG5cbiAgc2V0TGlzdEl0ZW1zKG9iaiA9IG51bGwpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb2xpc3QnLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfVxuXG4gIGdldExpc3RJdG1lcz0oKSA9PiB7XG4gICAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb2xpc3QnKSk7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5saXN0SXRlbXMgPSBbXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ0RvdWJsZS10YXAgdG8gZWRpdCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAxIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogXCJEcmFnICduIGRyb3AgdG8gcmVvcmRlciB5b3VyIGxpc3RcIiwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDIgfSxcbiAgICAgICAgeyBkZWNyaXB0aW9uOiAnTWFuYWdlIGFsbCB5b3VyIGxpc3RzIGluIG9uZSBwbGFjZScsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAzIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ1Jlc3luYyB0byBjbGVhciBvdXQgdGhlIG9sZCcsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiA0IH0sXG4gICAgICBdO1xuICAgICAgdGhpcy5zZXRMaXN0SXRlbXModGhpcy5saXN0SXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXBwZWREYXRhQXJyYXkgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+IChtYXBwZWREYXRhQXJyYXkucHVzaChvYmpba2V5XSkpKTtcblxuICAgICAgdGhpcy5saXN0SXRlbXMgPSBtYXBwZWREYXRhQXJyYXk7XG4gICAgfVxuICB9XG5cbiBkaXNwbGF5SXRlbXM9KCkgPT4ge1xuICAgY29uc3QgbGlzdE1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgY29uc3QgbGlzdEl0ZW1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBjb25zdCBpY29uUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGNvbnN0IGljb25FbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGljb25SZWZyZXNoLmNsYXNzTmFtZSA9ICdmYXMgZmEtc3luYyBpY29uUmVmcmVzaCc7XG4gICBpY29uRW50ZXIuY2xhc3NOYW1lID0gJ2ZhcyBmYS1wZW4gaWNvbkVudGVyJztcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RvIERvIExpc3QnKSk7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGljb25SZWZyZXNoKTtcbiAgIGNvbnN0IGxpc3RJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgbGlzdEl0ZW1JbnB1dC5jbGFzc05hbWUgPSAnbGlzdEl0ZW1JbnB1dCc7XG4gICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGljb25FbnRlcik7XG4gICBsaXN0SXRlbVRpdGxlLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbVRpdGxlJztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtVGl0bGUpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1JbnB1dCk7XG4gICB0aGlzLmxpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBjaGVja2JveC5jbGFzc05hbWUgPSAnY2hlY2tib3gnO1xuICAgICBpZiAoaXRlbS5jb21wbGV0ZWQgPT09IHRydWUpIHtcbiAgICAgICBjb25zdCB0aGlja1N5YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICB0aGlja1N5Yi5jbGFzc05hbWUgPSAndGhpY2tTeWInO1xuICAgICAgIHRoaWNrU3liLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gICAgICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCfinJQgJyk7XG4gICAgICAgdGhpY2tTeWIuYXBwZW5kQ2hpbGQodCk7XG4gICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGhpY2tTeWIpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgIH1cbiAgICAgbGlzdEl0ZW0uaWQgPSBpdGVtLmluZGV4O1xuICAgICBsaXN0SXRlbS5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICBsaXN0SXRlbS5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gbGlzdEl0ZW1EcmFnJztcbiAgICAgbGlzdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhY3RpdmVMaXN0LCBmYWxzZSk7XG5cbiAgICAgY29uc3QgdGV4dERlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgIHRleHREZXNjLmNsYXNzTmFtZSA9ICd0ZXh0RGVzYyc7XG4gICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLmRlY3JpcHRpb24pO1xuICAgICB0ZXh0RGVzYy5hcHBlbmRDaGlsZCh0KTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodGV4dERlc2MpO1xuICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgIGljb24uaWQgPSBgaWNvbi0ke2l0ZW0uaW5kZXggLSAxfWA7XG4gICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgfSk7XG4gICBpZiAodGhpcy5saXN0SXRlbXMgIT09IFtdKSB7XG4gICAgIGNvbnN0IGNsZWFyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNsZWFyTGluay5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gY2xlYXJMaW5rJztcbiAgICAgY2xlYXJMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDbGVhciBhbGwgY29tcGxldGVkJykpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChjbGVhckxpbmspO1xuICAgfVxuICAgcmV0dXJuIGxpc3RNYWluO1xuIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmVMaXN0KCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdEl0ZW0nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmljb24nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nKTtcbiAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmNmOWY5JztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGljb24tJHt0aGlzLmlkIC0gMX1gKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhcyBmYS10cmFzaCBpY29uJyk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjaGVja0NvbXBsZXRlLCB1bkNoZWNrQ29tcGxldGUgfSBmcm9tICcuL2NoZWNrc3RhdHVzJztcbmltcG9ydCBUb0RvTGlzdCwgeyBhY3RpdmVMaXN0IH0gZnJvbSAnLi90b2RvbGlzdCc7XG5cbmNvbnN0IGN1ck9iaiA9IHsgY3VycjogbnVsbCB9O1xuXG5mdW5jdGlvbiBoYW5kZWxEcmFnU3RhcnQoZXYpIHtcbiAgY3VyT2JqLmN1cnIgPSB0aGlzO1xuICBldi5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvSFRNTCcsIHRoaXMub3V0ZXJIVE1MKTtcbiAgdGhpcy5jbGFzc0xpc3QuYWRkKCdkcmFnRWxlbScpO1xufVxuXG5mdW5jdGlvbiBkcmFnSGFuZGVsZXIoZXYpIHtcbiAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgZXYuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gIGNvbnN0IHsgdG9wIH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB7IGJvdHRvbSB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgaWYgKGV2LmNsaWVudFkgPCAodG9wICsgYm90dG9tKSAvIDIpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ292ZXItYmVmb3JlJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWFmdGVyJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdvdmVyLWFmdGVyJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWJlZm9yZScpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZHJvcEhhbmRsZXIoZXYpIHtcbiAgaWYgKGV2LnN0b3BQcm9wYWdhdGlvbikge1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgaWYgKGN1ck9iai5jdXJyICE9PSB0aGlzKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGN1ck9iai5jdXJyKTtcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXItYmVmb3JlJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L2h0bWwnKSk7XG4gICAgICBhZGRIYW5kbGVycyh0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXItYWZ0ZXInKSkge1xuICAgICAgdGhpcy5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvaHRtbCcpKTtcbiAgICAgIGFkZEhhbmRsZXJzKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICB9XG4gICAgVXBkYXRlTGlzdEluZGV4KCk7XG4gIH1cbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWJlZm9yZScpO1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYWZ0ZXInKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoKSB7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1iZWZvcmUnKTtcbiAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyLWFmdGVyJyk7XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnRW5kKCkge1xuICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXItYmVmb3JlJyk7XG4gIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1hZnRlcicpO1xufVxuXG5mdW5jdGlvbiBhZGRIYW5kbGVycyhlbGVtKSB7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgaGFuZGVsRHJhZ1N0YXJ0LCBmYWxzZSk7XG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnSGFuZGVsZXIsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBoYW5kbGVEcmFnTGVhdmUsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcEhhbmRsZXIsIGZhbHNlKTtcbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgaGFuZGxlRHJhZ0VuZCwgZmFsc2UpO1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWN0aXZlTGlzdCwgZmFsc2UpO1xuICBpZiAoZWxlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKSAhPT0gbnVsbCkge1xuICAgIGVsZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW0ucXVlcnlTZWxlY3RvcignLnRoaWNrU3liJykgIT09IG51bGwpIHtcbiAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy50aGlja1N5YicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVXBkYXRlTGlzdEluZGV4KCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgY29uc3QgbmV3T2JqID0gW107XG4gIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0SXRlbURyYWcnKS5mb3JFYWNoKChpdGVtLCBpbmRleFBvcykgPT4ge1xuICAgIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpID09PSBudWxsKSB7XG4gICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKS5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZXdPYmoucHVzaCh7IGRlY3JpcHRpb246IGl0ZW0udGV4dENvbnRlbnQucmVwbGFjZSgn4pyUICcsICcnKSwgY29tcGxldGVkLCBpbmRleDogaW5kZXhQb3MgKyAxIH0pO1xuICAgIGNvbnN0IG9iakluZGV4ID0gbGlzdE9iai5saXN0SXRlbXMuZmluZEluZGV4KCgob2JqKSA9PiBvYmouaW5kZXggPT09IHBhcnNlSW50KGl0ZW0uaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5pbmRleCA9IGluZGV4UG9zICsgMTtcbiAgICBpdGVtLmlkID0gaW5kZXhQb3MgKyAxO1xuICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLmljb24nKS5pZCA9IGBpY29uLSR7aW5kZXhQb3N9YDtcbiAgfSk7XG4gIGxpc3RPYmouc2V0TGlzdEl0ZW1zKG5ld09iaik7XG59XG5cbmV4cG9ydCB7XG4gIGhhbmRlbERyYWdTdGFydCwgZHJhZ0hhbmRlbGVyLCBkcm9wSGFuZGxlciwgYWRkSGFuZGxlcnMsXG59OyJdLCJzb3VyY2VSb290IjoiIn0=