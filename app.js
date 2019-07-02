
const express = require('express'),
      port = process.env.PORT || 3000;
      app = express(),

app.get('/poop', (req, res) => res.send("Hello World!"));
app.get('/', (req, res) => {
return res.send("Hello World!");
});
app.listen(port, () => console.log("i am zord"));