//Add support for udpating code based on window width

/******************************************************************************

Working: 
  -Have a grid generating function
  -Creates a card list and initializes pic index and array index (for card Id)
  -Have a prototype set up for cards to handle input when clicked
  -When clicked, the div background image changes to the card selected
  -When "Change Deck" is clicked, it changes the background of the cards
  -When "Change Grid" is clicked, it cycles through the pre-defined grids

Started:
  

Plan To:
  -Set up logic to check for matching conditions based on the card index
  -Set up code that will show/hide or replace background image
  -Look up animation and timer events
  -Shuffle function
  -Set up a button that will reset the grid
  -set up function to update Card css dimensions based on grid size
  -Add code to keep track of attempts
  -Add code to keep track of start and finish time
  -Add code to track how many found

******************************************************************************/
window.onload = function()
{
  var element = document.getElementById('changeGrid');
  element.onclick = changeGrid;

  element = document.getElementById('changeDeck');
  element.onclick = changeDeck;

  generateGrid();
}


function Card(arrIndex,picIndex, div)
{
  this.id = arrIndex;
  this.imgIndex = picIndex;
  this.isFound = false;
  this.div = div;
}

var currentDeckBackground = 0;
var currentGridSize = 0;
var gridSizes = 
        [
          [4,4],
          [4,6],
          [6,6],
          [6,8]
        ];


var deckBackImages = 
        [
          "url('./images/card_back/back_0.png')",
          "url('./images/card_front/front_0.png')"
        ];

var cardList = [];
var deckFrontImages = 
        [
          "url('./images/card_front/front_0.png')"
        ];




/******************************************************************************
  handleInput 
    
******************************************************************************/
var handleInput = function()
{
  this.style.backgroundImage = deckFrontImages[cardList[this.id].imgIndex];
};


/******************************************************************************
  generateGrid 
    1. calculates how many unique cards are needed
    1. sets up "for" loop based on grid dimensions
    2. creates divs
    3. instantiates new Cards
    4. pushes new Card to the cardList
    5. appends new div into the HTML page
******************************************************************************/
var generateGrid = function()
{
  // Reset game stats
  cardList = [];
  var node = document.getElementById('game');

  node.innerHTML = "";
 
  var numOfCardsNeeded = ( (gridSizes[currentGridSize][0] * 
                            gridSizes[currentGridSize][1]) / 2 );
  
  var newDiv = document.createElement("gameGrid");
  newDiv.id = "grid";
  newDiv.className = "flex-center";
  document.getElementById('game').appendChild(newDiv);

  for (var col = 0; col < gridSizes[currentGridSize][0]; col += 1)
  {
    newDiv = document.createElement("div");
    newDiv.id = "row_"+col;
    newDiv.className = "row";
    document.getElementById('grid').appendChild(newDiv);

    for (var row = 0, cardIndex = 0; row < gridSizes[currentGridSize][1]; 
                                                row += 2, cardIndex += 0)
    { 
      for (var i = 0; i < 2; i +=1)
      {
        newDiv = document.createElement("div"); 

        newDiv.className = "tile";
        newDiv.style.backgroundImage = deckBackImages[currentDeckBackground];
        newDiv.onclick = handleInput;
        newDiv.id = cardList.length;
        newDiv.innerHTML = newDiv.id;
        //newDiv.width = tile dimension
        //newDiv.height = newDiv.width;

        var tempCard = new Card(newDiv.id, cardIndex, newDiv);
        cardList.push(tempCard);

        document.getElementById("row_"+col).appendChild(cardList[newDiv.id].div);

      }
    }
  }  
};





/******************************************************************************
  changeDeck
    1. increments currentDeckBackground counter by one
    2. resets currentDeckBackground counter to 0 if it is >= deckBackImages.length
    3. iterates through cardList 
    4. changes background image where Card.isFound is false
******************************************************************************/
var changeDeck = function()
{
  currentDeckBackground += 1;

  if (currentDeckBackground >= deckBackImages.length)
  {
    currentDeckBackground = 0;
  }

  for (var i = 0;i < cardList.length; i +=1)
  {
    if (!cardList[i].isFound)
    {
      cardList[i].div.style.backgroundImage = deckBackImages[currentDeckBackground];
    }
  }
};




/******************************************************************************
  changeGrid
    1. increments currentGridSize counter by one
    2. resets currentGridSize counter to 0 if it is >= gridSizes.length
    3. regenerates the grid
******************************************************************************/
var changeGrid = function()
{
  currentGridSize += 1;

  if (currentGridSize >= gridSizes.length)
  {
    currentGridSize = 0;
  }

  generateGrid();
};