// open and close the side navigation on mobile
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

// create a function that counts the number of times closeNav() happens
// then use that number below to display the navbar when changing view sizes on desktop
// if (closeNav() && document.getElementById("topNav").style.display === "none") {
//   openNav();
// };


// change the color of all buttons at once
var easterEgg1 = document.querySelector("#test-easterEgg1");
var buttons = document.querySelectorAll(".button");
function random(number) {
  return Math.floor(Math.random()*(number+1));
};
easterEgg1.onclick = function() {
  var rndCol1 = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  var rndCol2 = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  buttons.forEach(function(btn) {
    btn.style.backgroundColor = rndCol1;
    btn.style.color = rndCol2;
  });
};
