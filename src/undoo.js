const extend = require('defaulty');

/**
 * @class
 */
class Undoo {

    constructor(opts) {
        this.opts = extend.copy(opts, {
            source: null,
            maxLength: 20
        });

        this._history = [];
        this._position = 0;
        this._onUpdate = () => {
        };
    }

    _checkExceeded() {
        if (this.count() > this.opts.maxLength)
            this._history = this._history.slice(1, this.count());
    }

    _canUndo() {
        return this._position > 0;
    }

    _canRedo() {
        return this._position < this.count();
    }

    /**
     * Save _history
     * @param item
     * @returns {Undoo}
     */
    save(item) {

        if (this._position < this.count()) {
            this._history = this._history.slice(0, this._position);
        }

        this._history.push(item);
        this._position = this.count();

        this._checkExceeded();

        this._onUpdate.call(null, this.current(), 'add');

        return this;
    }

    /**
     * Clear _history
     * @returns {Undoo}
     */
    clear() {
        this._history = [];
        this._position = 0;
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
     * Count _history items
     * @returns {number}
     */
    count() {
        return this._history.length;
    }

    onUpdate(callback) {
        this._onUpdate = callback;
    }
}

module.exports = Undoo;