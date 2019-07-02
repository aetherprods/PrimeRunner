const express = require('express')
      path = require('path')
      mongodb = require('mongodb')
      mongoose = require('mongoose')
      port = process.env.PORT || 3000
      app = express();



mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_76n6c1p1:Gf7vyajtrWdfgG6854sdrfg23@ds245927.mlab.com:45927/heroku_76n6c1p1");

app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html")});
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "/")));
app.listen(port, () => console.log("i am zord"));


let data=[
    {"a": 1},
    {"b": 2},
    {"c": 3},
]
let uri = "mongodb://heroku_76n6c1p1:Gf7vyajtrWdfgG6854sdrfg23@ds245927.mlab.com:45927/heroku_76n6c1p1" 

mongodb.MongoClient.connect(uri, (err, client) => {
    if(err) throw err;

    let db = client.db('heroku_76n6c1p1');

    let sendData = db.collection('data');

    sendData.insert(data, (err, result) => {
        if(err) throw err;
        
    })
})