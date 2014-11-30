var memoryContentsArray = ['<img src="wolf.jpg"/>', '<img src="horse.jpg"/>', '<img src="rabbit.jpg"/>', '<img src="fish.jpg"/>', '<img src="frog.jpg"/>', '<img src="swan.jpg"/>','<img src="seashell.jpg"/>', '<img src="birdfruit.jpg"/>'];
var memoryArray = [];
var turns = 1;
var cardOne = "";
var cardTwo = "";
var matchCount = 0;
var cardIdOne= "";
var cardIdTwo="";


window.onload = function() {

	while (memoryArray.length < 16){
	var MCAindex = Math.floor(Math.random()*8)
	if (countInArray(memoryArray, memoryContentsArray[MCAindex])<2){
		memoryArray.push(memoryContentsArray[MCAindex]);
	}
} 	

	console.log("javascript is working");
	}
	


console.log(memoryArray);

function countInArray(array, what) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
  if (array[i] === what) {
  count++;
  }
  }
  return count;
}

function showCard(elem) {
	var cardId = parseInt(elem.getAttribute("data-card"));
	var Id = document.getElementById(elem.getAttribute("id"));
	if (turns == 1){
		cardIdOne = Id;
		cardOne= memoryArray[cardId];
		Id.innerHTML = memoryArray[cardId];
		turns = 2;
	} else if (turns==2 && Id != cardIdOne){
		cardIdTwo = Id;
		cardTwo= memoryArray[cardId];
		Id.innerHTML = memoryArray[cardId];
		if (cardOne == cardTwo){
			matchCount++;
			if (matchCount == 8){
				alert("you won, you are awesome!");
			}
			}else{
			setTimeout(function(){
				cardIdOne.innerHTML="";
				cardIdTwo.innerHTML="";
			}, 1000);

			}
		    turns=1;  	
		}
		
	}









