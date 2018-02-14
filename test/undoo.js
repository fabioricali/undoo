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

    it('save 3 times the same thing, should be every 1 item', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('hello');
        myUndo.save('hello');
        console.log(myUndo._history);
        be.err.equal('hello', myUndo.current());
        be.err(done).equal(['hello'], myUndo._history);
    });

    it('provider should be return hello', function (done) {
        const myUndo = new Undoo({
            provider: ()=> 'hello'
        });

        myUndo.save();

        console.log(myUndo._history);
        be.err.equal('hello', myUndo.current());
        be.err(done).equal([ 'hello' ], myUndo._history);
    });

    it('2 undo and empty save should be return hello', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');
        myUndo.save('ciao');
        myUndo.undo();
        myUndo.undo();
        myUndo.save();
        console.log(myUndo._history);
        be.err.equal('hello', myUndo.current());
        be.err(done).equal([ 'hello'], myUndo._history);
    });

    it('2 undo and empty save should be return bau', function (done) {
        const myUndo = new Undoo();

        myUndo.save('hello');
        myUndo.save('world');
        myUndo.save('ciao');
        myUndo.undo();
        myUndo.undo();
        myUndo.save();
        myUndo.save('bau');
        console.log(myUndo._history);
        be.err.equal('bau', myUndo.current());
        be.err(done).equal(['hello', 'bau'], myUndo._history);
    });

    it('maxLength set to 5 should be return foo', function (done) {
        const myUndo = new Undoo({
            maxLength: 5
        });

        myUndo.save('hello');
        myUndo.save('world');
        myUndo.save('ciao');
        myUndo.save('miao');
        myUndo.save('bau');
        myUndo.save('foo');
        console.log(myUndo);
        be.err.equal('foo', myUndo.current());
        be.err(done).equal([ 'world', 'ciao', 'miao', 'bau', 'foo' ], myUndo._history);
    });

    it('import and history', function (done) {
        const myUndo = new Undoo();

        myUndo.import([ 'world', 'ciao', 'miao', 'bau', 'foo' ]);

        console.log(myUndo.count());
        be.err.equal('foo', myUndo.current());
        be.err(done).equal([ 'world', 'ciao', 'miao', 'bau', 'foo' ], myUndo.history());
    });

    it('import with error', function (done) {
        const myUndo = new Undoo();

        try {
            myUndo.import({a: 1});
        } catch (e) {
            done();
        }
    });
});