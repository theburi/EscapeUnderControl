
'use strict';


var gameApp = module.exports = exports;


gameApp.init = function () {

  var Storage = require('node-storage');

  var store = new Storage('gamestatus.json');

  GameDeviceDef = (new Storage('GameDefentions.json')).get('wizard');

  var Storage = require('node-storage');
  var store = new Storage('gamestatus.json');
  // var GameDeviceDef = (new Storage('GameDefentions.json')).get('wizard');
  var GameState = []; // [ {name: 'Puzzle 1', id: 1, lastState:[], newState: [], updated: '', solved: false }]

  // Load Game States
  for (var i = 0; i < GameDeviceDef.length; i++) {
    GameState.push({ name: GameDeviceDef[i].name, id: GameDeviceDef[i].id, lastState: GameDeviceDef[i].state, newState: GameDeviceDef[i].state, startStage: GameDeviceDef[i].startStage, endStage: GameDeviceDef[i].endStage, activeReg: GameDeviceDef[i].activeReg, solvedReg: GameDeviceDef[i].solvedReg, solved: false })
  }


  try {
    // ModBus
    const ModbusRTU = require("modbus-serial");
    // create an empty modbus client
    const client = new ModbusRTU();
    // open connection to a serial port
    client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 });
    // set timeout, if slave did not reply back
    client.setTimeout(400);
  } catch (err) {
    console.log(err)
  }
}
// Interval Function that calls ModBus

gameApp.intervalHandle = function() {
  //Get ModBus data of each device.
  for (var i = 0; i < GameDeviceDef.length; i++) {
    if (GameDeviceDef[i].id != 'sound') {
      // readPuzzleState(GameState[i]);
    }
  }

  //Push Admin commands to devices

  //OR Calculate new state and push updated state for game flow
  ProcessState();
  // Get updated state for changed devices and verify expected state.

}

function readPuzzleState(state) {
  // set ID of slave
  console.log("Reading Register on ID ", state.id)


  client.setID(state.id);
  // Reading InputRegisters (parameters of puzzle State read only)
  let val = client.readInputRegisters(0, state.laststate.IR.length)
    .then(function (dataIR) {
      for (let i = 0; i < dataIR.data.length; i++) {
        state.newstate.IR[i].value = dataIR.data[i];
      }
      console.log("INPUT REGISTER ", dataIR);
      // Reading Holding Registers (State of modifiable parameters)
      let val = client.readHoldingRegisters(0, state.laststate.HR.length)
        .then(function (dataHR) {
          for (let i = 0; i < dataHR.data.length; i++) {
            state.newstate.HR[i].value = dataHR.data[i];
          }
          console.log("HOLDING REGISTER", dataHR);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });

}

function writePuzzleState(gameState, callback) {
  var RegArray = [];
  for (var i = 0; i < gameState.newstate.HR.length; i++) {
    RegArray.push(gameState.newstate.HR[i].value)
  }
  client.writeRegisters(gameState.id, RegArray, function (err, data) {
    if (err) {
      return callback(err);
    }
    return callback();
  })
}

function ProcessState() {

}

//check that newstate is different to laststate and force newstate to puzzle
function ApplyAdmin() {

  for (var i = 0; i < GameState.length; i++) {
    for (var k = 0; k < GameState[i].laststate.HR.length; k++) {
      if (GameState[i].laststate.HR[k].value != GameState[i].newstate.HR[k].value) {
        writePuzzleState(GameState[i].id, function (err) {
          if (err) console.log(err);
          console.log("ADMIN SEND: ", GameState[i])
        });

      }
    }
  }
}



