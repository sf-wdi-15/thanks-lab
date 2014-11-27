//Add support for udpating code based on window width

/******************************************************************************

Working: 
  -Have a grid generating function
  -Creates a card list and initializes pic index and array index (for card Id)
  -Have a prototype set up for cards to handle input when clicked

Started:
  -An array that will story the different types of grid sizes (when clicked)
  -An array that stores all the deck images (back of the cards) so user can switch
  -An array that will store all the front of the card images to match

Plan To:
  -Set up logic to check for matching conditions based on the card index
  -Set up code that will show/hide or replace background image
  -Look up animation and timer events

******************************************************************************/
window.onload = function()
{
  setUpDeck();
  generateGrid();
}

var cardList = [];

var currentGridSize = 
[
  [4,4],
  [4,6],
  [6,6],
  [6,8]
];

var deckImages = 
[
  "url('./images/card_back/back_0.png')"
];

function Card(arrIndex,picIndex)
{
  this.id = arrIndex;
  this.imgIndex = picIndex;
  this.isFound = false;

}

Card.prototype.handleInput = function()
{
};

var setUpDeck = function()
{
  
  // Need to know how many unique cards need to be generated
 
  // # of unique cards needed = board's area divided by 2
  var numOfCardsNeeded = ( (currentGridSize[0] * 
                          currentGridSize[1]) / 2 );


  for (var arrIndex = 0, cardIndex =0;      
           cardIndex < numOfCardsNeeded;    
           arrIndex += 2, cardIndex += 1) 
  {
    for (var i = 0; i < 2; i +=1)
    {
      var tempCard = new Card(arrIndex+i, cardIndex);
      cardList.push(tempCard);
    }
  }

};


// Generate Grid based on the current 
var generateGrid = function()
{
  for (var col = 0; col < currentGridSize[0]; col += 1)
  {
    var newDiv = document.createElement("div");
    newDiv.id = "row_"+col;
    newDiv.className = "row";
    document.getElementById('grid').appendChild(newDiv);

    for (var row = 0; row < currentGridSize[1]; row += 1)
    {  
      newDiv = document.createElement("div"); 
      newDiv.className = "tile";
      newDiv.innerHTML = "LJ";
      // newDiv.style.backgroundImage = deckImages[0];
      // newDiv.onclick = handleInput;
      newDiv.id = "b_"+row;
      newDiv.innerHTML = newDiv.id;
      //newDiv.width = tile dimension
      //newDiv.height = newDiv.width;
            
      document.getElementById("row_"+col).appendChild(newDiv);
    }
  }  
};






