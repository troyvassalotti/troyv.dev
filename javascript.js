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
