// open and close the side navigation on mobile
const sideNav = document.getElementById("sideNavigation");
const main = document.getElementById("main");
const icon = document.getElementById("icoOpen");
var openCount = 0, closeCount = 0;
function openNav() {
    sideNav.style.width = "250px";
    main.style.marginLeft = "250px";
    icon.classList.toggle("fade");
    openCount++;
    console.log("Navigation opened " + openCount + " times.");
}
function closeNav() {
    sideNav.style.width = "0";
    main.style.marginLeft = "0";
    icon.classList.toggle("fade");
    closeCount++;
    console.log("Navigation closed " + closeCount + " times.");
}
// create a new function to call openNav when closeNav has been called at least once and the viewport gets higher than 850px.

/*
function myFunction(x) {
  if (x.matches) { // If media query matches
    main.style.marginLeft = 0;
    openNav();
  };
};

var x = window.matchMedia("(min-width: 850px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state change
*/


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
    btn.style.transition = ".3s " + "linear";
  });
};
// NOTE: this changes inline css - need to think about creating classes for each color combo instead of variables.
// create color pairings from my palette, assign them to variables, create a new function to switch through them.
