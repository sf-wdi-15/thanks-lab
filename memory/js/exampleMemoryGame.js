/**
 * Created by el-besto on 11/30/14.
 */
// Scripted By Adam khoury in connection with the following video tutorial:
// http://www.youtube.com/watch?v=c_ohDPWmsM0

var memoryArr = ['A','A','B','B', 'C', 'C', 'D', 'D', 'E', 'E','F','F', 'G', 'G', 'H', 'H'];
var memoryValues = [];
var memoryTileIds = [];
var tilesFlipped = 0;
var totalClicks = 0;



window.onload = function(){
    newBoard();
    //resetButton.onclick = 'newBoard();';
    var resetButton = document.getElementById('resetButton');
    resetButton.onclick = function(element){newBoard();};
    var totalClickDisplay = document.getElementById('totalClickDisplay');
    totalClickDisplay.innerHTML = "Total Attempts:<br>" + totalClicks;
};




// add a randomizer/shuffle method to the Array prototype.
// not good practice. Should create a new object instead that functions as an array would.
Array.prototype.memoryTileShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

// this function resets the tilesFlipped to 0
// initializes an empty string that will temporary hold the html (gameBoard divs) until they are ready to be injected
// shuffles the Array's elements
// places each element into a div, assigns the id and onclick function to each div
function newBoard(){
    tilesFlipped = 0;
    totalClicks = 0;
    var output = '';
    memoryArr.memoryTileShuffle();
    for(var i = 0; i < memoryArr.length; i++){
        output += '<div id="tile_'+i+'" class="large-2" onclick="memoryFlipTile(this,\''+memoryArr[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}

// memoryFlipTile is the gameplay matching function.
// first it checks if it is the first turn of play, in which case it adds the current value to the memoryValues array
function memoryFlipTile(tile,val){
    if(tile.innerHTML === "" && memoryValues.length < 2){
        tile.style.background = 'orangered';
        tile.innerHTML = val;
        // checks to see if its the first turn, if so it pushes the value to the memoryValues array
        if(memoryValues.length === 0){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
            totalClicks ++;
            totalClickDisplay.innerHTML = "Total Attempts:<br>" + totalClicks;
        // if the memoryValues array already has a value, then it pushes the value and then checks for a match
        } else if(memoryValues.length === 1){
            memoryValues.push(val);
            memoryTileIds.push(tile.id);
            totalClicks ++;
            totalClickDisplay.innerHTML = "Total Attempts:<br>" + totalClicks;
            if(memoryValues[0] === memoryValues[1]){
                tilesFlipped += 2;
                // Clear both arrays
                memoryValues = [];
                memoryTileIds = [];
                // Check to see if the whole board is cleared
                if(tilesFlipped === memoryArr.length){
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back(){
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memoryTileIds[0]);
                    var tile_2 = document.getElementById(memoryTileIds[1]);
                    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memoryValues = [];
                    memoryTileIds = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}
