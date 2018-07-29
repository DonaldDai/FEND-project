// the game score and the max score.
var score = 0;
var maxScore = 0;
// generate a random speed
var genSpeed = function() {
    speed = Math.random() * 500;
    if (speed < 150) {
        speed = 150;
    }
    return speed;
};
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -101;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 23;
    this.speed = genSpeed();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = -101;
        this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 23;
        this.speed = genSpeed();
    }
    this.x = this.x + this.speed * dt;
    while (allEnemies.length <= score / 100) {
        if (allEnemies.length >= score / 100)
            break;
        allEnemies.push(new Enemy());
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = Math.floor(Math.random() * 5) * 101;
    this.y = (Math.ceil(Math.random() * 2) + 3) * 83 - 23;
    this.sprite = "images/char-cat-girl.png";
}

// if they are conflicted
Player.prototype.isConflicted = function() {
    for (var i=0; i<allEnemies.length; i++) {
        if (this.y == allEnemies[i].y && Math.abs(this.x - allEnemies[i].x) <= 85) {
            return true;
        }
    }
    return false;
}

Player.prototype.update = function() {
    // limit the moving boudary
    if (this.y > 415) {
        this.y = 415 - 23;
    }
    if (this.y <= -23) {
        this.y = 415 - 23;
        score = score + 100;
        if (score > maxScore) {
            maxScore = score;
            document.getElementById('max_score').innerHTML = maxScore.toString();
        }
        document.getElementById('score').innerHTML = score.toString();
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 404) {
        this.x = 404;
    }
    // if they are conflicted
    if (this.isConflicted()) {
        console.log("conflicted");
        this.y = 5 * 83 -23;
        score = score - 100;
        if (score < 0) {
            score = 0;
        }
        document.getElementById('score').innerHTML = score.toString();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x = this.x - 101;
            break;
        case 'up':
            this.y = this.y - 83;
            break;
        case 'right':
            this.x = this.x + 101;
            break;
        case 'down':
            this.y = this.y + 83;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy());
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//maybe keydown is more fluent
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
