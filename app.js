//imports
const express = require('express'),
    app = express(),
    path = require('path'),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    bodyParser = require('body-parser');

//variables
let testport = 3000,
    uri = process.env.MONGODB_URI,
    testuri = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb",
    data = [
        {"a": "1"},
        {"b": "2"},
        {"c": "3"}
    ];

//initializations
require('dotenv').config();
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//"connect to the database w/ uri"
(async () => {
    let client = await MongoClient.connect(
        testuri,
        { useNewUrlParser: true }
    );
    db = client.db("highScores");

})();

//start the server
app.listen(testport, () => console.log("i am zord"));

//serve static resources
//why does this throw an error when i try for /public?
app.use(express.static(path.join(__dirname, "/")));

//serve front page
app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html")});


//send new score to the board
app.get('/postScore', (req, res) => {

    //connect to the database
    mongodb.MongoClient.connect(testuri || uri, { useNewUrlParser: true }, (err, client) => {
        let db = client.db('local');//change me to heroku mlab id
        let highScores = db.collection('highScores');


    });

    let { username, score } = req.body;
    db.collection("highScores").insertOne({ username, score });
    console.log(`Created entry for ${username}`);
    res.send({ status: true, msg: "entry created" });
});
/*
//serve up list of high scores
app.get('/getHighScore', (req, res) => {

});
*/



/*
mongodb.MongoClient.connect(process.env.MONGODB_URI || uri, (err, client) => {
    if(err) throw err;

    let db = client.db('heroku_76n6c1p1');

    let sendData = db.collection('data');

    sendData.insert(data, (err, result) => {
        if(err) throw err;
        
    })
})
*/









//begin working MONGODB collection update (deprecated insert):

//serve test page
app.get('/test', (req, res) => {
    res.send(`Hello Test! ${testport}\n${req.body.name}`);

    mongodb.MongoClient.connect(testuri || uri, { useNewUrlParser: true }, (err, client) => {
        if(err) throw err;
    
        //db = client.db(process.env.DB);
        db = client.db('local');

        let sendData = db.collection('scrappy');
    
        sendData.insertOne({
            name: "bob",
            test: "test"
        }, (err, result) => {
            if(err) throw err;
            
        });

    });
});