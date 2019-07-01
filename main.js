$( document ).ready(function() {
    gameStart();
});



function countingTimer(duration) {
    
    this.duration = duration;
    this.running = false;
    this.timeInterval;
    
}

countingTimer.prototype.start = function(duration) {
    let that = this,
        time = duration,
        seconds;

    if (that.running == false) {
        that.running = true;

    timeInterval = setInterval(function () {
            seconds = parseInt(time, 10);
            document.querySelector('#timer').textContent = that.parse(seconds);

            if (--time < 0) {
                that.running = false;
                that.stopTimer();
            }
        }, 100);
    }
}

countingTimer.prototype.stopTimer = function() {
    clearInterval(timeInterval);
    game.stopGame();
}

countingTimer.prototype.parse = function(time) {
    let that = this;
 //   this.seconds = seconds;
    if (time > 600) {
        let minutes = time/600 | 0;
        let seconds = time%600 | 0;
        time = "0" + minutes + ":" + "0" + seconds.toString(10).slice(0,2) + seconds.toString(10).slice(2)
    } else if (time <= 600) {
        time = time.toString(10).slice(0,2) + ":" + time.toString(10).slice(2) + "0";
    } else if (time < 100) {
        time = "0" + time.toString(10).slice(0,1) + ":" + time.toString(10).slice(1) + "0";
    }

    return time;
}



function primeGame() {
    this.primeContestant = 0;
    this.score = 0;
    this.running = false;
}

primeGame.prototype.startGame = function() {
    let that = this;
    document.querySelector('#isPrime').addEventListener('click', () => that.isPrime());
    document.querySelector('#isNotPrime').addEventListener('click', () => that.isNotPrime());
    that.score = 0;
}

primeGame.prototype.stopGame = function() {
    let that = this;
    alert("game over");
    document.querySelector('#isPrime').removeEventListener('click', () => that.isPrime());
    document.querySelector('#isNotPrime').removeEventListener('click', () => that.isNotPrime());
    gameStart();
}

primeGame.prototype.counter = function(outcome) {
    let that = this;
    if (outcome == "correct") {
        that.score++;
    } else if (outcome == "incorrect") {
        that.score--;
    }
    document.getElementById("counter").innerHTML = that.score;
}

primeGame.prototype.checkforPrimeness = function(num) {
    let primeness = true;
    for(let i=7; i<=Math.sqrt(num); i++) {
        if (num%i == 0) {
            primeness = false;
            return primeness;
        } else {
            primeness = true;
        }
    }
    return primeness;
}

primeGame.prototype.isPrime = function() {
    let that = this;
    if (that.checkforPrimeness(that.primeContestant) == true) {
        document.getElementById("last-result").innerHTML = "Correct!";
        document.getElementById("last-result").style.backgroundColor = "green";
        that.counter("correct");
    } else {
        document.getElementById("last-result").innerHTML = "Incorrect!";
        document.getElementById("last-result").style.backgroundColor = "red";
        that.counter("incorrect");
    }
    that.newPrime();
}

primeGame.prototype.isNotPrime = function() {
    let that = this;
    if (that.checkforPrimeness(that.primeContestant) == false) {
        document.getElementById("last-result").innerHTML = "Correct!";
        document.getElementById("last-result").style.backgroundColor = "green";
        that.counter("correct");
    } else {
        document.getElementById("last-result").innerHTML = "Incorrect!";
        document.getElementById("last-result").style.backgroundColor = "red";
        that.counter("incorrect");
    }
    that.newPrime();
}

primeGame.prototype.newPrime = function() {
    let that = this;
    that.primeContestant = Math.floor(Math.random() * 25000);
    if (that.primeContestant % 2 == 0) {
        that.newPrime();
    } else if ((that.primeContestant % 3 == 0)) {
        that.newPrime();
    } else if ((that.primeContestant % 5 == 0)) {
        that.newPrime();
    } else if ((that.primeContestant % 7 == 0)) {
        that.newPrime();
    } 
    document.getElementById("primer").innerHTML = that.primeContestant;
}


function gameStart() {

    
    game = new primeGame();
    timer = new countingTimer(30);
    
    document.querySelector('#timer').textContent = timer.parse(30);
    
    document.querySelector('#startButton').addEventListener('click', () => {
        timer.start(30)
        game.startGame();
    });
}