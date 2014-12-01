/******************************************************************************

Done: 
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
  -Message Bar that will give player's game status and icon details
  -Settings icons that react to onmouseenter and onmouseout
  -Fixed bug where the timer would not reset when grid/player change was clicked
  -Fixed bug where change number of players stopped at 2 and could not switch back

Plan To:
  -Shuffle function
  -set up function to update Card css dimensions based on grid size
  -Turn "grid" into an object that will generate a grid if you pass in a few values
  -Add timer and grid to a library for reuse
  -Make timer display generic to count any interval and reset 
  -look at code in minutes/hours after it gets added


******************************************************************************/
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

var messageBar;

var gridSizes = 
        [
          [4,6],
          [6,6],
          [8,6],
          [10,6]
        ];
var deckFrontImages = [];
var deckColors = [
"grey","orange","yellow","white"
];
var cardList = [];
var card1ImageIndex = [{},{}];
// Need to find a way to getLength(image/frontAndBack_directory)
var numberOfFrontImages = 50;
var numberOfBackImages = 6; 
var currentDeckColor = 0;
var currentGridSize = 0;
var currentCardImage = {};
var currentCardIndex = "";
var currentSpeed = 500;
var cardFoundCount = 0;
var attemptsCount = 1;

var canClick = true;

var startTime = 0;
var secondCount = 0;
var minuteCount = 0;
var hourCount = 0;
var intervalID;

var player1 = new Player(0,0);
var player2 = new Player(0,0);

var numberOfPlayers = 1;

var currentMessage = "Click on any tile to start a game.";

var numOfCardsNeeded ;
var isPlayer1 = true;
var gameOn = false;

var player1Color = "rgba(0,255,0,.6)";
var player2Color = "rgba(255,0,0,.6)";
var singlePlayerColor = "rgba(0,130,255,.5)";


window.onload = function()
{
  // Sandbox area to try out random code 
  var temp = document.getElementById('changeGridButton');
  temp.onclick = changeGrid;
  temp.onmouseover = updateStatus;
  temp.onmouseout = outStatus;

  
  temp = document.getElementById('changeDeckButton');
  temp.onclick = changeDeck;
  temp.onmouseover = updateStatus;
  temp.onmouseout = outStatus;

  temp = document.getElementById('changeSpeed');
  temp.onclick = changeSpeed;
  temp.onmouseover = updateStatus;
  temp.onmouseout = outStatus;
  temp.innerHTML = currentSpeed / 1000 + "s";

  temp = document.getElementById('changeNumberOfPlayers');
  temp.style.backgroundImage = "url('./images/settings/player1.png')";
  temp.style.backgroundColor = singlePlayerColor;
  temp.onclick = changeNumberOfPlayers;
  temp.onmouseout = outStatus;
  temp.onmouseover = updateStatus;

  temp = numberOfFrontImages; // # of files in card_front directory

  while (temp--)
  {
    deckFrontImages.push("url('./images/card_front/front_"+ temp + ".png')");
  }
  
  temp = numberOfBackImages; // # of files in the card_back directory
  
  document.getElementById('changeDeckButton').style.backgroundColor = deckColors[currentDeckColor];
  document.getElementById('changeDeckButton').style.backgroundImage = "url('./images/settings/deck.png')";
  

  timerDisplay = document.getElementById('timerDisplay');
  player1Display = document.getElementById('player1Display');
  player2Display = document.getElementById('player2Display');

  messageBar = document.getElementById('messageBar');
  messageBar.innerHTML = currentMessage;

  document

  generateGrid();

}

var updateStatus = function()
{
  switch(this.id)
  {
    case "changeSpeed":
      messageBar.innerHTML = "Change the card flipping speed.";
    break;

    case "changeDeckButton":
      messageBar.innerHTML = "Change deck backgrounds.";
    break;

    case "changeGridButton":
      messageBar.innerHTML = "Change the grid dimensions.";
    break;

    case "changeNumberOfPlayers":
      messageBar.innerHTML = "Change number of players.";
    break;
  }

};

var outStatus = function()
{
  messageBar.innerHTML = currentMessage;
};


/******************************************************************************
  resetValues 
******************************************************************************/
var resetValues = function()
{
  cardList = [];
  attemptsCount = 1;
  cardFoundCount = 0;
  secondCount = "00";
  minuteCount = "00";
  hourCount = "00";
  clearInterval(intervalID);
  intervalID = undefined;
  gameOn = false;
  updateTimerDisplay();
  isPlayer1 = 1;

  currentCardImage = {};
  currentCardIndex = "";
  cardFoundCount = 0;

  canClick = true;

  startTime = 0;
  secondCount = 0;
  minuteCount = 0;
  hourCount = 0;
  intervalID;

  player1 = new Player(0,0);
  player2 = new Player(0,0);

  isPlayer1 = true;
  gameOn = false;

  currentMessage = "Click on any tile to start a game.";


};

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
  resetValues();

  var node = document.getElementById('game');

  node.innerHTML = "";
 
  numOfCardsNeeded = ( (gridSizes[currentGridSize][0] * 
                            gridSizes[currentGridSize][1]) / 2 );
  
  var cardIndex = 0;

  var newDiv = document.createElement("div");
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
        newDiv.style.backgroundColor = deckColors[currentDeckColor];
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
  updateTimer
    1. gets the seconds since the timer was started
    2. resets seconds and minutes if it exceeds 60
    3. updates seconds, minutes, and hours displays
******************************************************************************/

var updateTimer = function()
{
  secondCount = Math.floor( (new Date() - startTime) / 1000);

  if (secondCount >= 60)
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

  updateTimerDisplay();
};

/******************************************************************************
  updateTimerDisplay 
    

******************************************************************************/

var updateTimerDisplay = function()
{
  timerDisplay.innerHTML = hourCount + " : " + 
                      minuteCount + " : " + 
                      secondCount;
};

/******************************************************************************
  handleInput 
    

******************************************************************************/

var handleInput = function()
{
  gameOn = true;

  if (gameOn)
  {
    if (intervalID === undefined)
    {
      intervalID = window.setInterval(updateTimer,500);
      startTime = new Date();
      gameOn = true;
    }

    if (numberOfPlayers === 1)
    {
       updatePlayer(player1, this, "rgba(0,130,255,.5)");
    }

    else
    {
      if (isPlayer1)
      {
        updatePlayer(player1, this, "rgba(0,255,0,.5)");
      }

      else
      {
        updatePlayer(player2, this, "rgba(255,0,0,.5)");
      }

    }

    // If all cards are found
    if (cardFoundCount === numOfCardsNeeded )
    {

    }

  }
  
  messageBar.innerHTML = currentMessage;
};

/******************************************************************************
  updatePlayer 
    

******************************************************************************/

var updatePlayer = function(player, element, color)
{
  if (canClick)
  {
    element.style.backgroundColor = document.getElementById('changeNumberOfPlayers').style.backgroundColor;
    if (cardList[element.id].notFound)
    {
      element.style.backgroundImage = deckFrontImages[cardList[element.id].imgIndex];

      if (isNaN(currentCardImage))
      {
        currentCardImage = cardList[element.id].imgIndex;
        currentCardIndex = element.id;
      }

      else
      {
        if (currentCardIndex !== cardList[element.id].index)
        {
          if (currentCardImage === cardList[element.id].imgIndex)
          {
            cardList[currentCardIndex].notFound = false;
            cardList[element.id].notFound = false;
            player.cardFoundCount += 1;

            if (numberOfPlayers == 1)
            {
                document.getElementById(element.id).style.backgroundColor = singlePlayerColor;
                document.getElementById(currentCardIndex).style.backgroundColor = singlePlayerColor;
                document.getElementById('changeNumberOfPlayers').style.backgroundColor = singlePlayerColor;
            }
            else
            {
              if (isPlayer1)
              {
                document.getElementById(element.id).style.backgroundColor = color;
                document.getElementById(currentCardIndex).style.backgroundColor = color;

              }

              else
              {
                document.getElementById(element.id).style.backgroundColor = color;
                document.getElementById(currentCardIndex).style.backgroundColor = color;

              }

            }

          }

          else
          {

            isPlayer1 = !isPlayer1;
          }

         

          canClick = false;
          var timeoutID = window.setTimeout(updateGrid, currentSpeed);
          currentCardImage= {};
          currentCardIndex = "";
        }
         if (numberOfPlayers == 1)
          {
              currentMessage = "Attempts: " + attemptsCount;
              attemptsCount += 1;

          }
          else
          {
            if (isPlayer1)
            {
              player1.attemptsCount +=1;
              currentMessage = "Attempts: " + player1.attemptsCount;

            }

            else
            {
              player2.attemptsCount += 1;
              currentMessage = "Attempts: " + player2.attemptsCount;
            }
          }
      }
    }
  }
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
       c.style.backgroundColor = deckColors[currentDeckColor];
       c.style.backgroundImage = "url('./images/settings/deck.png')";
    }
    else
    {
      c.style.backgroundImage = deckFrontImages[cardList[i].imgIndex]; 
    }
  }

  timeoutID = window.setTimeout(function() 
    { 
      canClick = true;

      if (intervalID !== undefined)
      {
        if (numberOfPlayers !== 1)
        {
          if (isPlayer1)
          { 
            document.getElementById('changeNumberOfPlayers').style.backgroundColor = player1Color;
          }
          else
          {
            document.getElementById('changeNumberOfPlayers').style.backgroundColor = player2Color;
          }
        }
        else
        {
            document.getElementById('changeNumberOfPlayers').style.backgroundColor = singlePlayerColor;
        }
      }
    }, 0);

};

/******************************************************************************
  changeSpeed
    1. increments currentSpeed by 1000
    -currentSpeed is used in handleInput() as the time interval (1000 = 1 sec)
    2. resets to 1 second if currentSpeed exceeds 5000 ms (5 seconds)
******************************************************************************/
var changeSpeed = function()
{
  // add another second to the clock
  currentSpeed += 500;

  // if current level is set to 5 seconds, reset 
  if (currentSpeed > 2000)
  {
    // reset to 1 second 
    currentSpeed = 500;
  }

  document.getElementById('changeSpeed').innerHTML = currentSpeed / 1000 + "s";
};



/******************************************************************************
  changeDeck
    1. increments currentDeckColor counter by one
    2. resets currentDeckColor counter to 0 if it is >= deckColors.length
    3. iterates through cardList 
    4. changes background image where Card.notFound is false
******************************************************************************/
var changeDeck = function()
{
  currentDeckColor += 1;

  if (currentDeckColor >= deckColors.length)
  {
    currentDeckColor = 0;
  }

  document.getElementById('changeDeckButton').style.backgroundColor = deckColors[currentDeckColor];
  document.getElementById('changeDeckButton').style.backgroundImage = "url('./images/settings/deck.png')";

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

/******************************************************************************
  changenumberOfPlayers
******************************************************************************/
var changeNumberOfPlayers = function()
{
  if (numberOfPlayers == 1)
  {
    document.getElementById('changeNumberOfPlayers').style.backgroundImage = "url('./images/settings/player2.png')";
    document.getElementById('changeNumberOfPlayers').style.backgroundColor = player1Color;
  }
  else
  {
    document.getElementById('changeNumberOfPlayers').style.backgroundImage = "url('./images/settings/player1.png')";
    document.getElementById('changeNumberOfPlayers').style.backgroundColor = singlePlayerColor;    
  }

  generateGrid();

  if (numberOfPlayers == 1)
  {
    numberOfPlayers = 2;
  }
  else
  {
    numberOfPlayers = 1;
  }  
};



