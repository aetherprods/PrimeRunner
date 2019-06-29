let primeContestant = 1;

$( document ).ready(function() {
    newPrime();
    document.getElementById("primer").innerHTML = primeContestant;

});

function checkforPrimeness (num) {
    let primeness = true;
    for(let i=2; i<=Math.sqrt(num); i++) {
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
        alert("right!");
    } else {
        alert("wrong!");
    }
    newPrime();
}

function isNotPrime () {
    if (checkforPrimeness(primeContestant) == false) {
        alert("right!");
    } else {
        alert("wrong!");
    }
    newPrime();
}

function newPrime () {
    primeContestant = Math.floor(Math.random() * 5000);
    if (primeContestant % 2 == 0) {
        primeContestant +=1;
    }
    document.getElementById("primer").innerHTML = primeContestant;
}