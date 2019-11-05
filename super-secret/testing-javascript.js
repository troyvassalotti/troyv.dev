const sideNav = document.getElementById("sideNavigation");
const main = document.getElementById("main");
const icon = document.getElementById("icoOpen");
function openNav() {
    sideNav.style.width = "250px";
    main.style.marginLeft = "250px";
    icon.classList.toggle("fade");
}
function closeNav() {
    sideNav.style.width = "0";
    main.style.marginLeft = "0";
    icon.classList.toggle("fade")
}

var easterEgg1 = document.querySelector("#test-easterEgg1");
// var buttons = Array.from(document.querySelector(".button"));
function random(number) {
  return Math.floor(Math.random()*(number+1));
};
easterEgg1.onclick = function() {
  var rndCol1 = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  var rndCol2 = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  buttons.style.backgroundColor = rndCol1;
  buttons.style.color = rndCol2;
}

// easterEgg1.onclick = function changeColor(){
//   Array.from(document.querySelectorAll('button')).map(function(button) {
//     button.style.backgroundColor="green";
//   });
// }
