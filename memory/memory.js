//Add support for udpating code based on window width

/******************************************************************************

Working: 
  -Have a grid generating function
  -Creates a card list and initializes pic index and array index (for card Id)
  -Have a prototype set up for cards to handle input when clicked
  -When clicked, the div background image changes to the card selected
  -When "Change Deck" is clicked, it changes the background of the cards
  -When "Change Grid" is clicked, it cycles through the pre-defined grids
  -Added more pictures to both the front and back folders
  -Has logic to track whether or not 2 cards match
  -Set up timer to keep the cards revealed for a set interval if there is no match
  -Player can change the interval that cards stay revealed (1-5 seconds)
  -Fixed bug where the images would only show if a pair was found
  -Timer that displays seconds, minutes, hours
  -Player object that will keep track of found and attempts

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
  -Change back background color to black
  -Turn "grid" into an object that will generate a grid if you pass in a few values
  -Change all game variables into an object
  -Add timer and grid to a library for reuse
  -Make timer display generic to count any interval and reset 


******************************************************************************/


window.onload = function()
{
  // Sandbox area to try out random code 
  var temp = document.getElementById('changeGridButton');
  temp.onclick = changeGrid;

  
  temp = document.getElementById('changeDeckButton');
  temp.onclick = changeDeck;

  temp = document.getElementById('changeLevel');
  temp.onclick = changeLevel;
  
  temp = numberOfFrontImages; // # of files in card_front directory
  while (temp--)
  {
    deckFrontImages.push("url('./images/card_front/front_"+ temp + ".png')");
  }
  
  temp = numberOfBackImages; // # of files in the card_back directory
  while (temp--)
  {
    deckBackImages.push("url('./images/card_back/back_"+ temp + ".png')");
  }

  timerDisplay = document.getElementById('timerDisplay');
  player1Display = document.getElementById('player1Display');
  player2Display = document.getElementById('player2Display');

  generateGrid();

}

function Card(arrIndex,cardIndex, notFound)
{
  this.index = arrIndex;
  this.imgIndex = cardIndex;
  this.notFound = notFound;
}

function Player(found, attempts)
{
  this.cardFoundCount = found;
  this.attemptsCount = attempts;
}


var gridSizes = 
        [
          [4,6],
          [6,6],
          [8,6],
          [10,6]
        ];
var deckFrontImages = [];
var deckBackImages = [];
var cardList = [];
var card1ImageIndex = [{},{}];
// Need to find a way to getLength(image/frontAndBack_directory)
var numberOfFrontImages = 50;
var numberOfBackImages = 6; 
var currentDeckBackground = 0;
var currentGridSize = 0;
var currentCardImage = {};
var currentCardIndex = {};
var currentLevel = 1000;
var cardFoundCount = 0;
var attemptsCount = 0;

var canClick = true;

var startTime = 0;
var secondCount = 0;
var minuteCount = 0;
var hourCount = 0;
var intervalID;
var startTime = 0;

var player1 = new Player(0,0);
var player2 = new Player(0,0);



/******************************************************************************
  handleInput 
    

******************************************************************************/


/******************************************************************************
  updateTimer
    1. gets the seconds since the timer was started
    2. resets seconds and minutes if it exceeds 60
    3. updates seconds, minutes, and hours displays
******************************************************************************/

var updateTimer = function()
{

  secondCount = Math.floor( (new Date() - startTime) / 1000);

  if (secondCount > 60)
  {
    startTime = new Date();
    secondCount = 0;
    minuteCount += 1;
  }

  if (minuteCount > 60)
  {
    minuteCount = 0;
    hourCount += 1;
  }

  if (secondCount < 10)
  {
    if (secondCount[0] !== 0)
    {
       secondCount = "0" + secondCount.toString();      
    }
  }
 
  if (minuteCount < 10 && minuteCount !== "00")
  {
     minuteCount = "0" + minuteCount.toString();      
  }
  else
  {
    minuteCount = "00";
  }

  if (hourCount < 10 && hourCount !== "00")
  {
    if (hourCount[0] !== 0)
    {
       hourCount = "0" + hourCount.toString();      
    }
  }
  else
  {
    hourCount = "00";
  }

  timerDisplay.innerHTML = hourCount + " : " + 
                      minuteCount + " : " + 
                      secondCount;
};


var isPlayer1 = true;

var handleInput = function()
{

  if (isPlayer1)
  {
    if (intervalID === undefined)
    {
      intervalID = window.setInterval(updateTimer,1000);
      intervalId = "";
      startTime = new Date();
    }

    if (canClick)
    {
      if (cardList[this.id].notFound)
      {
        this.style.backgroundImage = deckFrontImages[cardList[this.id].imgIndex];

        if (isNaN(currentCardImage))
        {
          currentCardImage = cardList[this.id].imgIndex;
          currentCardIndex = this.id;
        }

        else
        {
          if (currentCardImage === cardList[this.id].imgIndex)
          {
            cardList[currentCardIndex].notFound = false;
            cardList[this.id].notFound = false;
            player1.cardFoundCount += 1;

          }

          else
          {
            canClick = false;
            var timeoutID = window.setTimeout(updateGrid, currentLevel);
          }

          currentCardImage= {};
          player1.attemptsCount+=1 ;
          isPlayer1 = false;
        }
      }
    }
  }

  else
  {
    if (intervalID === undefined)
    {
      intervalID = window.setInterval(updateTimer,1000);
      intervalId = "";
      startTime = new Date();
    }

    if (canClick)
    {
      if (cardList[this.id].notFound)
      {
        this.style.backgroundImage = deckFrontImages[cardList[this.id].imgIndex];

        if (isNaN(currentCardImage))
        {
          currentCardImage = cardList[this.id].imgIndex;
          currentCardIndex = this.id;
        }

        else
        {
          if (currentCardImage === cardList[this.id].imgIndex)
          {
            cardList[currentCardIndex].notFound = false;
            cardList[this.id].notFound = false;
            player2.cardFoundCount += 1;

          }

          else
          {
            canClick = false;
            var timeoutID = window.setTimeout(updateGrid, currentLevel);
          }

          currentCardImage= {};
          player2.attemptsCount+=1 ;
          isPlayer1 = true;
        }
      }
    }
  }


  // If all cards are found
  if (cardFoundCount === numOfCardsNeeded )
  {

  }

  player1Display.innerHTML = player1.cardFoundCount + " : " + player1.attemptsCount;
  player2Display.innerHTML = player2.cardFoundCount + " : " + player2.attemptsCount;
};



/******************************************************************************
  updateGrid
    1. iterates through the cardList
    2. updates div background image according to whether it notFound
******************************************************************************/

var updateGrid = function()
{
  
  for (var i = 0, j = cardList.length; i < j; i +=1)
  {
    var c = document.getElementById(cardList[i].index);

    if (cardList[i].notFound)
    {
       c.style.backgroundImage = deckBackImages[currentDeckBackground];
    }
    else
    {
      c.style.backgroundImage = deckFrontImages[cardList[i].imgIndex]; 
     
    }
  }

  timeoutID = window.setTimeout(function() { canClick = true;}, 50);

};
var numOfCardsNeeded ;

/******************************************************************************
  generateGrid 
    1. calculates how many unique cards are needed
    2. sets up "for" loop based on grid dimensions
    3. creates divs
    4. instantiates new Cards
    5. pushes new Card to the cardList
    6. appends new div into the HTML page
******************************************************************************/


var generateGrid = function()
{
  // Reset game stats
  cardList = [];
  var node = document.getElementById('game');

  node.innerHTML = "";
 
  numOfCardsNeeded = ( (gridSizes[currentGridSize][0] * 
                            gridSizes[currentGridSize][1]) / 2 );
  
  var cardIndex = 0;

  var newDiv = document.createElement("gameGrid");
  newDiv.id = "grid";
  newDiv.className = "grid";
  document.getElementById('game').appendChild(newDiv);

  for (var col = 0; col < gridSizes[currentGridSize][0]; col += 1)
  {
    newDiv = document.createElement("div");
    newDiv.id = "row_"+col;
    newDiv.className = "row";
    document.getElementById('grid').appendChild(newDiv);

    for (var row = 0; row < gridSizes[currentGridSize][1]; 
                                      row += 2, cardIndex += 1)
    { 
      for (var i = 0; i < 2; i +=1)
      {
        newDiv = document.createElement("div"); 

        newDiv.className = "tile";
        newDiv.style.backgroundImage = deckBackImages[currentDeckBackground];
        newDiv.onclick = handleInput;
        newDiv.id = cardList.length;
        //newDiv.width = tile dimension
        //newDiv.height = newDiv.width;

        var tempCard = new Card(newDiv.id, cardIndex,true);
        cardList.push(tempCard);

        document.getElementById("row_"+col).appendChild(newDiv);

      }
    }
  } 


};

/******************************************************************************
  changeLevel
    1. increments currentLevel by 1000
    -currentLevel is used in handleInput() as the time interval (1000 = 1 sec)
    2. resets to 1 second if currentLevel exceeds 5000 ms (5 seconds)
******************************************************************************/
var changeLevel = function()
{
  // add another second to the clock
  currentLevel += 1000;

  // if current level is set to 5 seconds, reset 
  if (currentLevel > 5000)
  {
    // reset to 1 second 
    currentLevel = 1000;
  }
};



/******************************************************************************
  changeDeck
    1. increments currentDeckBackground counter by one
    2. resets currentDeckBackground counter to 0 if it is >= deckBackImages.length
    3. iterates through cardList 
    4. changes background image where Card.notFound is false
******************************************************************************/
var changeDeck = function()
{
  currentDeckBackground += 1;

  if (currentDeckBackground >= deckBackImages.length)
  {
    currentDeckBackground = 0;
  }

  updateGrid();
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