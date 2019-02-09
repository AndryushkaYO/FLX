//Task #1. Check the user

var login = prompt("Enter your login:", "");

if (login === "" || login === null) {
    alert("Cancelled");
} else if (login.length < 4) {
    alert("I don't know any users having name length less than 4 symbols");
} else if (login === "User" || login === "Admin") {
    var password = prompt("Enter your password:", "");
    var time = new Date().getHours();
    if (password === "" || password === null) {
        alert("Cancelled");
    } else if ((login === "User" && password === "UserPass") ||
        (login === "Admin" && password === "RootPass")) {
        if (time < 20) {
            alert("Good day, dear " + login + "!");
        } else {
            alert("Good evening, dear " + login + "!");
        }
    } else {
        alert("Wrong password");
    }
} else {
    alert("I don’t know you");
}

