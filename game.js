// alert("This is test");
// $("h1");

var buttomColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;
var currentLevel;
var checkAnswers = [];

$(".btn").click(function() {

  console.log(level);
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log("gamePattern:" + gamePattern);
  console.log("userClicked:" + userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

  console.log("userClickedLength:" + userClickedPattern.length );
  console.log("gamePatternLength:" + gamePattern.length );
  console.log("checkAnswer:" + !checkAnswers.includes("wrong"));
  if (userClickedPattern.length === gamePattern.length && !checkAnswers.includes("wrong")  && level != -1) {

    setTimeout(nextSequence(),3000);

  }


});



function checkAnswer(currentLevel) {
  console.log("level in check answer: " + currentLevel);
  console.log("check user:" + userClickedPattern[currentLevel] + " vs game: " + gamePattern[currentLevel]);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    checkAnswers.push("success");
  } else {

    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    console.log("wrong");
    checkAnswers.push("failed");

    $("body").addClass("game-over");

    setTimeout(function (){
          $("body").removeClass("game-over");
       },200);
    startOver();
  }


  //   var isSuccess = true;
  // console.log("level in check answer: "+currentLevel);
  // console.log("check user:" + userClickedPattern[currentLevel] +" vs game: "+gamePattern[currentLevel]);
  // if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  //     console.log("success");
  //     // level++;
  //     // setTimeout(nextSequence(),3000);
  //   }
  //   else  {
  //     console.log("success");
  //   isSuccess = false;
  // }
  // return isSuccess;

}
function startOver () {

  $("h1").text("Game Over, Press Any Key to Restart");

  gamePattern = [];
  userClickedPattern = [];
  level = -1;
  checkAnswers = [];


}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
$(document).keypress(nextSequence);

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  $("#" + buttomColours[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(buttomColours[randomNumber]);
  gamePattern.push(buttomColours[randomNumber]);
  console.log("gameOnNS:" + gamePattern);
  console.log("userOnNS:" + userClickedPattern);

}

function playSound(color) {

  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();

}
