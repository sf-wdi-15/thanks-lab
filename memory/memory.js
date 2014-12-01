var letters = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var values = [];
var squares = []; //empty arrays
var clicked = 0;

Array.prototype.shuffle = function(){ //shuffle
  var i = this.length, j, temp;
    while(0 < i--){
      j = Math.floor(Math.random() * (i+1));
      temp = this[j];
      this[j] = this[i];
      this[i] = temp;
    }
}

function newGame(){ //new game
  clicked = 0;
  var output = '';
    letters.shuffle();
  for(var i = 0; i < letters.length; i+=1){
    output += '<div id="box_'+i+'" onclick="flipTile(this,\''+letters[i]+'\')"></div>';
  }
  document.getElementById('game').innerHTML = output;
}

function flipTile(tile,val){ //flip tiles
  if(tile.innerHTML == "" && values.length < 2){
    tile.style.background = 'transparent';
    tile.style.color = 'white';
    tile.innerHTML = val;
    if(values.length == 0){
      values.push(val);
      squares.push(tile.id);
    } else if(values.length == 1){
      values.push(val);
      squares.push(tile.id);
      if(values[0] == values[1]){
        clicked += 2;

        values = []; //clear game
          squares = [];

        if(clicked == letters.length){ //if completed
          alert("YOU DID IT");
          document.getElementById('game').innerHTML = "";
          newGame();
        }
      } else {
        function flip2Back(){ //flip tiles back each time
          var box_1 = document.getElementById(squares[0]);
          var box_2 = document.getElementById(squares[1]);
            box_1.innerHTML = "";
            box_2.innerHTML = "";

            values = []; //clear game
              squares = [];
        }
        setTimeout(flip2Back, 900); //time it stays before flipping back
      }
    }
  }
}