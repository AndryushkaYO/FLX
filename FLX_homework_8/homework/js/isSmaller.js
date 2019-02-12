function isBigger(a, b){
	return a > b;
}

function isSmaller(a, b){
    if (a === b) {
        return false;
    }
    return !(isBigger(a, b));
}

alert(isSmaller(5,-1));
