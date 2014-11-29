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
var clickedArray = [];
var lastClicked = [];
var valuesArray = [];
var numFlipped = 0;

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

// Sets values array to determine winning squares
valuesArray = shuffle(originalArray);
console.log(valuesArray);


one.onclick = function(event) {
	flip(one, valuesArray[0]);
	console.log(lastClicked);
};
two.onclick = function(event) {
	flip(two, valuesArray[1]);
	console.log(lastClicked);
};
three.onclick = function(event) {
	flip(three, valuesArray[2]);
};
four.onclick = function(event) {
	flip(four, valuesArray[3]);
};
five.onclick = function(event) {
	flip(five, valuesArray[4]);
};
six.onclick = function(event) {
	flip(six, valuesArray[5]);
};
seven.onclick = function(event) {
	flip(seven, valuesArray[6]);
};
eight.onclick = function(event) {
	flip(eight, valuesArray[7]);
};
nine.onclick = function(event) {
	flip(nine, valuesArray[8]);
};
ten.onclick = function(event) {
	flip(ten, valuesArray[9]);
};
eleven.onclick = function(event) {
	flip(eleven, valuesArray[10]);
};
twelve.onclick = function(event) {
	flip(twelve, valuesArray[11]);
};
thirteen.onclick = function(event) {
	flip(thirteen, valuesArray[12]);
};
fourteen.onclick = function(event) {
	flip(fourteen, valuesArray[13]);
};
fifteen.onclick = function(event) {
	flip(fifteen, valuesArray[14]);
};
sixteen.onclick = function(event) {
	flip(sixteen, valuesArray[15]);
};

// Card flip function
function flip (square, value) {
	if(lastClicked.length < 2) {
		square.innerHTML = value;
		if (lastClicked.length === 0) {
			lastClicked.push(value);
			clickedArray.push(square);
		} else if(lastClicked.length == 1){
			lastClicked.push(value);
			clickedArray.push(square);
			//Check for match
			if(lastClicked[0] == lastClicked[1]){
				//alert("You've made a match");
				numFlipped += 2;
				lastClicked = [];
				clickedArray = [];
				//Check for end of game
				if(numFlipped == originalArray.length){
					alert("Game Over! Congratulations! The game will automatically restart.");
					location.reload();
				}
			} else {
				function flipBack() {
					var firstSquare = document.getElementById(clickedArray[0].id);
					var secondSquare = document.getElementById(clickedArray[1].id);
					firstSquare.innerHTML = "";
				    secondSquare.innerHTML = "";
				    lastClicked = [];
            	    clickedArray = [];
				}
				setTimeout(flipBack, 1000);
			}
		}
	}
};

reset.onclick = function (event) {
    location.reload();
}

