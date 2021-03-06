$( document ).ready(function() {
    $.ajaxSetup({ cache: false })
    
    game = new primeGame();
    timer = new countingTimer(300, game);
    
    document.querySelector('#timer').textContent = timer.parse(timer.duration);
    document.querySelector('#startButton').addEventListener('click', () => gameStart());
    document.querySelector('#isPrime').addEventListener('click', () => game.submitAnswer("yes"));
    document.querySelector('#isNotPrime').addEventListener('click', () => game.submitAnswer("no"));

});



function countingTimer(duration, gameInstance) {
    this.game = gameInstance;
    this.duration = duration;
    this.running = false;
    this.timeInterval;
}

countingTimer.prototype.start = function() {
    let that = this,
        time = that.duration,
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
    let that = this;
    clearInterval(timeInterval);
    that.game.stopGame();
}

countingTimer.prototype.parse = function(time) {
    let that = this;
 //   this.seconds = seconds;
    if (time > 600) {
        let minutes = time/600 | 0;
        let seconds = time%600 | 0;
        time = "0" + minutes + ":" + "0" + seconds.toString(10).slice(0,2) + seconds.toString(10).slice(2)
    } else if (time <= 600 && time >= 100) {
        time = time.toString(10).slice(0,2) + ":" + time.toString(10).slice(2) + "0";
    } else if (time < 100) {
        time = "0" + time.toString(10).slice(0,1) + ":" + time.toString(10).slice(1) + "0";
    }

    return time;
}



function primeGame() {
    this.primeContestant;
    this.score;
    this.running = false;
    this.username = "bobby";
}

primeGame.prototype.startGame = function() {
    let that = this;
    that.score = 0;
    that.running = true;
    that.newPrime();
    document.getElementById("counter").innerHTML = that.score;
}

primeGame.prototype.stopGame = function() {
    let that = this;

    //get username
    that.username = window.prompt("Enter your username:");

    //post score to leaderboard
    let postScore = new Promise((resolve, reject) => {
        let post = $.ajax({
                        type: "POST",
                        url: '/postScore',
                        data: { "score": that.score, "username": that.username },
                        async: true,
                        cache: false,
                        headers: { "cache-control": "no-cache" },
                        'content-type': "application/json"
                    });
        resolve (post);
    
    });
    postScore.then( (successMessage) => {
        console.log(successMessage);
        window.location.href = "/highscores"; //show high scores only after POST
    });
    postScore.catch( (error) => {
        console.log(error);
    });

    
    that.reinitializeValues();
    
}

primeGame.prototype.reinitializeValues = function () {
    let that = this;

    that.score = 0;
    that.running = false;
    document.getElementById("last-result").innerHTML = "";
    document.getElementById("last-result").style.backgroundColor = "white";
    document.getElementById("counter").innerHTML = that.score;
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

primeGame.prototype.submitAnswer = function(answer) {
    let that = this;
    let isPrime = that.checkforPrimeness(that.primeContestant);

    if (that.running == true) {
        
        if ((answer == "yes" && isPrime == true) || (answer == "no" && isPrime == false)) {
            document.getElementById("last-result").innerHTML = "Correct!";
            document.getElementById("last-result").style.backgroundColor = "green";
            that.counter("correct");
        } else {
            document.getElementById("last-result").innerHTML = "Incorrect!";
            document.getElementById("last-result").style.backgroundColor = "red";
            that.counter("incorrect");
        }

        game.newPrime();
    }
}

primeGame.prototype.newPrime = function() {
    let that = this;
    that.primeContestant = Math.floor(Math.random() * 2500);
    if (that.primeContestant == 1) {
        that.newPrime();
    } else if (that.primeContestant % 2 == 0) {
        that.newPrime();
    } else if ((that.primeContestant % 3 == 0)) {
        that.newPrime();
    } else if ((that.primeContestant % 5 == 0)) {
        that.newPrime();
    }
    document.getElementById("primer").innerHTML = that.primeContestant;
}


function gameStart() {
   if (game.running == false) {
        timer.start();
        game.startGame();
   }
}