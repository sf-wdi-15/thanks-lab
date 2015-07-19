var tiles = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
var matches = [];
var tile_flipped = 0;

function newBoard(){
  tiles_flipped = 0;
  var output = '';
  tiles.memory_tile_shuffle();
  for(var i = 0; i < tiles.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+tiles[i]+'\')"></div>';
  }
}

Array.prototype.memory_tile_shuffle = function(){
  var i = this.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

var box = document.getElementsByClassName("square");

window.onload = function() {
  alert("Let's Play A Memory Game");
  newBoard();
  
  box.onclick = function() {
    box.style.background = "white";
  };
  
};