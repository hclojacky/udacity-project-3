"use strict";
// Enemies our player must avoid
var Character = function () {
    this.sprite = '';
    this.x = '';
    this.y = '';
}
Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this);
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = gridConvert(getRandomInt(1, 3), 'row');
    this.speed = getRandomInt(100, 600);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -101;
        this.y = gridConvert(getRandomInt(1, 3), 'row');
        this.speed = getRandomInt(100, 600);
        this.x += this.speed * dt;
    } else {
        this.x += this.speed * dt;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    // init position for player
    // the grid is just 5x5
    this.x = gridConvert(3, 'col');
    this.y = gridConvert(5, 'row');
    this.status = '';
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    // winning
    if (this.y < 50) {
        this.status = 'win';
    }
};

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x !== 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x !== gridConvert(5, 'col')) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y !== gridConvert(5, 'row')) {
                this.y += 83;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', playerKeyupEvent);

function playerKeyupEvent(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// function just for better human understand for grid
// change from 0 base system to normal understanding system(ie: start from 1)
// can be used in both horizontal or vertical
// retun the cooresponding space, like player initial position is x: 3, y: 5 (from top left corner)
function gridConvert(num, type) {
    if (type === 'row') {
        return 50 + (num - 1) * 83;
    } else if (type === 'col') {
        return (num - 1) * 101;
    }
}

// function for random integar between a range
function getRandomInt(min, max) {
    //Will return a number inside the given range, inclusive of both minimum and maximum
    //i.e. if min=0, max=20, returns a number from 0-20
    return Math.floor(Math.random() * (max - min + 1)) + min;
}