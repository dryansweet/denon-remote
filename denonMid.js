/*
 Written by dryansweet
 Communicates with webpage
 calls a helper script that forwards request
 to Denon
*/

/*
  Requires connection.js and commands.js
  Both files were reverse generated from CoffeeScript
  files created by jtangelder
*/
var command, connection;
connection = new (require('./lib/connection.js'));
command = new (require('./lib/commands.js'))(connection);




//Setup websocket connection with browser
var ws = require("nodejs-websocket")
var server = ws.createServer(function (conn) {

    console.log("New connection")
    conn.on("text", function (str) {

      var res = str.split(" ");



            var denon = require('./denon.js');
            switch(res[0]){
                case "MU?":
                  denon.mu(res, connection, command, conn);
                break;
                case "PW?":
                  denon.pw(res, connection, command, conn);
                break;
                case "Z2MU?":
                  denon.z2mu(res, connection, command, conn);
                break;
                case "Z2?":
                  denon.z2pw(res, connection, command, conn);
                break;
                case "Closer":
                  denon.closer(connection, command);
                  //denon.closer();
                break;
                case "Vol":
                  denon.passVolume(res, connection, command, conn);
                break;
                case "source":
                  denon.passInput(res, connection, command, conn);
                break;
                default:
                 conn.sendText("Unable to determine command type @denonMid.js");
                 console.log("Unable to determine command type @denonMid.js");
                }

        //Tester
        console.log("Received "+str)


    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(7001);
