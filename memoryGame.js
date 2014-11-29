var originalArray = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"];
var one = document.getElementById('div_1');
var two = document.getElementById('div_2');
var three = document.getElementById('div_3');
var four = document.getElementById('div_4');
var five = document.getElementById('div_5');
var six = document.getElementById('div_6');
var seven = document.getElementById('div_7');
var eight = document.getElementById('div_8');
var nine = document.getElementById('div_9');
var ten = document.getElementById('div_10');
var eleven = document.getElementById('div_11');
var twelve = document.getElementById('div_12');
var thirteen = document.getElementById('div_13');
var fourteen = document.getElementById('div_14');
var fifteen = document.getElementById('div_15');
var sixteen = document.getElementById('div_16');
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
valuesArray = shuffle(originalArray);
console.log(valuesArray);


// Assign values to each square array with [value, position]
var squareZero = [valuesArray[0], 0];
var squareOne = [valuesArray[1], 1];
var squareTwo = [valuesArray[2], 2];
var squareThree = [valuesArray[3], 3];
var squareFour = [valuesArray[4], 4];
var squareFive = [valuesArray[5], 5];
var squareSix = [valuesArray[6], 6];
var squareSeven = [valuesArray[7], 7];
var squareEight = [valuesArray[8], 8];
var squareNine = [valuesArray[9], 9];
var squareTen = [valuesArray[10], 10];
var squareEleven = [valuesArray[11], 11];
var squareTwelve = [valuesArray[12], 12];
var squareThirteen = [valuesArray[13], 13];
var squareFourteen = [valuesArray[14], 14];
var squareFifteen = [valuesArray[15], 15];
var squareSixteen = [valuesArray[16], 16];



console.log(squareZero);
console.log(squareOne);
console.log(squareTwo);
console.log(squareThree);
console.log(squareFour);
console.log(squareFive);
console.log(squareSix);
console.log(squareSeven);
console.log(squareEight);
console.log(squareNine);
console.log(squareTen);
console.log(squareEleven);
console.log(squareTwelve);
console.log(squareThirteen);
console.log(squareFourteen);
console.log(squareFifteen);


// Play
one.onclick = function(event) {
	one.innerHTML = valuesArray[0];
	lastClicked.push(squareZero);
	isMatchMade();
	console.log(lastClicked);
};
two.onclick = function(event) {
	two.innerHTML = valuesArray[1];
	lastClicked.push(squareOne);
	isMatchMade();
	console.log(lastClicked);
};
three.onclick = function(event) {
	three.innerHTML = valuesArray[2];
	lastClicked.push(squareTwo);
	isMatchMade();
	console.log(lastClicked);
};
four.onclick = function(event) {
	four.innerHTML = valuesArray[3];
	lastClicked.push(squareThree);
	isMatchMade();
	console.log(lastClicked);
};
five.onclick = function(event) {
	five.innerHTML = valuesArray[4];
	lastClicked.push(squareFour);
	isMatchMade();
	console.log(lastClicked);
};
six.onclick = function(event) {
	six.innerHTML = valuesArray[5];
	lastClicked.push(squareFive);
	isMatchMade();
	console.log(lastClicked);
};
seven.onclick = function(event) {
	seven.innerHTML = valuesArray[6];
	lastClicked.push(squareSix);
	isMatchMade();
	console.log(lastClicked);
};
eight.onclick = function(event) {
	eight.innerHTML = valuesArray[7];
	lastClicked.push(squareSeven);
	isMatchMade();
	console.log(lastClicked);
};
nine.onclick = function(event) {
	nine.innerHTML = valuesArray[8];
	lastClicked.push(squareEight);
	isMatchMade();
	console.log(lastClicked);
};
ten.onclick = function(event) {
	ten.innerHTML = valuesArray[9];
	lastClicked.push(squareNine);
	isMatchMade();
	console.log(lastClicked);
};
eleven.onclick = function(event) {
	eleven.innerHTML = valuesArray[10];
	lastClicked.push(squareTen);
	isMatchMade();
	console.log(lastClicked);
};
twelve.onclick = function(event) {
	twelve.innerHTML = valuesArray[11];
	lastClicked.push(squareEleven);
	isMatchMade();
	console.log(lastClicked);
};
thirteen.onclick = function(event) {
	thirteen.innerHTML = valuesArray[12];
	lastClicked.push(squareTwelve);
	isMatchMade();
	console.log(lastClicked);
};
fourteen.onclick = function(event) {
	fourteen.innerHTML = valuesArray[13];
	lastClicked.push(squareThirteen);
	isMatchMade();
	console.log(lastClicked);
};
fifteen.onclick = function(event) {
	fifteen.innerHTML = valuesArray[14];
	lastClicked.push(squareFourteen);
	isMatchMade();
	console.log(lastClicked);
};
sixteen.onclick = function(event) {
	sixteen.innerHTML = valuesArray[15];
	lastClicked.push(squareFifteen);
	isMatchMade();
	console.log(lastClicked);
};

// Check to see if match is made
var isMatchMade = function() {
	if (lastClicked.length === 1) {
		alert("Click another");
		return;
	} else if ((lastClicked[0][0]) === (lastClicked[1][0])) {
		alert("leave this pair");
		lastClicked = [];
		return;
	} else if ((lastClicked[0][1]) != (lastClicked[1][1]))  {
	
		if ((lastClicked[0][1] === 0) || (lastClicked[1][1] === 0)) {
			one.innerHTML = "";
		}
		if ((lastClicked[0][1] === 1) || (lastClicked[1][1] === 1)) {
			two.innerHTML = "";
		}
		if ((lastClicked[0][1] === 2) || (lastClicked[1][1] === 2)) {
			three.innerHTML = "";
		}
		if ((lastClicked[0][1] === 3) || (lastClicked[1][1] === 3)) {
			four.innerHTML = "";
		}
		if ((lastClicked[0][1] === 4) || (lastClicked[1][1] === 4)) {
			five.innerHTML = "";
		}
		if ((lastClicked[0][1] === 5) || (lastClicked[1][1] === 5)) {
			six.innerHTML = "";
		}
		if ((lastClicked[0][1] === 6) || (lastClicked[1][1] === 6)) {
			seven.innerHTML = "";
		}
		if ((lastClicked[0][1] === 7) || (lastClicked[1][1] === 7)) {
			eight.innerHTML = "";
		}
		if ((lastClicked[0][1] === 8) || (lastClicked[1][1] === 8)) {
			nine.innerHTML = "";
		}
		if ((lastClicked[0][1] === 9) || (lastClicked[1][1] === 9)) {
			ten.innerHTML = "";
		}
		if ((lastClicked[0][1] === 10) || (lastClicked[1][1] === 10)) {
			eleven.innerHTML = "";
		}
		if ((lastClicked[0][1] === 11) || (lastClicked[1][1] === 11)) {
			twelve.innerHTML = "";
		}
		if ((lastClicked[0][1] === 12) || (lastClicked[1][1] === 12)) {
			thirteen.innerHTML = "";
		}
		if ((lastClicked[0][1] === 13) || (lastClicked[1][1] === 13)) {
			fourteen.innerHTML = "";
		}
		if ((lastClicked[0][1] === 14) || (lastClicked[1][1] === 14)) {
			fifteen.innerHTML = "";
		}
		if ((lastClicked[0][1] === 15) || (lastClicked[1][1] === 15)) {
			sixteen.innerHTML = "";
		}
		console.log(lastClicked);
		lastClicked = []; 
		console.log(lastClicked);

}

};

//Check for win
/*var checkForWin = function (arr, arr2) {
	if (arr === arr2) {
		alert("Game Over!");
		return true;
	}
}
*/

// Delay isMatchMade function
//setTimeout(flipBackOver, 2000);

 reset.onclick = function (event) {
    location.reload();
}

