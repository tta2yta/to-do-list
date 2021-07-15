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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/checkstatus.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2NoZWNrc3RhdHVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDOztBQUVsQztBQUNBLHNCQUFzQiw4Q0FBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDhDQUFRO0FBQzlCO0FBQ0E7QUFDQSw4QkFBOEIsdUJBQXVCO0FBQ3JEO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0Esc0RBQXNELHVCQUF1QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRThEOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlDZDs7QUFFakM7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUywrREFBK0Q7QUFDeEUsU0FBUyw4RUFBOEU7QUFDdkYsU0FBUywrRUFBK0U7QUFDeEYsU0FBUyx3RUFBd0U7QUFDakY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBLCtCQUErQixlQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlEQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxrQ0FBa0MsWUFBWTtBQUM5QyxDOzs7Ozs7VUN0R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImNoZWNrc3RhdHVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb0RvTGlzdCBmcm9tICcuL3RvZG9saXN0JztcblxuZnVuY3Rpb24gY2hlY2tDb21wbGV0ZSgpIHtcbiAgY29uc3QgbGlzdE9iaiA9IG5ldyBUb0RvTGlzdCgpO1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuY2hlY2tlZCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICBjb25zdCB0aGlja1N5YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlja1N5Yi5jbGFzc05hbWUgPSAndGhpY2tTeWInO1xuICAgIHRoaWNrU3liLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5DaGVja0NvbXBsZXRlLCBmYWxzZSk7XG4gICAgY29uc3QgdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCfinJQgJyk7XG4gICAgdGhpY2tTeWIuYXBwZW5kQ2hpbGQodCk7XG4gICAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgICBjb25zdCBvYmpJbmRleCA9IGxpc3RPYmoubGlzdEl0ZW1zLmZpbmRJbmRleCgoKG9iaikgPT4gcGFyc2VJbnQob2JqLmluZGV4LCAxMCkgPT09IHBhcnNlSW50KHRoaXMucGFyZW50Tm9kZS5pZCwgMTApKSk7XG4gICAgbGlzdE9iai5saXN0SXRlbXNbb2JqSW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgbGlzdE9iai5zZXRMaXN0SXRlbXMobGlzdE9iai5saXN0SXRlbXMpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpY2tTeWIsIHRoaXMpO1xuICB9IGVsc2Uge1xuICAgIGxpc3RPYmouZ2V0TGlzdEl0bWVzKCk7XG4gICAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICAgIGxpc3RPYmoubGlzdEl0ZW1zW29iakluZGV4XS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5DaGVja0NvbXBsZXRlKCkge1xuICBjb25zdCBsaXN0T2JqID0gbmV3IFRvRG9MaXN0KCk7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGNoZWNrYm94Lm5hbWUgPSBgY2hlY2tib3gtJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHt0aGlzLnBhcmVudE5vZGUuaWQgLSAxfWA7XG4gIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGV4dERlc2MnKS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5pY29uJykuaWQgPSBgaWNvbi0ke3RoaXMucGFyZW50Tm9kZS5pZCAtIDF9YDtcbiAgbGlzdE9iai5nZXRMaXN0SXRtZXMoKTtcbiAgY29uc3Qgb2JqSW5kZXggPSBsaXN0T2JqLmxpc3RJdGVtcy5maW5kSW5kZXgoKChvYmopID0+IHBhcnNlSW50KG9iai5pbmRleCwgMTApID09PSBwYXJzZUludCh0aGlzLnBhcmVudE5vZGUuaWQsIDEwKSkpO1xuICBsaXN0T2JqLmxpc3RJdGVtc1tvYmpJbmRleF0uY29tcGxldGVkID0gZmFsc2U7XG4gIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2hlY2tib3gsIHRoaXMpO1xuICBsaXN0T2JqLnNldExpc3RJdGVtcyhsaXN0T2JqLmxpc3RJdGVtcyk7XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja2JveGhhbmRsZXIoZWxlbSkge1xuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xufVxuXG5leHBvcnQgeyBjaGVja0NvbXBsZXRlLCB1bkNoZWNrQ29tcGxldGUsIGFkZENoZWNrYm94aGFuZGxlciB9O1xuIiwiaW1wb3J0IHsgdW5DaGVja0NvbXBsZXRlIH0gZnJvbSAnLi9jaGVja3N0YXR1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5saXN0SXRlbXMgPSBbXTtcbiAgfVxuXG4gIHNldExpc3RJdGVtcyhvYmogPSBudWxsKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9saXN0JywgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH1cblxuICBnZXRMaXN0SXRtZXM9KCkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9saXN0JykpO1xuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgIHRoaXMubGlzdEl0ZW1zID0gW1xuICAgICAgICB7IGRlY3JpcHRpb246ICdEb3VibGUtdGFwIHRvIGVkaXQnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMSB9LFxuICAgICAgICB7IGRlY3JpcHRpb246IFwiRHJhZyAnbiBkcm9wIHRvIHJlb3JkZXIgeW91ciBsaXN0XCIsIGNvbXBsZXRlZDogZmFsc2UsIGluZGV4OiAyIH0sXG4gICAgICAgIHsgZGVjcmlwdGlvbjogJ01hbmFnZSBhbGwgeW91ciBsaXN0cyBpbiBvbmUgcGxhY2UnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMyB9LFxuICAgICAgICB7IGRlY3JpcHRpb246ICdSZXN5bmMgdG8gY2xlYXIgb3V0IHRoZSBvbGQnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogNCB9LFxuICAgICAgXTtcbiAgICAgIHRoaXMuc2V0TGlzdEl0ZW1zKHRoaXMubGlzdEl0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFwcGVkRGF0YUFycmF5ID0gW107XG4gICAgICBPYmplY3Qua2V5cyhvYmopLm1hcCgoa2V5KSA9PiAobWFwcGVkRGF0YUFycmF5LnB1c2gob2JqW2tleV0pKSk7XG5cbiAgICAgIHRoaXMubGlzdEl0ZW1zID0gbWFwcGVkRGF0YUFycmF5O1xuICAgIH1cbiAgfVxuXG4gZGlzcGxheUl0ZW1zPSgpID0+IHtcbiAgIGNvbnN0IGxpc3RNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgIGNvbnN0IGxpc3RJdGVtVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgY29uc3QgaWNvblJlZnJlc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICBjb25zdCBpY29uRW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICBpY29uUmVmcmVzaC5jbGFzc05hbWUgPSAnZmFzIGZhLXN5bmMgaWNvblJlZnJlc2gnO1xuICAgaWNvbkVudGVyLmNsYXNzTmFtZSA9ICdmYXMgZmEtcGVuIGljb25FbnRlcic7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUbyBEbyBMaXN0JykpO1xuICAgbGlzdEl0ZW1UaXRsZS5hcHBlbmRDaGlsZChpY29uUmVmcmVzaCk7XG4gICBjb25zdCBsaXN0SXRlbUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgIGxpc3RJdGVtSW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJdGVtSW5wdXQnO1xuICAgY29uc3QgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgIGxpc3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgbGlzdElucHV0LmNsYXNzTmFtZSA9ICdsaXN0SW5wdXQnO1xuICAgbGlzdElucHV0LnBsYWNlaG9sZGVyID0gJ0FkZCB0byB5b3VyIGxpc3QnO1xuICAgbGlzdEl0ZW1JbnB1dC5hcHBlbmRDaGlsZChpY29uRW50ZXIpO1xuICAgbGlzdEl0ZW1UaXRsZS5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gbGlzdEl0ZW1UaXRsZSc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGxpc3RJbnB1dCk7XG4gICBsaXN0TWFpbi5hcHBlbmRDaGlsZChsaXN0SXRlbVRpdGxlKTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtSW5wdXQpO1xuICAgdGhpcy5saXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgIGNoZWNrYm94Lm5hbWUgPSBgY2hlY2tib3gtJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBjaGVja2JveC52YWx1ZSA9ICd2YWx1ZSc7XG4gICAgIGNoZWNrYm94LmlkID0gYGNoZWNrYm94LSR7aXRlbS5pbmRleCAtIDF9YDtcbiAgICAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgICAgaWYgKGl0ZW0uY29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICAgY29uc3QgdGhpY2tTeWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgdGhpY2tTeWIuY2xhc3NOYW1lID0gJ3RoaWNrU3liJztcbiAgICAgICB0aGlja1N5Yi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuQ2hlY2tDb21wbGV0ZSwgZmFsc2UpO1xuICAgICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgn4pyUICcpO1xuICAgICAgIHRoaWNrU3liLmFwcGVuZENoaWxkKHQpO1xuICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRoaWNrU3liKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICB9XG4gICAgIGxpc3RJdGVtLmlkID0gaXRlbS5pbmRleDtcbiAgICAgbGlzdEl0ZW0uZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgbGlzdEl0ZW0uY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGxpc3RJdGVtRHJhZyc7XG4gICAgIGxpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWN0aXZlTGlzdCwgZmFsc2UpO1xuXG4gICAgIGNvbnN0IHRleHREZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICB0ZXh0RGVzYy5jbGFzc05hbWUgPSAndGV4dERlc2MnO1xuICAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5kZWNyaXB0aW9uKTtcbiAgICAgdGV4dERlc2MuYXBwZW5kQ2hpbGQodCk7XG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRleHREZXNjKTtcbiAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xuICAgICBpY29uLmlkID0gYGljb24tJHtpdGVtLmluZGV4IC0gMX1gO1xuICAgICBpY29uLmNsYXNzTmFtZSA9ICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJztcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgIH0pO1xuICAgaWYgKHRoaXMubGlzdEl0ZW1zICE9PSBbXSkge1xuICAgICBjb25zdCBjbGVhckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICBjbGVhckxpbmsuY2xhc3NOYW1lID0gJ2xpc3RJdGVtIGNsZWFyTGluayc7XG4gICAgIGNsZWFyTGluay5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnQ2xlYXIgYWxsIGNvbXBsZXRlZCcpKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQoY2xlYXJMaW5rKTtcbiAgIH1cbiAgIHJldHVybiBsaXN0TWFpbjtcbiB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWN0aXZlTGlzdCgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RJdGVtJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pY29uJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtZWxsaXBzaXMtdiBpY29uJyk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZjZjlmOSc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpY29uLSR7dGhpcy5pZCAtIDF9YCkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYXMgZmEtdHJhc2ggaWNvbicpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY2hlY2tzdGF0dXMuanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9