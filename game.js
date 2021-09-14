


// Array to store each of the four colours of the four buttons
var buttonColors = ["red", "blue", "green", "yellow"];

// Array to store the randomly generated pattern for the game
var gamePattern = [];
// Array to store the users clicked pattern
var userClickedPattern = [];

// Game started as false
var started = false;

// Variable to store the game level in
var level = 0;


// Detects if a key has been pressed, checks if the game is not started, will then display the current level in the header, call the nextSequence function and set started to true
$(document).keypress(function() {
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detects if a button has been clicked
$(".btn").click(function() {

  // Stores the color of the button selected in a variable
  var userChosenColour = $(this).attr("id");
  // Pushing this colour to the array of user clicked pattern
  userClickedPattern.push(userChosenColour);

  // plays sounds and animations following a click
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Calling check answer function after a user clicks, and then passing the index of the last answer in the sequence
  checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel){
//check if the most recent answer of the user is the same as the game patterns, if so log pog if not log cringepilled
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("pog");
    console.log(currentLevel);

    // if user gets the most recent answer right, check if the sequence is finished by comparing lengths of both arrays
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);

    }
  } else {
    // if the user gets the wrong answer, change appropriate html
      console.log("cringepilled");
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").html("Game Over, Press Any Key to Restart");



      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      // function to reset game
      startOver();
  }
}

function nextSequence() {

  // Once a new nextSequence triggers, reset the pattern to an empty array for the new level
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
