// [AIV]  Undoo Build version: 0.0.0  
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

        this.opts = extend.copy(opts, {
            provider: null,
            maxLength: 20
        });

        this._history = [];
        this._position = 0;
        this._onUpdate = function () {};
    }

    /**
     * @ignore
     * @private
     */


    _createClass(Undoo, [{
        key: '_checkExceeded',
        value: function _checkExceeded() {
            if (this.count() > this.opts.maxLength) this._history = this._history.slice(1, this.count());
        }

        /**
         * @ignore
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_canUndo',
        value: function _canUndo() {
            return this._position > 0;
        }

        /**
         * @ignore
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_canRedo',
        value: function _canRedo() {
            return this._position < this.count();
        }

        /**
         * Save history
         * @param [item] {*}
         * @returns {Undoo}
         */

    }, {
        key: 'save',
        value: function save(item) {

            if (typeof item === 'undefined' && typeof this.opts.provider === 'function') item = this.opts.provider();

            if (typeof item === 'undefined') return this;

            if (this._position < this.count()) this._history = this._history.slice(0, this._position);

            this._history.push(item);
            this._position = this.count();
            this._checkExceeded();
            this._onUpdate.call(null, this.current(), 'save');

            return this;
        }

        /**
         * Clear history
         * @returns {Undoo}
         */

    }, {
        key: 'clear',
        value: function clear() {
            this._history = [];
            this._position = 0;
            this._onUpdate.call(null, null, 'clear');
            return this;
        }

        /**
         * Undo
         * @param callback
         * @returns {Undoo}
         */

    }, {
        key: 'undo',
        value: function undo(callback) {
            if (this._canUndo()) {
                this._position--;
                if (typeof callback === 'function') callback(this.current());
                this._onUpdate.call(null, this.current(), 'undo');
            }
            return this;
        }

        /**
         * Redo
         * @param callback
         * @returns {Undoo}
         */

    }, {
        key: 'redo',
        value: function redo(callback) {
            if (this._canRedo()) {
                this._position++;
                if (typeof callback === 'function') callback(this.current());
                this._onUpdate.call(null, this.current(), 'redo');
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
         * Triggered when history is updated
         * @param callback
         */

    }, {
        key: 'onUpdate',
        value: function onUpdate(callback) {
            this._onUpdate = callback;
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

/***/ })
/******/ ]);
}); 