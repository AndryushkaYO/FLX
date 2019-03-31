var fs = require('fs');

function run(generator) {
    var it = generator(go);

    function go(err, result) {
        if (err) return it.throw(err);
        it.next(result);
    }

    go();
}

run(function*(done) {
    var dirFiles = yield fs.readdir('Nonono', done);
    var firstFile = yield dirFiles[0];
    console.log(firstFile);
});