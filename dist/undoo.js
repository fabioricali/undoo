// [AIV]  Undoo Build version: 0.3.2  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Undoo", [], factory);
	else if(typeof exports === 'object')
		exports["Undoo"] = factory();
	else
		root["Undoo"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = __webpack_require__(2);
var isEqual = __webpack_require__(4);

/**
 * @class
 */

var Undoo = function () {

    /**
     * Create instance
     * @param [opts] {Object} configuration object
     * @param [opts.provider=null] {Function} optional function called on save that returns new state for history
     * @param [opts.maxLength=20] {number} max length history
     */
    function Undoo(opts) {
        _classCallCheck(this, Undoo);

        Object.defineProperties(this, {
            _opts: {
                writable: true
            },
            _history: {
                writable: true
            },
            _position: {
                writable: true
            },
            _onUpdate: {
                writable: true,
                value: function value() {}
            },
            _onBeforeSave: {
                writable: true,
                value: function value() {}
            }
        });

        this._opts = extend.copy(opts, {
            provider: null,
            maxLength: 20
        });

        this._initiliaze();
    }

    /**
     * @ignore
     * @private
     */


    _createClass(Undoo, [{
        key: '_initiliaze',
        value: function _initiliaze() {
            this._history = [];
            this._position = 0;
        }

        /**
         * @ignore
         * @private
         */

    }, {
        key: '_checkMaxLength',
        value: function _checkExceeded() {
            if (this.count() > this._opts.maxLength) this._history = this._history.slice(1, this.count());
        }

        /**
         * Check if undo is available
         * @returns {boolean}
         */

    }, {
        key: 'canUndo',
        value: function canUndo() {
            return this._position > 1;
        }

        /**
         * @Check if redo is available
         * @returns {boolean}
         */

    }, {
        key: 'canRedo',
        value: function canRedo() {
            return this._position < this.count();
        }

        /**
         * ignore
         * @param callback
         * @private
         */

    }, {
        key: 'import',


        /**
         * Import external history
         * @param history {Array}
         * @returns {Undoo}
         */
        value: function _import() {
            var history = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (!Array.isArray(history)) throw new TypeError('Items must be an array');
            this._initiliaze();
            this._history = history;
            this._position = this.count();
            return this;
        }

        /**
         * Get history
         * @returns {Array}
         */

    }, {
        key: 'history',
        value: function history() {
            return this._history;
        }

        /**
         * Save history
         * @param [item] {*}
         * @returns {Undoo}
         */

    }, {
        key: 'save',
        value: function save(item) {

            if (typeof item === 'undefined' && typeof this._opts.provider === 'function') item = this._opts.provider();

            var beforeSave = this._onBeforeSave.call(null, item);

            item = beforeSave || item;

            if (isEqual(item, this.current()) || beforeSave === false) return this;

            if (this._position < this.count()) this._history = this._history.slice(0, this._position);

            if (typeof item !== 'undefined') this._history.push(item);

            this._checkMaxLength();
            this._position = this.count();
            this._onUpdate.call(null, this.current(), 'save', this.history());

            return this;
        }

        /**
         * Clear history
         * @returns {Undoo}
         */

    }, {
        key: 'clear',
        value: function clear() {
            this._initiliaze();
            this._onUpdate.call(null, null, 'clear', this.history());
            return this;
        }

        /**
         * undo callback
         * @callback Undoo~undoCallback
         * @param item {*} current history item
         */

        /**
         * Undo
         * @param [callback] {Undoo~undoCallback} callback function
         * @returns {Undoo}
         */

    }, {
        key: 'undo',
        value: function undo(callback) {
            if (this.canUndo()) {
                this._position--;
                if (typeof callback === 'function') callback(this.current());
                this._onUpdate.call(null, this.current(), 'undo', this.history());
            }
            return this;
        }

        /**
         * redo callback
         * @callback Undoo~redoCallback
         * @param item {*} current history item
         */

        /**
         * Redo
         * @param [callback] {Undoo~redoCallback} callback function
         * @returns {Undoo}
         */

    }, {
        key: 'redo',
        value: function redo(callback) {
            if (this.canRedo()) {
                this._position++;
                if (typeof callback === 'function') callback(this.current());
                this._onUpdate.call(null, this.current(), 'redo', this.history());
            }
            return this;
        }

        /**
         * Get current item in history
         * @returns {*}
         */

    }, {
        key: 'current',
        value: function current() {
            return this.count() ? this._history[this._position - 1] : null;
        }

        /**
         * Count history items
         * @returns {number}
         */

    }, {
        key: 'count',
        value: function count() {
            return this._history.length;
        }

        /**
         * onUpdate callback
         * @callback Undoo~updateCallback
         * @param item {*} current history item
         * @param action {string} action that has called update event. Can be: redo, undo, save, clear
         * @param history {Array} history array
         */

        /**
         * Triggered when history is updated
         * @param callback {Undoo~updateCallback} callback function
         * @returns {Undoo}
         */

    }, {
        key: 'onUpdate',
        value: function onUpdate(callback) {
            Undoo.callbackError(callback);
            this._onUpdate = callback;
            return this;
        }

        /**
         * onBeforeSave callback
         * @callback Undoo~beforeSaveCallback
         * @param item {*} current history item
         */

        /**
         * Triggered before save
         * @param callback {Undoo~beforeSaveCallback} callback function
         * @returns {Undoo}
         * @example
         * // If callback returns `false` the save command will not be executed
         * myHistory.onBeforeSave(()=>false)
         *
         * // You can overwrite item before save
         * myHistory.onBeforeSave((item)=>{
         *      return item.toUpperCase();
         * })
         */

    }, {
        key: 'onBeforeSave',
        value: function onBeforeSave(callback) {
            Undoo.callbackError(callback);
            this._onBeforeSave = callback;
            return this;
        }
    }], [{
        key: 'callbackError',
        value: function callbackError(callback) {
            if (typeof callback !== 'function') throw new TypeError('callback must be a function');
        }
    }]);

    return Undoo;
}();

module.exports = Undoo;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// [AIV]  Defaulty Build version: 2.1.0  
(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["defaulty"] = factory();else root["defaulty"] = factory();
})(typeof self !== 'undefined' ? self : undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = __webpack_require__(1);

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var deepCopy = __webpack_require__(2);

      /**
       * Copies deep missing properties to the target object
       * @param targetObj {Object} target object
       * @param defaultObj {Object} default object
       * @param exclude {Array} exclude properties from copy
       * @returns {*}
       */

      var defaulty = function defaulty(targetObj, defaultObj) {
        var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        for (var i in defaultObj) {
          /* istanbul ignore else  */
          if (defaultObj.hasOwnProperty(i) && exclude.indexOf(i) === -1) {
            if (!targetObj.hasOwnProperty(i) || typeof targetObj[i] === 'undefined') {
              targetObj[i] = defaultObj[i];
            } else if (_typeof(targetObj[i]) === 'object') {
              defaulty(targetObj[i], defaultObj[i]);
            }
          }
        }
        return targetObj;
      };

      /**
       * Creates new target object and copies deep missing properties to the target object
       * @param args[0] {Object} target object
       * @param args[1] {Object} default object
       * @param args[2] {Array} exclude properties from copy
       * @returns {*}
       */
      var copy = function copy() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        //args[0] = Object.assign({}, args[0]);
        args[0] = deepCopy(args[0]);
        return defaulty.apply(undefined, args);
      };

      module.exports = defaulty;
      module.exports.copy = copy;

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      ;(function (name, root, factory) {
        if ((false ? 'undefined' : _typeof(exports)) === 'object') {
          module.exports = factory();
        }
        /* istanbul ignore next */
        else if (true) {
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {
            root[name] = factory();
          }
      })('dcopy', undefined, function () {
        /**
         * Deep copy objects and arrays
         *
         * @param {Object/Array} target
         * @return {Object/Array} copy
         * @api public
         */

        return function (target) {
          if (/number|string|boolean/.test(typeof target === 'undefined' ? 'undefined' : _typeof(target))) {
            return target;
          }
          if (target instanceof Date) {
            return new Date(target.getTime());
          }

          var copy = target instanceof Array ? [] : {};
          walk(target, copy);
          return copy;

          function walk(target, copy) {
            for (var key in target) {
              var obj = target[key];
              if (obj instanceof Date) {
                var value = new Date(obj.getTime());
                add(copy, key, value);
              } else if (obj instanceof Function) {
                var value = obj;
                add(copy, key, value);
              } else if (obj instanceof Array) {
                var value = [];
                var last = add(copy, key, value);
                walk(obj, last);
              } else if (obj instanceof Object) {
                var value = {};
                var last = add(copy, key, value);
                walk(obj, last);
              } else {
                var value = obj;
                add(copy, key, value);
              }
            }
          }
        };

        /**
         * Adds a value to the copy object based on its type
         *
         * @api private
         */

        function add(copy, key, value) {
          if (copy instanceof Array) {
            copy.push(value);
            return copy[copy.length - 1];
          } else if (copy instanceof Object) {
            copy[key] = value;
            return copy[key];
          }
        }
      });

      /***/
    }]
    /******/)
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function equal(a, b) {
  if (a === b) return true;

  var arrA = Array.isArray(a),
      arrB = Array.isArray(b),
      i;

  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (!equal(a[i], b[i])) return false;
    }return true;
  }

  if (arrA != arrB) return false;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;

    for (i = 0; i < keys.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }for (i = 0; i < keys.length; i++) {
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }return true;
  }

  return false;
};

/***/ })
/******/ ]);
}); 