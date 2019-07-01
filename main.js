





$( document ).ready(function() {

    game = new game(300);

});

/* currently being kept for reference
function startTimer() {
    var timer = 300, seconds;

    setInterval(function () {
        seconds = parseInt(timer, 10);
        document.querySelector('#timer').textContent = seconds;

        //document.querySelector('#timer').textContent = minutes.toString(10).slice(0,2) + ":" + minutes.toString(10).slice(2);

        if (--timer < 0) {
            timer = 30;
        }
    }, 100);
}
*/

function timer(duration) {
    //this.timer = timer;
    this.duration = duration;
    this.running = false;
    this.timeInterval;
    //document.querySelector('#timer').textContent = timer.start();
    document.querySelector('#timer').textContent = duration.toString(10).slice(0,2) + ":" + duration.toString(10).slice(2) + "0";

}

timer.prototype.start = (duration) => {
    this.timer = timer;
    var time = duration, seconds;

    if (timer.running == false) {
        timer.running = true;

    timeInterval = setInterval(function () {
            seconds = parseInt(time, 10);
            document.querySelector('#timer').textContent = timer.parse(seconds);

            if (--time < 0) {
                timer.running = false;
                timer.stopTimer();
                game.stopGame();
            }
        }, 100);
    }
}

timer.prototype.stopTimer = () => {
    clearInterval(timeInterval);

}

timer.prototype.parse = (seconds) => {
 //   this.seconds = seconds;
    seconds = seconds.toString(10).slice(0,2) + ":" + seconds.toString(10).slice(2) + "0";
    return seconds;
}



function game(duration) {
    this.primeContestant;
    this.score;
    this.running = false;
    this.duration = duration;
    //put in key bindinds
    timer = new timer(duration);
    
    document.querySelector('#startButton').addEventListener('click', () => {
        timer.start(duration)
        game.startGame();
    });

}

game.prototype.startGame = () => {
    document.querySelector('#isPrime').addEventListener('click', () => game.isPrime());
    document.querySelector('#isNotPrime').addEventListener('click', () => game.isNotPrime());
    game.score = 0;
}

game.prototype.stopGame = () => {
    alert("game over");
    document.querySelector('#isPrime').removeEventListener('click', () => game.isPrime());
    document.querySelector('#isNotPrime').removeEventListener('click', () => game.isNotPrime());
}

game.prototype.counter = (outcome) => {
    if (outcome == "correct") {
        game.score++;
    } else if (outcome == "incorrect") {
        game.score--;
    }
    document.getElementById("counter").innerHTML = game.score;
}

game.prototype.checkforPrimeness = (num) => {
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

game.prototype.isPrime = () => {
    if (game.checkforPrimeness(game.primeContestant) == true) {
        document.getElementById("last-result").innerHTML = "Correct!";
        document.getElementById("last-result").style.backgroundColor = "green";
        game.counter("correct");
    } else {
        document.getElementById("last-result").innerHTML = "Incorrect!";
        document.getElementById("last-result").style.backgroundColor = "red";
        game.counter("incorrect");
    }
    game.newPrime();
}

game.prototype.isNotPrime = () => {
    if (game.checkforPrimeness(game.primeContestant) == false) {
        document.getElementById("last-result").innerHTML = "Correct!";
        document.getElementById("last-result").style.backgroundColor = "green";
        game.counter("correct");
    } else {
        document.getElementById("last-result").innerHTML = "Incorrect!";
        document.getElementById("last-result").style.backgroundColor = "red";
        game.counter("incorrect");
    }
    game.newPrime();
}

game.prototype.newPrime = () => {
    game.primeContestant = Math.floor(Math.random() * 25000);
    if (game.primeContestant % 2 == 0) {
        game.newPrime();
    } else if ((game.primeContestant % 3 == 0)) {
        game.newPrime();
    } else if ((game.primeContestant % 5 == 0)) {
        game.newPrime();
    } else if ((game.primeContestant % 7 == 0)) {
        game.newPrime();
    } 
    document.getElementById("primer").innerHTML = game.primeContestant;
}