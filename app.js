var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var http = require("http");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post("/exec", urlencodedParser, function(req, res){
    var ip = req.body.ip;
    var port = req.body.port;
    var txType = req.body.txType;
    var txParam = req.body.txParam;
    var cmd = "./tx_constructor " + ip + " " + port + " " + txType + " '" + txParam + "'";

    var execSync = require('sync-exec');
    var ret = execSync(cmd);
    /*
    console.log(ip + ":" + port);
    console.log(txParam);
    console.log(ret);
    */

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(JSON.stringify(ret));
});

app.listen(1991, function() {
    console.log('App listening at port 1991;');
});
