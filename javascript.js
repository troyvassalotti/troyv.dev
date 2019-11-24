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

// create a secret button to change button colors
var easterEgg1 = document.getElementById("egg1btn");
var buttons = document.querySelectorAll(".button");
function random(number) {
  return Math.floor(Math.random()*(number+1));
};
function changeColor() {
  var rndCol1 = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  var rndCol2 = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  buttons.forEach(function(btn) {
    btn.style.backgroundColor = rndCol1;
    btn.style.color = rndCol2;
    btn.style.transition = ".3s linear";
  });
};
easterEgg1.addEventListener("click", changeColor);
