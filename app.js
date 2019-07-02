const express = require('express'),
      port = process.env.PORT || 3000;
      app = express(),

app.get('/poop', (req, res) => res.send("Hello World!"));
app.get('/', (req, res) => {res.sendFile(__dirname + "/main.html")});
app.listen(port, () => console.log("i am zord"));