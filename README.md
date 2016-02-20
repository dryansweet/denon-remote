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

##Recomended changes
Currently the webPage is pointing to localhost for the websocket connection. Assuming you would like access the web interface from another device you need to move you html and clientSide.js to host directory (Ex /var/www...) and change the IP address to you hosting devices IP 

"var connection = new WebSocket('ws://localhost:7001');"  to "var connection = new WebSocket('ws://192.168.0.2:7001');"
Obviously, a static IP for the host ideal.

Additionally, the Denon IP is assumed to be "192.168.0.31" this may need to be changed in your implemenation. I'm working on a prompt that asks for the Denon's IP and assigns when a command is passed. 

