    
var express = require("express");
var app = express();
var fs = require('fs');


var key = fs.readFileSync('bin/private.key');
var cert = fs.readFileSync( 'bin/private.pem' );
var ca = fs.readFileSync( 'bin/private.crt' );


var options = {
    key: key,
    cert: cert,
    ca: ca
};

app.use(express.static('dist'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/js', express.static(__dirname + '/dist/js'));
app.use('/images', express.static(__dirname + '/dist/images'));

var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});