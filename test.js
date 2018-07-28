// ModBus
const ModbusRTU = require("modbus-serial");
// create an empty modbus client
const client = new ModbusRTU();
// open connection to a serial port
client.connectRTUBuffered("/dev/ttyS0", { baudRate: 9600 });
// set timeout, if slave did not reply back
client.setTimeout(500);

client.writeRegisters ( 1, 100, function(err, data) {
    if (err) console.log("Error", err);
  });