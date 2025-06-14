var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function startOver(){
    gamePattern = [];
    level = 0;
    start = false;
 }

$(document).on("keydown", function(){
    if (!start) {
        $("h1").text("Level " + level);
        nextSequence();
        start = true;
      }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  
  });

  function checkAnswer(currentLevel){
    console.log(currentLevel);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() { 
                nextSequence();
            }, 1000); 
        }
    }
    else{
        console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")

        $("body").addClass("game-over");

        setTimeout(function() { 
            $("body").removeClass("game-over");
        }, 200);
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        startOver();
    }        
}

function nextSequence(){

    // userClickedPattern.splice(0,userClickedPattern.length);
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColour){

    $(".btn#"+currentColour).addClass("pressed");

    setTimeout(function() { 
        $(".btn#"+currentColour).removeClass("pressed");
    }, 100);
}





