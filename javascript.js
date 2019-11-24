// open and close the side navigation on mobile
const sideNav = document.getElementById("sideNavigation");
const main = document.getElementById("main");
const open = document.getElementById("icoOpen");
const close = document.getElementById("icoClose");
var openCount = 0, closeCount = 0;
function openNav() {
    sideNav.style.width = "250px";
    main.style.marginLeft = "250px";
    open.classList.toggle("fade");
    openCount++;
    console.log("Navigation opened " + openCount + " times.");
}
function closeNav() {
    sideNav.style.width = "0";
    main.style.marginLeft = "0";
    open.classList.toggle("fade");
    closeCount++;
    console.log("Navigation closed " + closeCount + " times.");
}
open.addEventListener("click", openNav);
close.addEventListener("click", closeNav);
