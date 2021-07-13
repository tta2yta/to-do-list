/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!*************************!*\
  !*** ./src/todolist.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList)
/* harmony export */ });
class ToDoList {
  constructor() {
    this.listItems = [
      { decription: 'Double-tap to edit', completed: false, index: 1 },
      { decription: "Drag 'n drop to reorder your list", completed: false, index: 2 },
      { decription: 'Manage all your lists in one place', completed: false, index: 3 },
      { decription: 'Resync to clear out the old', completed: false, index: 4 },
    ];
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

   this.listItems.forEach((item, index) => {
     const listItem = document.createElement('li');
     const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.name = `checkbox-${index}`;
     checkbox.value = 'value';
     checkbox.id = `checkbox-${index}`;
     listItem.id = item.index;
     listItem.className = 'listItem';
     listItem.appendChild(checkbox);
     listItem.appendChild(document.createTextNode(item.decription));
     const icon = document.createElement('i');
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90b2RvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOZTtBQUNmO0FBQ0E7QUFDQSxPQUFPLCtEQUErRDtBQUN0RSxPQUFPLDhFQUE4RTtBQUNyRixPQUFPLCtFQUErRTtBQUN0RixPQUFPLHdFQUF3RTtBQUMvRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsTUFBTTtBQUN2QztBQUNBLCtCQUErQixNQUFNO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoidG9kb2xpc3QuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGlzdEl0ZW1zID0gW1xuICAgICAgeyBkZWNyaXB0aW9uOiAnRG91YmxlLXRhcCB0byBlZGl0JywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDEgfSxcbiAgICAgIHsgZGVjcmlwdGlvbjogXCJEcmFnICduIGRyb3AgdG8gcmVvcmRlciB5b3VyIGxpc3RcIiwgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDIgfSxcbiAgICAgIHsgZGVjcmlwdGlvbjogJ01hbmFnZSBhbGwgeW91ciBsaXN0cyBpbiBvbmUgcGxhY2UnLCBjb21wbGV0ZWQ6IGZhbHNlLCBpbmRleDogMyB9LFxuICAgICAgeyBkZWNyaXB0aW9uOiAnUmVzeW5jIHRvIGNsZWFyIG91dCB0aGUgb2xkJywgY29tcGxldGVkOiBmYWxzZSwgaW5kZXg6IDQgfSxcbiAgICBdO1xuICB9XG5cbiBkaXNwbGF5SXRlbXM9KCkgPT4ge1xuICAgY29uc3QgbGlzdE1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgY29uc3QgbGlzdEl0ZW1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICBjb25zdCBpY29uUmVmcmVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGNvbnN0IGljb25FbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgIGljb25SZWZyZXNoLmNsYXNzTmFtZSA9ICdmYXMgZmEtc3luYyBpY29uUmVmcmVzaCc7XG4gICBpY29uRW50ZXIuY2xhc3NOYW1lID0gJ2ZhcyBmYS1wZW4gaWNvbkVudGVyJztcbiAgIGxpc3RJdGVtVGl0bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RvIERvIExpc3QnKSk7XG4gICBsaXN0SXRlbVRpdGxlLmFwcGVuZENoaWxkKGljb25SZWZyZXNoKTtcbiAgIGNvbnN0IGxpc3RJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgbGlzdEl0ZW1JbnB1dC5jbGFzc05hbWUgPSAnbGlzdEl0ZW1JbnB1dCc7XG4gICBjb25zdCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICBsaXN0SW5wdXQuY2xhc3NOYW1lID0gJ2xpc3RJbnB1dCc7XG4gICBsaXN0SW5wdXQucGxhY2Vob2xkZXIgPSAnQWRkIHRvIHlvdXIgbGlzdCc7XG4gICBsaXN0SXRlbUlucHV0LmFwcGVuZENoaWxkKGljb25FbnRlcik7XG4gICBsaXN0SXRlbVRpdGxlLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSBsaXN0SXRlbVRpdGxlJztcbiAgIGxpc3RJdGVtSW5wdXQuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgIGxpc3RNYWluLmFwcGVuZENoaWxkKGxpc3RJdGVtVGl0bGUpO1xuICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW1JbnB1dCk7XG5cbiAgIHRoaXMubGlzdEl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgY2hlY2tib3gubmFtZSA9IGBjaGVja2JveC0ke2luZGV4fWA7XG4gICAgIGNoZWNrYm94LnZhbHVlID0gJ3ZhbHVlJztcbiAgICAgY2hlY2tib3guaWQgPSBgY2hlY2tib3gtJHtpbmRleH1gO1xuICAgICBsaXN0SXRlbS5pZCA9IGl0ZW0uaW5kZXg7XG4gICAgIGxpc3RJdGVtLmNsYXNzTmFtZSA9ICdsaXN0SXRlbSc7XG4gICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS5kZWNyaXB0aW9uKSk7XG4gICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgIGljb24uY2xhc3NOYW1lID0gJ2ZhcyBmYS1lbGxpcHNpcy12IGljb24nO1xuICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgbGlzdE1haW4uYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgfSk7XG4gICBpZiAodGhpcy5saXN0SXRlbXMgIT09IFtdKSB7XG4gICAgIGNvbnN0IGNsZWFyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgIGNsZWFyTGluay5jbGFzc05hbWUgPSAnbGlzdEl0ZW0gY2xlYXJMaW5rJztcbiAgICAgY2xlYXJMaW5rLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDbGVhciBhbGwgY29tcGxldGVkJykpO1xuICAgICBsaXN0TWFpbi5hcHBlbmRDaGlsZChjbGVhckxpbmspO1xuICAgfVxuICAgcmV0dXJuIGxpc3RNYWluO1xuIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9