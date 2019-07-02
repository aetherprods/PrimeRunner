const express = require('express'),
      path = require('path')
      port = process.env.PORT || 3000,
      app = express();

app.get('/poop', (req, res) => res.send("Hello World!"));
app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html")});
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "/")));
app.listen(port, () => console.log("i am zord"));