function isBigger(a,b){
	return a>b;
}

function isSmaller(a,b){
	return !(isBigger(a,b));
}

alert(isSmaller(5,-1));