var express = require('express');
var path = require('path');

var http = require("http");
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(1991, function() {
    console.log('App listening at port 1991;');
});

