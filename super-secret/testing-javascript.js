function openNav() {
    document.getElementById("sideNavigation").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("icoOpen").classList.toggle("fade");
}
function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("icoOpen").classList.toggle("fade")
}

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
