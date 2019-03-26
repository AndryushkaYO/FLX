/*-------------- TASK 1 ------------*/

function assign(obj, ...source) {
    source.forEach(item => {
        for (let property in item) {
            if (item.hasOwnProperty(property)) {
                obj[property] = item[property];
            }
        }
    });

    return obj;
}

/*-------------- TASK 2 ------------*/

function Bot(bot) {
    this.name = bot.name;
    this.speed = bot.speed;
    this.x = bot.x;
    this.y = bot.y;
    this.defaultSpeed = this.speed;
    this.type = 'bot';
}
Bot.prototype.getSpeed = function() {
    return this.speed;
}
Bot.prototype.setSpeed = function(newSpeed) {
    this.speed = newSpeed;
}
Bot.prototype.getName = function() {
    return this.name;
}
Bot.prototype.setName = function(newName) {
    this.name = newName;
}
Bot.prototype.getCoordinates = function() {
    return { x: this.x, y: this.y };
}
Bot.prototype.setCoordinates = function(x, y) {
    this.x = x;
    this.y = y;
}
Bot.prototype.showPosition = function() {
    console.log(`I am a ${this.type} ${this.name}. I am located at ${this.x} : ${this.y}`);
}
Bot.prototype.getDefaultSpeed = function() {
    return this.defaultSpeed;
}
Bot.prototype.move = function(moveDirrection) {
    switch (moveDirrection) {
        case 'up':
            this.y += this.speed;
            break;
        case 'down':
            this.y -= this.speed;
            break;
        case 'left':
            this.x -= this.speed;
            break;
        case 'right':
            this.x += this.speed;
            break;
    }
}


function Racebot(bot) {
    this.previousMove;
    this.isFirstMove = true;
    Bot.call(this, bot);
    this.type = 'Racebot';
}
Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Bot;
Racebot.prototype.move = function(moveDirrection) {
    if (this.isFirstMove) {
        this.previousMove = moveDirrection;
        this.isFirstMove = false;
    } else {
        if (this.previousMove === moveDirrection) {
            this.speed++;
        } else {
            this.previousMove = moveDirrection;
            this.speed=this.defaultSpeed;
        }
    }
    Bot.prototype.move.call(this, moveDirrection);
}

function Speedbot(bot) {
    Bot.call(this, bot);
    this.type = 'Speedbot';
}
Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Bot;
Speedbot.prototype.prepareEngine = function() {
    this.speed *= 2;
}
Speedbot.prototype.move = function(moveDirrection) {
    Bot.prototype.move.call(this, moveDirrection);
    if (this.speed > this.defaultSpeed) {
        this.speed--;
    }
}

/*----------- Main ---------------*/

//Task 1
var defaults = { a: 123, b: 777 };
var options = { a: 456 };
var configs = assign({}, defaults, options); // {a: 456, b: 777}

//Task 2
let Botty = new Bot({ name: "Betty", speed: 2, x: 0, y: 1 });
Botty.showPosition();
Botty.move('up');
Botty.showPosition();
Botty.move('left');
Botty.move('down');
Botty.move('up');
Botty.move('up');
Botty.showPosition();
Botty.move('up');
Botty.showPosition();
Botty.move('up');
Botty.showPosition();

let Zoom = new Racebot({ name: "Lightning", speed: 2, x: 0, y: 1 });
Zoom.showPosition();
Zoom.move('up');
Zoom.showPosition();
Zoom.move('left');
Zoom.move('down');
Zoom.move('up');
Zoom.move('up');
Zoom.showPosition();
Zoom.move('up');
Zoom.showPosition();
Zoom.move('up');
Zoom.showPosition();

let Broom = new Speedbot({ name: "Thunder", speed: 2, x: 0, y: 1 });
Broom.showPosition();
Broom.move('up');
Broom.showPosition();
Broom.prepareEngine();
Broom.move('left');
Broom.move('down');
Broom.move('up');
Broom.move('up');
Broom.showPosition();
Broom.move('up');
Broom.showPosition();
Broom.move('up');
Broom.showPosition();