// ModBus
const ModbusRTU = require("modbus-serial");
// create an empty modbus client

const client = new ModbusRTU();
// open connection to a serial port
client.connectRTUBuffered("/dev/ttyS0", { baudRate: 9600}).
// set timeout, if slave did not reply back
//client.setTimeout(500);

then(function () {
	console.log("connected");
	client.setID(1);
	client.writeCoil ( 0, true)
		.then( function(err, data) {
    			console.log("Data: ", err, " " , data); 
//			process.exit();
});

        client.writeCoil ( 0, false)
                .then( function(err, data) {
                        console.log("Data: ", err, " " , data);
   //                     process.exit();
                });

}).catch(function(e) {
	console.log(e.message);
	process.exit(); 
})

