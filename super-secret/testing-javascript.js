// open and close the side navigation on mobile
const sideNav = document.getElementById("sideNavigation");
const main = document.getElementById("main");
const open = document.getElementById("icoOpen");
const close = document.getElementById("icoClose");
var openCount = 0, closeCount = 0;
function openNav() {
    sideNav.classList.toggle("openNavSide");
    main.classList.toggle("openNavMain");
    open.classList.toggle("fade");
    openCount++;
    console.log("Navigation opened " + openCount + " times.");
}
function closeNav() {
    sideNav.classList.remove("openNavSide");
    main.classList.remove("openNavMain");
    open.classList.remove("fade");
    closeCount++;
    console.log("Navigation closed " + closeCount + " times.");
}
open.addEventListener("click", openNav);
close.addEventListener("click", closeNav);


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
