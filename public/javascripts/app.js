window.addEventListener('load', function () {
  var board = document.getElementById('board');
  var startBtn = document.getElementById('start');

  // a custom iterator
  var each = function (arr, action) {
    for (var i = 0; i < arr.length; i += 1) {
      action(arr[i], i, arr);
    }
  };
  
  var makeBoard = function (rows, cols) {
    var card = '<div class=\'card\'>?</div>';
    var rows = new Array(rows);

    for (var i = 0; i < rows.length; i++) {
      rows[i] = new Array(cols + 1).join(card);
    }
    boardStr = rows.join('</div><div class=\'row\'>');
    boardStr = '<div class=\'row\'>' + boardStr + '</div>';
    return boardStr;
  };
  

  var setupSymbols = function (length) {
    var symbols = new Array(length);
    for (var i = 0, char; i < length; i += 2) {
      char = String.fromCharCode(65 + i);
      symbols[i] = symbols[i + 1] = char;
    }
    return symbols;
  };

  var symbols = setupSymbols(16);

  var rollRange = function (max, min) {
    min = min || 0;
    var randRange = (max - min)*Math.random() +  min;
    var randInt = 0 | randRange;
    return randInt;
  };
 
  var swap = function (arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  var randomize = function (arr) {
    var length = arr.length;
    for (var i = 0, j; i < length; i += 1) {
      j = rollRange(arr.length - i, i);
      swap(arr, i, j);
    }
    return arr;
  };
  
  var clearBoard = function (plays) {
    var cardOneHTML = plays[0].innerHTML,
        cardTwoHTML = plays[1].innerHTML,
        unmatched;

    unmatched = cardOneHTML !== cardTwoHTML;

    if (unmatched) {
      each(plays, function (play) {
        play.innerHTML = '';
      });
    }
    plays.splice(0);
  };

  var setBoard = function (board, symbols) {
    var cards = board.querySelectorAll('.card');
    var length = symbols.length;
    var prevPlays = [];

    symbols = randomize(symbols);
    each(cards, function (card, index) {
      card.addEventListener('click', function () {
        if (prevPlays.length == 2) {
          clearBoard(prevPlays);
        }
        if (card !== prevPlays[0]) {
          card.innerHTML = symbols[index];
          prevPlays.push(card);
        }
      });
    })
  };

  var start = function () {
    board.innerHTML = makeBoard(4, 4);
    setBoard(board, symbols);
  };

  startBtn.addEventListener('click', function () {
    start();
  });

  start();
});
