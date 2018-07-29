var serialport = require("serialport");

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var FlowControl1 = new Gpio(4, 'out');
var FlowControl2 = new Gpio(5, 'out');
 
console.log("GPIO ", Gpio.accessible);
  FlowControl1.writeSync(1);
  FlowControl2.writeSync(1);


var portName = '/dev/ttyS0'; //This is the standard Raspberry Pi Serial port

var readData = ''; //Array to hold the values read in from the port

var sp = new serialport(portName, {
  baudRate: 9600,
//  dataBits: 8,
//  parity: 'none',
//  stopBits: 1,
//  flowControl: false
});

sp.on("open", function () {
    console.log('Port is open');
    sp.write('Message');

})
