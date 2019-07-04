//imports
const express = require('express'),
    app = express(),
    path = require('path'),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser');

//variables
let port = process.env.PORT,
    uri = process.env.MONGODB_URI,
    database = process.env.DATABASE,
    testuri = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb",
    highscoreArray = [],
    highscoreDB;
    

//initializations
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//start the server
app.listen(port, () => console.log("i am zord"));

//connect to the database
(async () => {
    db = await mongodb.MongoClient.connect(uri || testuri, { useNewUrlParser: true }, (err, client) => {
        if(err) throw err;
        db = client.db(`${database}`);
        highscoreDB = db.collection('highscores');
    });
})();

//serve static resources
//why does this throw an error when i try for /public?
app.use(express.static(path.join(__dirname, "/")));

//serve front page
app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html")});

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
app.get('/getHighScore', (req, res) => {
    //populate highscoreArray
    highscoreDB.find().sort({ score: -1 }).toArray((err, result) => {highscoreArray = console.log(Array.from(result))});
    res.send(highscoreArray);
});