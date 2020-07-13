let gamePatern=[];
let buttonColours=["red", "blue", "green", "yellow"];
let userClickPattern = [];

let start = false;
let level = 0;

$(document).keypress(function(){
	if(!start){
	 	$("#level-title").text("Level "+level);
	 	nextSequence();
	 	start = true;
	 }
})



$(".btn").click(function () {
  	var userChosenColour = $(this).attr("id");
	userClickPattern.push(userChosenColour);
	//let color = new Audio("sounds/"+userChosenColour+".mp3");
	//color.play();
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickPattern.length-1);
	//console.log(userClickPattern)
	}
)



function nextSequence(){
	userClickPattern=[];

	level++;
	$("#level-title").text("Level "+level);
	
	let randomNumber = Math.floor(Math.random()*4);
	let randomChosenColour=buttonColours[randomNumber];
	gamePatern.push(randomChosenColour); 

	//Мерехкотіння кнопки
	$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour)


	
	
}
function playSound(name){
	let color = new Audio("sounds/"+name+".mp3");
	color.play();
}

function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	}, 100)

}

function checkAnswer(currentLevel){
	if(userClickPattern[currentLevel]===gamePatern[currentLevel]){
		console.log("success");
	
		if(userClickPattern.length===gamePatern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
	else{
		//name="wrong";
		playSound("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart")
		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);

		startOver();
	}
	
}
function startOver(){
	start = false;
	level = 0;
	gamePatern=[];
}
