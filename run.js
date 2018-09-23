
var bodyParser = require('body-parser');

var express = require('express');

var app = express();
var path = require('path');

var gameApp = require('./app.js');

global.GameDeviceDef = [];

//State Variables
global.GAME_NAME = '';
global.GAME_STATE = '';

gameApp.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// GameState = store.get('game');
// if (!GameState) GameState = [];

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


setInterval(gameApp.intervalHandle, 500);

  
