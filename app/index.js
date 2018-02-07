const express = require('express');
const app = express();

app.use(express.static("public"));

app.get("/test", function (req, res) {
    res.send("Testing");
});

app.get("/", function (req, res) {
    res.sendFile("./public/index.html");
    
});

var server = app.listen(8080);