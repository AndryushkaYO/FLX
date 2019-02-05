var a = prompt("Enter a: ","");
var b = prompt("Enter b: ","");
var c = prompt("Enter c: ","");

if (isNaN(a) || isNaN(b) || isNaN(c) ||
    (a === "") || (b === "") || (c === "")||+a===0) {
    alert("Invalid input data");
} else {
    var x = 0;
    var discriminant = (b * b) - 4 * a * c;
    if (discriminant < 0) {
        alert("no solution");
    } else if (discriminant > 0) {
        x = ((-b) - Math.sqrt(discriminant)) / (2 * a);
        var x2 = ((-b) + Math.sqrt(discriminant)) / (2 * a);
        alert("x1 = " + x + " and x2 = " + x2);
    } else {
        x = (-b) / (2 * a);
        alert("x = " + x);
    }
}
