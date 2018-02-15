const extend = require('defaulty');
const isEqual = require('fast-deep-equal');

/**
 * @class
 */
class Undoo {

    /**
     * Create instance
     * @param [opts] {Object} configuration object
     * @param [opts.provider=null] {Function} optional function called on save that returns new state for history
     * @param [opts.maxLength=20] {number} max length history
     */
    constructor(opts) {

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
                value: ()=>{}
            },
            _onBeforeSave: {
                writable: true,
                value: ()=>{}
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
    _initiliaze() {
        this._history = [];
        this._position = 0;
    }

    /**
     * @ignore
     * @private
     */
    _checkExceeded() {
        if (this.count() > this._opts.maxLength)
            this._history = this._history.slice(1, this.count());
    }

    /**
     * @ignore
     * @returns {boolean}
     * @private
     */
    _canUndo() {
        return this._position > 0;
    }

    /**
     * @ignore
     * @returns {boolean}
     * @private
     */
    _canRedo() {
        return this._position < this.count();
    }

    /**
     * ignore
     * @param callback
     * @private
     */
    static callbackError(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('callback must be a function');
    }

    /**
     * Import external history
     * @param history {Array}
     * @returns {Undoo}
     */
    import(history = []) {
        if(!Array.isArray(history))
            throw new TypeError('Items must be an array');
        this._initiliaze();
        this._history = history;
        this._position = this.count();
        return this;
    }

    /**
     * Get history
     * @returns {Array}
     */
    history() {
        return this._history;
    }

    /**
     * Save history
     * @param [item] {*}
     * @returns {Undoo}
     */
    save(item) {

        if (typeof item === 'undefined' && typeof this._opts.provider === 'function')
            item = this._opts.provider();

        let beforeSave = this._onBeforeSave.call(null, item);

        item = beforeSave || item;

        if (isEqual(item, this.current()) || beforeSave === false)
            return this;

        if (this._position < this.count())
            this._history = this._history.slice(0, this._position);

        if (typeof item !== 'undefined')
            this._history.push(item);

        this._checkExceeded();
        this._position = this.count();
        this._onUpdate.call(null, this.current(), 'save');

        return this;
    }

    /**
     * Clear history
     * @returns {Undoo}
     */
    clear() {
        this._initiliaze();
        this._onUpdate.call(null, null, 'clear');
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
    undo(callback) {
        if (this._canUndo()) {
            this._position--;
            if (typeof callback === 'function')
                callback(this.current());
            this._onUpdate.call(null, this.current(), 'undo');
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
    redo(callback) {
        if (this._canRedo()) {
            this._position++;
            if (typeof callback === 'function')
                callback(this.current());
            this._onUpdate.call(null, this.current(), 'redo');
        }
        return this;
    }

    /**
     * Get current item in history
     * @returns {*}
     */
    current() {
        return this.count() ? this._history[this._position - 1] : null;
    }

    /**
     * Count history items
     * @returns {number}
     */
    count() {
        return this._history.length;
    }

    /**
     * onUpdate callback
     * @callback Undoo~updateCallback
     * @param item {*} current history item
     * @param action {string} action that has called update event. Can be: redo, undo, save, clear
     */

    /**
     * Triggered when history is updated
     * @param callback {Undoo~updateCallback} callback function
     * @returns {Undoo}
     */
    onUpdate(callback) {
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
    onBeforeSave(callback) {
        Undoo.callbackError(callback);
        this._onBeforeSave = callback;
        return this;
    }

}

module.exports = Undoo;