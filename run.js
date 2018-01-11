'use strict';

var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var Storage = require('node-storage');

var app = express();
var store = new Storage('gamestatus.json');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/assets', express.static(__dirname + '/assets'));
app.use('/states', express.static(__dirname + '/states'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/index.js', express.static(__dirname + '/index.js'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


app.post('/game/:name/:state/:confidence', function (req, res) {
  var state = req.params.state;
  var gameName = req.params.name;
  var confidence = req.params.confidence;

  Storage.put(gameName, { gameName: confidence });
  return res.status(200);
});

app.get('/game/:name/:state', function (req, res) {
  var state = req.params.state;
  var gameName = req.params.name;

  var confidence = Storage.get(gameName.state)
  
  return res.json(confidence)
});

/* GET home page. */
app.get('*', function (req, res, next) {
  //Path to your main file
  //res.status(200).sendFile(path.join(__dirname+'main.html')); 
  console.log(__dirname);
  res.sendFile(__dirname + '/main.html');


});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

module.exports = app;
