function addOne(x) {
    return x + 1;
}

function pipe(a) {
    var result = a;
    for (var i = 1; i < arguments.length; i++) {
        result = arguments[i](result);
    }
    return result;
}

alert(pipe(1, addOne));
alert(pipe(1, addOne, addOne));