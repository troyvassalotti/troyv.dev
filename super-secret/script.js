/*
JQuery Core
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

JQuery UI
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

JQuery Mobile
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js"></script>

Bootstrap
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
*/

var easterEgg1 = document.querySelector("#easterEgg1");
function random(number) {
  return Math.floor(Math.random()*(number+1));
};
easterEgg1.onclick = function() {
  var rndCol1 = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  var rndCol2 = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.querySelector(".button").style.backgroundColor = rndCol1;
  document.querySelector(".button").style.color = rndCol2;
}
