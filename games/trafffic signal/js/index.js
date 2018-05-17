

function changeToRed () {
  reset(); 
  $('#stopLight').css('background-color', 'red');
}

function changeToGreen () {
  reset(); 
  $('#goLight').css('background-color', 'green');
}

function changeToYellow () {
  reset(); 
  // if this has a dollar sign it will not work because it is defined in JS?
  $('#slowLight').css('background-color', 'yellow');
}

function reset () {
  $('#slowLight').css('background-color', 'black');
  $('#goLight').css('background-color', 'black');
  $('#stopLight').css('background-color', 'black')
}

function allOn () {
  $('#slowLight').css('background-color', 'yellow');
  $('#goLight').css('background-color', 'green');
  $('#stopLight').css('background-color', 'red')
}


$('#stopButton').click(changeToRed);
$('#slowButton').click(changeToYellow);
$('#goButton').click(changeToGreen);
$('#onButton').click(allOn);
$('#offButton').click(reset);