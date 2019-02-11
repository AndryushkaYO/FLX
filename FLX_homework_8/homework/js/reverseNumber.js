function reverseNumber(a) {
    var reverse = "";
    var negative = false;
    if (a < 0) {
        negative = true;
        a = a * -1;
    }
    do {
        if (!isNaN(a)) {
            reverse += a % 10;
            a = parseInt(a / 10);
        }
    }
    while (a !== 0);
    if (negative) {
        return (parseInt("-" + reverse));
    }
    return parseInt(reverse);
}

alert(reverseNumber(123));
alert(reverseNumber(-456));
alert(reverseNumber(10000));