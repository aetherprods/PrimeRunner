let primeContestant = 1;
let score = 0;





$( document ).ready(function() {

    newPrime();
   // timer();
});

function timer() {
    let now = new Date();
    now = now.getTime();
    let thirtySeconds = now+30000;

    for (i=now; i<thirtySeconds; i++) {
        document.getElementById("timer").innerHTML = i;
    }

}

function counter(outcome) {
    if (outcome == "correct") {
        score++;
    } else if (outcome == "incorrect") {
        score--;
    }
    document.getElementById("counter").innerHTML = score;
}


function checkforPrimeness (num) {
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


function isPrime () {
    if (checkforPrimeness(primeContestant) == true) {
        document.getElementById("last-result").innerHTML = "Correct!";
        document.getElementById("last-result").style.backgroundColor = "green";
        counter("correct");
    } else {
        document.getElementById("last-result").innerHTML = "Incorrect!";
        document.getElementById("last-result").style.backgroundColor = "red";
        counter("incorrect");
    }
    newPrime();
}

function isNotPrime () {
    if (checkforPrimeness(primeContestant) == false) {
        document.getElementById("last-result").innerHTML = "Correct!";
        document.getElementById("last-result").style.backgroundColor = "green";
        counter("correct");
    } else {
        document.getElementById("last-result").innerHTML = "Incorrect!";
        document.getElementById("last-result").style.backgroundColor = "red";
        counter("incorrect");
    }
    newPrime();
}

function newPrime () {
    primeContestant = Math.floor(Math.random() * 25000);
    if (primeContestant % 2 == 0) {
        newPrime();
    } else if ((primeContestant % 3 == 0)) {
        newPrime();
    } else if ((primeContestant % 5 == 0)) {
        newPrime();
    } else if ((primeContestant % 7 == 0)) {
        newPrime();
    } 
    document.getElementById("primer").innerHTML = primeContestant;
}