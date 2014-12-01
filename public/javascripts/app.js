// a custom iterator
var each = function (arr, action) {
  for (var i = 0; i < arr.length; i += 1) {
    action(arr[i], i, arr);
  }
};

function CardList (length) {
  this.list = new Array(length);
  for (var i = 0, char; i < length; i += 2) {
    char = String.fromCharCode(65 + i);
    this.list[i] = this.list[i + 1] = char;
  }
  console.log(this.list)
}

CardList.prototype.getRandom = function (max, min) {
  min = min || 0;
  var randRange = (max - min)*Math.random() +  min;
  var randInt = 0 | randRange;
  return randInt;
};

CardList.prototype.swap = function (i, j) {
  var tmp = this.list[i];
  this.list[i] = this.list[j];
  this.list[j] = tmp;
};

CardList.prototype.randomize = function () {
  var length = this.list.length;
  for (var i = 0, j; i < length; i += 1) {
    j = this.getRandom(this.list.length - i, i);
    this.swap(i, j);
  }
  return this;
};

CardList.prototype.each = each;

CardList.prototype.get = function (index) {
  return this.list[index];
};

CardList.prototype.set = function (index, val) {
  this.list[index] = val;
};

function Board (sel, rows, cols) {
  rows = Math.floor(rows/2)*2; 
  this.boardEl = document.getElementById(sel);
  this.flippedCards = [];
  this.cardList = new CardList(rows*cols);
  this.rows = rows;
  this.cols = cols;
  this.makeBoard();
}

Board.prototype.makeBoard = function () {
  var card = '<div class=\'card\'>?</div>';
  var rows = new Array(this.rows);

  for (var i = 0; i < rows.length; i++) {
    rows[i] = new Array(this.cols + 1).join(card);
  }
  boardStr = rows.join('</div><div class=\'row\'>');
  this.boardStr = '<div class=\'row\'>' + boardStr + '</div>';
  this.boardEl.innerHTML = this.boardStr;
};

Board.prototype.setBoard = function () {
  var cards = this.boardEl.querySelectorAll('.card');
  var length = cards.length;
  this.cardList.randomize();
  var board = this;
  each(cards, function (card, index) {
    card.addEventListener('click', function () {
      console.log(index, board.cardList.get(index), board.cardList)
      if (board.flippedCards.length == 2) {
        board.clearBoard();
      }
      if (card !== board.flippedCards[0]) {
        card.innerHTML = board.cardList.get(index);
        board.flippedCards.push(card);
      }
    });
  })
};

Board.prototype.clearBoard = function () {
  var cardOneHTML = this.flippedCards[0].innerHTML,
      cardTwoHTML = this.flippedCards[1].innerHTML,
      unmatched;

  unmatched = cardOneHTML !== cardTwoHTML;

  if (unmatched) {
    each(this.flippedCards, function (card) {
      card.innerHTML = '';
    });
  }
  this.flippedCards.splice(0);
};


window.addEventListener('load', function () {
  var startBtn = document.getElementById('start');
  var board = new Board('board', 4, 4);

  var start = function () {
    board.makeBoard();
    board.setBoard();
  };

  startBtn.addEventListener('click', function () {
    start();
  });

  start();
});
