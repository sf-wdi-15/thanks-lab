var tiles = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    tiles.memory_tile_shuffle();
	for(var i = 0; i < tiles.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+tiles[i]+'\')"></div>';
	}
	document.getElementById('gameboard').innerHTML = output;
  console.log(output);
}

var start = document.getElementById("start");

start.onclick = function() {
  start.style.backgroundColor = "orange";
  newBoard();
  alert("Starting New Game!");
  console.log("Start Click Working");

};
                

function memoryFlipTile(tile, val){
	if(tile.innerHTML === "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length === 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("Board cleared... generating new board");
					document.getElementById('gameboard').innerHTML = "";
					newBoard();
				}
            } else {
              function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background =
                      'url(http://i.imgur.com/7xPop6n.jpg)';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(http://i.imgur.com/7xPop6n.jpg)';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
            }
        }
    }
}

window.onload = function() {
  alert("Welcome to Memory!!");
  console.log("JS Working");
};
  newBoard();
