const express = require('express')
      path = require('path')
      mongodb = require('mongodb')
      port = process.env.PORT || 3000
      app = express()
      bodyParser = require('body-parser');

let uri = "mongodb://heroku_76n6c1p1:u0t3c6j9bqa5c6e6ikbsprtooj@ds245927.mlab.com:45927/heroku_76n6c1p1" 
let data = [
    {"a": "1"},
    {"b": "2"},
    {"c": "3"},
]



app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html")});

app.get('/poop', (req, res) => {
    res.send("Hello Poop!");
    mongodb.MongoClient.connect(process.env.MONGODB_URI || uri, (err, client) => {
        if(err) throw err;
    
        let db = client.db('heroku_76n6c1p1');
    
        let sendData = db.collection('data');
    
        sendData.insert(data, (err, result) => {
            if(err) throw err;
            
        })
    })
});
app.use(express.static(path.join(__dirname, "/")));
app.listen(port, () => console.log("i am zord"));

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