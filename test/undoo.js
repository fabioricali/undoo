const Undoo = require('../');
const be = require('bejs');

describe('Undoo', function () {
    it('current should be return hello', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');

        console.log(myUndo._history);

        be.err(done).equal('hello', myUndo.current());
    });

    it('current should be return world', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');

        be.err(done).equal('world', myUndo.current());
    });

    it('undo should be return hello', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');

        myUndo.undo();

        be.err(done).equal('hello', myUndo.current());
    });

    it('undo and save should be return ciao', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');
        myUndo.undo();
        myUndo.save('ciao');


        be.err.equal('ciao', myUndo.current());
        console.log(myUndo._history);
        be.err(done).equal(['hello', 'ciao'], myUndo._history);
    });

    it('undo, redo and save should be return ciao', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');
        myUndo.undo();
        myUndo.redo();
        myUndo.save('ciao');


        be.err.equal('ciao', myUndo.current());
        console.log(myUndo._history);
        be.err(done).equal(['hello', 'world', 'ciao'], myUndo._history);
    });

    it('2 undo should be return hello', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');
        myUndo.save('ciao');
        myUndo.undo();
        myUndo.undo();
        console.log(myUndo._history);
        be.err.equal('hello', myUndo.current());
        be.err(done).equal([ 'hello', 'world', 'ciao' ], myUndo._history);
    });

});