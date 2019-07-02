
const $ = require('jquery'),
      express = require('express'),
      app = express(),
      port = 3000;

app.get('/poop', (req, res) => res.send("Hello World!"));
app.get('/', (req, res) => {
return res.send("Hello World!");
});
app.listen(port, () => console.log("i am zord"));