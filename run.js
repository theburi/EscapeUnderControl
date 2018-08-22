
'use strict';

var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var Storage = require('node-storage');

var app = express();
var store = new Storage('gamestatus.json');
var GameDeviceDef = [{ name: 'Pictures', id: 5, state: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], startStage: 0, endStage: 1, activeReg: 0, solvedReg: 1 },
{ name: 'Sound 1', id: 'sound', startStage: 0, endStage: 1, sound: 'audio/magic/sound1.pm3', endTime: 50 }];

var GameState = []; // [ {name: 'Puzzle 1', id: 1, lastState:[], newState: [], updated: '', solved: false }]

// Load Game States
for (var i = 0; i < GameState.length; i++) {
  GameState.push({ name: GameDeviceDef[i].name, id: GameDeviceDef[i].id, lastState: GameDeviceDef[i].state, newState: GameDeviceDef[i].state, startStage: GameDeviceDef[i].startStage, endStage: GameDeviceDef[i].endStage, activeReg: GameDeviceDef[i].activeReg, solvedReg: GameDeviceDef[i].solvedReg, solved: false })
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//State Variables
var GAME_NAME = '';
var GAME_STATE = '';

GameState = store.get('game');
if (!GameState) GameState = [];

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/states', express.static(__dirname + '/states'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/index.js', express.static(__dirname + '/index.js'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.post('/game/:name', function (req, res) {
  console.log('Set Game ', req.params.name)
  GAME_NAME = req.params.name;
  GameState = [];

  for (var i = 0; i < GameDeviceDef.length; i++) {
    var state = { name: GameDeviceDef[i].name, id: GameDeviceDef[i].id, updated: new Date(), solved: false }
    if (state.id === 'sound') {
      state.sound = GameDeviceDef[i].sound
    } else {
      state.lastState = GameDeviceDef[i].state;
      state.newState = GameDeviceDef[i].state;
    }

    GameState.push(state);
  }
  store.put('game', GameState);
  GAME_STATE = 'INIT';
  return res.send(GameState);
  //TODO push state to ModBus Devices
});


app.get('/game/:name', function (req, res) {
  return res.send(GAME_NAME);
});


app.get('/game/:name/state', function (req, res) {
  if (req.params.name === GAME_NAME)
    return res.send(GameState);
  return res.end();
});


app.get('/game/:name/state/:puzzle', function (req, res) {
  if (req.params.name === GAME_NAME)
    GameState.forEach(puzzle => {
      if (puzzle.name === req.params.puzzle) {
        return res.send(puzzle);
      }
    })
  return res.end();
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
client.connectRTU("/dev/ttyUSB0", { baudRate: 19200 }, write);
// set timeout, if slave did not reply back
client.setTimeout(500);


// Interval Function that calls ModBus

var intervalHandle = function pollGameState() {
  //Check Game name and load game def file
  for (var i = 0; i < GameState.length; i++) {
    if (GameState[i].id != 'sound')
      readPuzzleState(GameState[i].id);
  }
  //Check ModBus works

  //Get ModBus data of each device.

  //Push Admin commands to devices

  //OR Calculate new state and push updated state for game flow

  // Get updated state for changed devices and verify expected state.

}

function readPuzzleState(id) {
  client.readHoldingRegisters(id, 0, function (err, data) {
    if (err) console.log("Error", err);
    console.log(data);
  });
}

function writePuzzleState(id) {
  client.writeRegisters(id, 0, function (err, data) {
    if (err) console.log("Error", err);
  })
}

setTimeout(intervalHandle, 500);

module.exports = app;
