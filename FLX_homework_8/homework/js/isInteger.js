function isInteger(a){
	return ((a*10)%10)===0;
}

alert(isInteger(5));
alert(isInteger(5.1));