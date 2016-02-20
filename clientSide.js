//Denon client side scripts written by dryansweet

//Grabs value from volSlider and packages info for DenonMid
function volume()
     {
       var volValue = document.getElementById('vol').value;

       if (volValue < 10){
         connection.send('Vol MV0'+volValue);
       }
       else{
         connection.send('Vol MV'+volValue)
       }
       document.getElementById('sliderVal').innerHTML = volValue;
     };

//Grabs value from z2Slider and packages info for DenonMid
function z2volume()
          {
            var volValue = document.getElementById('z2vol').value;

            if (volValue < 10){
              connection.send('Vol z20'+volValue);
            }
            else{
              connection.send('Vol Z2'+volValue)
            }
            document.getElementById('z2sliderVal').innerHTML = volValue;
          };

/*
  grabs volume val from slider and
  increments/decrements(based on op) by units of 5
  Used for volButtons
*/
function volButton(op)
     {
       var volValue = document.getElementById('vol').value;

       switch (op) {
       case "-":
          volValue-=5;
        break;
       case "+":
        volValue = parseInt(volValue, 10)+5;
        break;
       default:
        alert("Bad vol() data");
       }

      if (volValue < 10){
        connection.send('Vol'+' '+'MV0'+volValue);
      }
      else{
        connection.send('Vol'+' '+'MV'+volValue)
      }
       document.getElementById('sliderVal').innerHTML = volValue;
       document.getElementById('vol').value=volValue;
}


//vol(op) for z2
function z2volButton(op)
{
       var volValue = document.getElementById('z2vol').value;
       switch (op) {
       case "-":
          volValue-=5;
        break;
       case "+":
        volValue = parseInt(volValue, 10)+5;
        break;
       default:
        alert("Bad z2vol() data");
       }

      if (volValue < 10){
        connection.send('Vol'+' '+'Z20'+volValue);
      }
      else{
        connection.send('Vol'+' '+'Z2'+volValue)
      }
       document.getElementById('z2vol').value=volValue;
}


/*
  Packages commands from html and send to WS
  useful for testing new commands or sending
  commands that don't merit a button
*/
function volToDenon(op)
{
  connection.send('Vol '+op);

};

function sourceToDenon(op)
{
  connection.send('source '+op);

};

function directToDenon(op)
{
  connection.send(op);

};

//queries volume on Denon allowing the page to be set
//appropriately
function getVol()
{
  connection.send('Vol '+'MV?');

};
