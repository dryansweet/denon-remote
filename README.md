denon-remote (web application)
============

Built largely off jtangelder's contribution @ https://github.com/jtangelder/denon-remote.git

Send/get commands from a Denon AV receiver over a network connection via webPage.
In the file protocol.pdf you can find all the commands and responses from the device. 

Install [Node](http://nodejs.org) and install websocket (npm install websocket)

Start server process with terminal/node. 
In the containing directory on node enter:
"node denonMid.js"

After this point you can locally launch the webpage and send commands to the receiver. 
(webpage>clientSide.js>denonMid.js>denon.js>Denon AV)


## How it works
The WebApp directs user input to a server instance that is running on the same network as the Denon. The server then sends telnet commands to the receiver. 

Built in samples include source, power, and volume. All commands (if syntaxed according protocol.pdf) can be sent via the text box near the bottom of the page.

## Code sample
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
