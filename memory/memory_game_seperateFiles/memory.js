var allTiles = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];//indivdual tile values
var tileValues = []; //matching picks
var tileIDs = []; 
var tilesFlippedCounter = 0; //number of attempts. This will affect if tiles turn back over 
              //or stay open once paired

//var box = document.getElementsByClassName("square"); //

//var startGame = document.getElementById("start"); //Starts the game

//shuffle method
Array.prototype.memory_tile_shuffle = function () {
	var i = this.length, j, temp;
	while(--i > 0) {
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
};

//generate a new board
function newBoard () {
	tilesFlippedCounter = 0;
	var output = '';
	allTiles.memory_tile_shuffle();
	for(var i = 0; i < allTiles.length; i+=1) {
		output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\''+allTiles[i]+'\')"></div>';
	}
	document.getElementsByClassName("square").innerHTML = output;
}

//Flips the individual tile
function memoryFlipTile(box, val) {
	if(box.innerHTML === "" && tileValues.length < 2) {
		box.style.background = "white";
		box.innerHTML = val;
		if(tileValues.length === 0) {
			tileValues.push(val);
			tileIds.push(box.id);
		} else if (tileValues.length == 1) {
			tileValues.push(val);
			tileIds.push(box.id);
			if (tileValues[0] == tileValues[1]) {
				tilesFlippedCounter += 2;
				//clear both arrays
				tileValues = [];
				tileIds = [];
				// check to see if the whole board is cleared
				if(tilesFlippedCounter == tileValues.length) {
					alert("Board cleared... generating new board");
					document.getElementsByClassName("square").innerHTML = "";
					newBoard();
				}
			} else {
				var flip2Back = function () {
					//Flip the 2 tiles back over
					var box_1 = document.getElementById(tileIds[0]);
					var box_2 = document.getElementById(tileIds[1]);
					box_1.style.background = "green";
					box_1.innerHTML = "";
					box_2.style.background = "green";
					box_2.innerHTML = "";
					// Clear both arrays
					tilevalues = [];
					tileIds = [];
				};
				setTimeout(flip2Back, 700);
			}
		}
	}
}

window.onload = function () {
  alert("Welcome to my Memory Game!  Press the Start Button to Begin!");
  newBoard();
  
    
};




