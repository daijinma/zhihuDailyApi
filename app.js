'use strict'
var express = require('express');
var utils = require('./utils.js');
var app = express();
var http = require('http');

var router = require('./data/router');

router(app);


var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
