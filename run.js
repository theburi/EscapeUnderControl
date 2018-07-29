
'use strict';

var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var Storage = require('node-storage');

var app = express();
var store = new Storage('gamestatus.json');
var GameState = [{ name: 'Puzzle 1', state: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, { name: 'Puzzle 2', state: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/assets', express.static(__dirname + '/assets'));
app.use('/states', express.static(__dirname + '/states'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/index.js', express.static(__dirname + '/index.js'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.post('/game/:name', function (req, res) {
  console.log('update all statuses')
  var states = ["junglecaveset", "pharaoheye", "pharaohmummy", "jungletablestart", "pharaohchest", "jungles2", "jungleset", "pharaohscarab", "jungles1rihno", "jungles1lion", "pharaohlibra", "junglecavechest", "junglecavebox", "pharaohset", "jungleend"];
  if (req.params.name === 'jungle')
    states.forEach(function (state) {
      store.remove(state)
    })
});


app.get('/game/:name', function (req, res) {
  return
});


app.get('/game/:name/state', function (req, res) {
  client.readHoldingRegisters(0, 16, function(err, data) {
    if (err) console.log("Error", err);
    console.log(data.data);
  });
  return data.data;
});


app.post('/game/:name/state/:puzzle', function (req, res) { 
    client.writeRegisters ( 0, GameState.puzzle, function(err, data) {
    if (err) console.log("Error", err);
  })
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

// ModBus
const ModbusRTU = require("modbus-serial");
// create an empty modbus client
const client = new ModbusRTU();
// open connection to a serial port
client.connectTTYBuffered("/dev/ttyS0", { baudRate: 9600 });
// set timeout, if slave did not reply back
client.setTimeout(500);


module.exports = app;
