console.log("Hello World!");
console.log("Look here!");
var wakeUp = "IF YOU'RE READING THIS, YOU'VE BEEN IN A COMA FOR ALMOST 20 YEARS NOW. WE'RE TRYING A NEW TECHNIQUE. WE DON'T KNOW WHERE THIS MESSAGE WILL END UP IN YOUR DREAM, BUT WE HOPE WE'RE GETTING THROUGH. PLEASE WAKE UP. WE MISS YOU.";
// alert("Hey Hey Hey!")
// document.write(wakeUp);
var numberOfSweaters = " too many sweaters";
console.log(numberOfSweaters);
console.log(wakeUp);
// document.write(numberOfSweaters);
var numberOfCats = 2;
var numberOfPups = 23;
var volumeOfAnimals = numberOfCats * numberOfPups;
console.log(volumeOfAnimals);

var shoppingSpree = "You just bought";
var overhaul = shoppingSpree + numberOfSweaters;
console.log(overhaul);

function turtleFact() {
  console.log("Dana Carvey doesn't get enough credit");
}
turtleFact();

function callKitten (kittenName){
  console.log("Come here, " + kittenName + "!");
}
callKitten ("Mogar"); //outputs "Come here, Mogar!"

var a = 9;

function addNumbers(a, b) {
  console.log(a);
  console.log(b);
  console.log(a + b);
}
addNumbers(5, 7) //outputs 12

var c = 100;
var d = 90;
addNumbers(c, d);

addNumbers(a, d);

var sweaters = 3.14;
var threadCount = 5;
addNumbers(sweaters, threadCount);

function square(num) {
  return num * num;
}
var sum = addNumbers(7, 9);
var squareOfSum = square(sum);
console.log(squareOfSum);

console.log(squareOfSum);

console.log(square(addNumbers(7, 9)));

function squaredSum(a, b) {
  var sum = addNumbers(a, b);
  var squared = square(sum);
  return squared;
}

console.log('squaredSum', squaredSum(5, 12));
