window.onload = function(){  
	//alert("Loaded");

var originalArray = ["1", "1", "2", "2"];
var one = document.getElementById('div_1');
var two = document.getElementById('div_2');
var three = document.getElementById('div_3');
var four = document.getElementById('div_4');
var lastClicked = [];

//Function that makes the array of winning numbers
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Sets values array to determine value behind each square
var valuesArray = shuffle(originalArray);
console.log(valuesArray);
//


// Function that makes a square
var makeSquare = function (value, position) {
	this.value = value;
	this.position = position;
};
	
// Make all squares 
var square1 = new makeSquare(valuesArray[0], 1);
var square2 = new makeSquare(valuesArray[1], 2);
var square3 = new makeSquare(valuesArray[2], 3);
var square4 = new makeSquare(valuesArray[3], 4);

console.log(square1);
console.log(square2);
console.log(square3);
console.log(square4);


// For each value in the array give me back a new Object

var makeAllObjects = function(array) {
	var j = 1;
	for (var i = 1; i < array; i++) {
		var square = new makeSquare(valuesArray[i], j);
	}
}




// Play
one.onclick = function(event) {
	one.innerHTML = valuesArray[0];
	checkForWin(lastClicked, (valuesArray[0]));
	lastClicked = valuesArray[0];
	console.log(lastClicked);
}
two.onclick = function(event) {
	two.innerHTML = valuesArray[1];
	checkForWin(lastClicked, (valuesArray[1]));
	lastClicked = valuesArray[1];
	console.log(lastClicked);
}
three.onclick = function(event) {
	three.innerHTML = valuesArray[2];
	checkForWin(lastClicked, (valuesArray[2]));
	lastClicked = valuesArray[2];
	console.log(lastClicked);
}
four.onclick = function(event) {
	four.innerHTML = valuesArray[3];
	checkForWin(lastClicked, (valuesArray[3]));
	lastClicked = valuesArray[3];
	console.log(lastClicked);
}


// Check to see if match is made

var checkForWin = function (arr, arr2) {
	if (arr === arr2) {
		alert("Game Over!");
		return true;
	}
}

 reset.onclick = function (event) {
    location.reload();
}

}; // End of onload

