//imports
const express = require('express'),
    app = express(),
    path = require('path'),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser');

    
//initializations
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//variables
let port = process.env.PORT,
    database = process.env.DATABASE,
    highscoreArray = [],
    highscoreDB;

//start the server
app.listen(port, () => console.log(`listening on port: ${port}`));


//connect to the database
(async () => {
    db = await mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {
        if(err) throw err;
        db = client.db(`${database}`);
        highscoreDB = db.collection('highscores');
    });  
})();

//serve static resources
//why does this throw an error when i try for /public?
app.use(express.static(path.join(__dirname, "/")));

//serve front page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/main.html");

});

//method to post new score to leaderboard db
app.post('/postScore', function (req, res) {
    let { username, score } = req.body,
        validUser = /[!@#*()-=+\w][^\s]/;
        
    
    if (!validUser.test(username)) {
        console.log("invalid username");
        res.send({ status: false, msg: "invalid username" });
    } else {
        highscoreDB.insertOne({
            name: `${username}`,
            score: `${score}`
        });

        console.log(`Created entry for ${username}`);
        res.send({ status: true, msg: "player created" });
    };
});


//serve up list of high scores
app.get('/highscores', (req, res) => {

    (async () => {
        //populate highscoreArray
        let tempArray = await highscoreDB.find().sort({ score: -1 }).toArray();
        for (let i=0; i<tempArray.length; i++) {
            let name = tempArray[i]['name'];
            let score = tempArray[i]['score'];
            highscoreArray.push({ name: name, score: score })


        }

        //fill a table with highscoreArray
        let result = '<table>';
        for (let i=0; i<highscoreArray.length; i++) {//change highscorearray.length to, say, 9, to give top 10 scores
            //for (let prop in highscoreArray[i]) {
                result += "<tr><td>" + highscoreArray[i]['name'] + "</td><td>" + highscoreArray[i]['score'] + "</td></tr>";
              //}
        }
        result += '</table>';

        //append a button to go back home
        result += '<input type="button" value="Go Back" id="goHome"/>';

        //append an event listener for that button
        result += "<script>document.querySelector('#goHome').addEventListener('click', () => goHome());"

        //define the gohome function
        result += "function goHome() {window.location.href = '/';};</script>"

        res.send(result);
      

    })();


});
