/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var filter = __webpack_require__(1);
	var service = __webpack_require__(2);
	var directive = __webpack_require__(3);
	
	module.exports = angular.module('picturify', [filter, service, directive]).name;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular.module('picturify.filter', []).filter('picturify', picturifyFilter).name;
	
	picturifyFilter.$inject = ['$sce'];
	function picturifyFilter($sce) {
	  'use strict';
	
	  return function(text, target, style, n) {
	    target = !target ? '_blank' : target;
	    // style = (!style || style < 0) ? 150 : style;
	    n = (!n || n < 0) ? 0 : n;
	
	    style = style
	          ? typeof style === 'string'
	          ? 'class="' + style + '" '
	          : 'width="' + style + '" '
	          : ''
	          ;
	
	    //((?:data:image\/(?:\s*\S*);base64,(?:(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=))))(?=$|\s)|((?:https?\:\/\/|www\.)+(?![^\s]*?")(?:[\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-]?\.(?:png|jpg|svg|gif|webp|bmp)))(?=$|\s)
	    var regexStr = '((?:data:image\/(?:\\s*\\S*);base64,(?:(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=))))(?=$|\\s)|((?:https?\\:\/\/|www\\.)+(?![^\s]*?")([\\w.,@?!^=%&amp;:\/~+#-]*[\\w@?!^=%&amp;\/~+#-]?\\.(?:png|jpg|svg|gif|webp|bmp)))(?=$|\\s)';
	    var regex = new RegExp(regexStr, n ? 'i' : 'gi');
	
	    var i = 0;
	    do {
	      text = text.replace(regex, '<a href="$&" target="'+ target +'"><img '+ style +'src="$&"/></a>')
	    } while((!n || ++i < n) && regex.test(text));
	
	    // return text;
	    return $sce.trustAsHtml(text);
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var filter = __webpack_require__(1);
	
	module.exports = angular.module('picturify.service', [filter]).service('picturify', picturifyService).name;
	
	
	picturifyService.$inject = ['$filter'];
	function picturifyService($filter) {
	  'use strict';
	
	  return {
	    filter: $filter('picturify')
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var service = __webpack_require__(2);
	
	module.exports = angular.module('picturify.directive', [service]).directive('picturify', picturifyDirective).name;
	
	
	picturifyDirective.$inject = ['picturify'];
	function picturifyDirective(picturify) {
	  'use strict';
	
	  return {
	    restrict: 'A',
	    link: function (scope, element, attrs) {
	
	      var opts = angular.extend({}, scope.$eval(attrs.picturify));
	
	      scope.$watch(function(newVal) {
	        element.html(picturify.filter(element.html(), opts.target,  (opts.class || opts.width), opts.amount));
	      });
	    }
	  };
	}


/***/ }
/******/ ]);
//# sourceMappingURL=angular-picturify.js.map