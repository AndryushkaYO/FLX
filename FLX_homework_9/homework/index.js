// ----  Task 1   ----
function findTypes() {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        result.push(typeof(arguments[i]));
    }
    return result;
}
console.log(findTypes('number'));
console.log(findTypes(null, 5, "hello"));


// ----  Task 2   ----
function executeforEach(array, f) {
    for (var i in array) {
        f(array[i]);
    }
}
executeforEach([1, 2, 3], function(el) {
    console.log(el)
});


// ----  Task 3   ----
function mapArray(array, f) {
    var result = [];
    executeforEach(array, function(el) {
        result.push(f(el));
    });
    return result;
}
console.log(mapArray([2, 5, 8], function(el) {
    return el + 3
}));


// ----  Task 4   ----
function filterArray(array, f) {
    var result = [];
    executeforEach(array, function(el) {
        if (f(el)) {
            result.push(el);
        }
    });
    return result;
}
console.log(filterArray([2, 5, 8], function(el) {
    return el > 3
}));

// ----  Data for Task 5 & 6   ----
var data = [{
        "_id": "5b5e3168c6bf40f2c1235cd6",
        "index": 0,
        "age": 39,
        "eyeColor": "green",
        "name": "Stein",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168e328c0d72e4f27d8",
        "index": 1,
        "age": 38,
        "eyeColor": "blue",
        "name": "Cortez",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "5b5e3168cc79132b631c666a",
        "index": 2,
        "age": 2,
        "eyeColor": "blue",
        "name": "Suzette",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e31682093adcc6cd0dde5",
        "index": 3,
        "age": 19,
        "eyeColor": "green",
        "name": "George",
        "favoriteFruit": "banana"
    }
];

// ----  Task 5   ----
function getAmountOfAdultPeople(data) {
    return filterArray(data, function(el) {
        return el.age >= 18;
    }).length;
}
console.log(getAmountOfAdultPeople(data));

// ----  Task 6   ---- 
function getGreenAdultBananaLovers(data) {
    var filtered_data = filterArray(data, function(el) {
        return el.eyeColor === "green" &&
            el.age >= 18 &&
            el.favoriteFruit === "banana";
    });
    return mapArray(filtered_data, function(el) {
        return el.name;
    });
}
console.log(getGreenAdultBananaLovers(data));

// ----  Task 7   ----
function keys(obj) {
    var result = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(key);
        }
    }
    return result;
}
console.log(keys({ keyOne: 1, keyTwo: 2, keyThree: 3 }));

// ----  Task 8   ----
function values(obj) {
    var result = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }
    return result;
}
console.log(values({ keyOne: 1, keyTwo: 2, keyThree: 3 }));

// ----  Task 9   ----
function showFormattedDate(date) {
    var month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    return "Date: " + date.getDate() + " of " + month[date.getMonth()] + ", " + date.getFullYear();
}
console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));

// ----  Task 10   ----
function isEvenYear(date) {
    return (date.getFullYear() % 2) === 0;
}
console.log(isEvenYear(new Date('2019-01-27T01:10:00')));

// ----  Task 11   ----
function isEvenMonth(date) {
    return ((date.getMonth() + 1) % 2) === 0;
}
console.log(isEvenMonth(new Date('2019-02-27T01:10:00')));