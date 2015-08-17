var express = require('express')
var app = express();

//Disable socket pooling
require('http').globalAgent.maxSockets = Infinity

//Setup express
require('./config/express')(app);

//Setup router
require('./config/router')(app);


var server = app.listen(3000);