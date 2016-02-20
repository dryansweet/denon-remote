//Javascript written by dryansweet
/*
  denon middleware-client based roughly on cli.js
  written by jtangelder
*/

//denon connect

//global vars for toggle
var muSt = false;
var pType;
var z2 =true;
var z2Mu =false;

//Establishes connection with Denon receiver
//Sends volume (res)
//get repsonse and send back to webPage via conn
exports.passVolume = function (res, connection, command, conn) {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  //hard coded IP address
  connection.connect( '192.168.0.31' || "denon", 23, function() {
    return process.stdout.write("connected to the receiver\r");
  });

  //send command to Denon
  //var doThis = res[1]+"\r";
    connection.send(res[1].toUpperCase());



   //Get response and forward to webpage
  //used for adaptive volume slider...hoping to branch into adaptive buttons
  connection.response(function(cmd, value) {

   var index, line, results;
   //Extracting Volume int.
   //Denon response is sent with 2|3 digits. 2 for whole 3 for half number
   // 34.5 == 345 && 35 == 35


     var valCon = value.split("");
     if (parseInt(valCon[0]<1), 10){
       volR = valCon[0]
     }
     var volR = valCon[0].concat(valCon[1])
     //var send = parseInt(volR, 10);

    if(res[1]="MV?"){
       conn.sendText(cmd+" "+volR);
    }

   });
};


//establishes connection with Denon
//Send input (res)

exports.passInput = function (res, connection, command, conn) {

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  //hard coded IP address
  connection.connect( '192.168.0.31' || "denon", 23, function() {
    return process.stdout.write("connected to the receiver\r");
  });

  //send command to Denon
  //var doThis = res[1]+"\r";
    connection.send(res[1].toUpperCase());


};

//Connects to Denon
//asks power state
//Send opposite command
exports.pw = function (res, connection, command, conn) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');


 //The following string is used for testing...prompts for IP
 //Could be useful for non-static Denon IP
 //Works for command line use NOT webpage
 //connection.connect(process.argv[2] || "denon", 23, function() {

  //hard coded IP address
  connection.connect( '192.168.0.31' || "denon", 23, function() {
    return process.stdout.write("connected to the receiver\r");
  });
  //Send question to Denon

   connection.send(res[1].toUpperCase());
   //get state response from Denon


  connection.response(function(cmd, value)
   {

     var index, line, results;
      pType=value;
     return process.stdout.write("-1 " + cmd + ": " + value + "\r");

  })

  switch (pType){
    case "STANDBY":
    //MUON
    var doThis ="PWON";
    conn.sendText("System On");
    connection.send(doThis.toUpperCase());
    break;
    case "ON":
    //MUOFF
    var doThis ="PWSTANDBY";
    conn.sendText("System off");
    connection.send(doThis.toUpperCase());
    break;
  }
};

//Connects to Denon
//asks z2power state and toggles
exports.z2pw = function (res, connection, command, conn) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  //hard coded IP address
  connection.connect( '192.168.0.31' || "denon", 23, function() {
    return process.stdout.write("connected to the receiver\r");
  });

  if(z2==false)//z2mute
  {
    connection.send("Z2ON");
    z2=true;
  }
  else//z2pw-true powOff
  {
    connection.send("Z2OFF");
    z2=false;
  }

};

//Connects to Denon
//Request mute state and toggles.
exports.mu = function (res, connection, command, conn){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  //hard coded IP address
  connection.connect( '192.168.0.31' || "denon", 23, function() {
    return process.stdout.write("connected to the receiver\r");
  });
  //Send question to Denon

  if(muSt==false)//mute
  {
    connection.send("MUON");
    muSt=true;
  }
  else//mu-true unmute
  {
    connection.send("MUOFF");
    muSt=false;
  }


};

//Connects to Denon
//Request z2mute state and toggles.
exports.z2mu = function (res, connection, command, conn){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  //hard coded IP address
  connection.connect( '192.168.0.31' || "denon", 23, function() {
    return process.stdout.write("connected to the receiver\r");
  });

  if(z2Mu==false)//z2mute
  {
    connection.send("Z2MUON");
    z2mu=true;
  }
  else//z2mu-true unmute
  {
    connection.send("Z2MUOFF");
    z2mu=false;
  }
};

//closes connection to Denon receiver
exports.closer = function (connection, command){

  connection.close();
}
