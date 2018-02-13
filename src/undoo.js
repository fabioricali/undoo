const extend = require('defaulty');

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
        this.opts = extend.copy(opts, {
            provider: null,
            maxLength: 20
        });

        this._history = [];
        this._position = 0;
        this._onUpdate = () => {
        };
    }

    /**
     * @ignore
     * @private
     */
    _checkExceeded() {
        if (this.count() > this.opts.maxLength)
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
     * Save history
     * @param [item] {*}
     * @returns {Undoo}
     */
    save(item) {

        if (typeof item === 'undefined' && typeof this.opts.provider === 'function')
            item = this.opts.provider();

        if (typeof item === 'undefined')
            return this;

        if (this._position < this.count())
            this._history = this._history.slice(0, this._position);

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
     * Redo
     * @param callback
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
     * Triggered when history is updated
     * @param callback
     */
    onUpdate(callback) {
        this._onUpdate = callback;
    }
}

module.exports = Undoo;