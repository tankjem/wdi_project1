$(function(){

  var level = 0;
  var keysToType = window.sentences[level].split("");
  var $userInputForm = $("#userInputForm");
  var $userInput = $("#userInput");
  var $typeThis = $("#typeThis");
  var $gameStart = $("#gameStart");
  var $characterModel = $("#characterModel");
  var $currentScore = $("#score");
  var score = 0;
  var $timeBox = $("#timeBox");
  var counter = 0;
  var gameWindow = $("#gameWindow");
  var howl = new Audio ('resources/wolfHowl.mp3');
  var gameMusic = new Audio('resources/zombieTheme.mp3');
  var zomEat = new Audio ('resources/zomEat.mp3');
  var gameOver = false;
  var $resetGame = $("#resetGame");
  var time = 55;
  var timerId = null;
  
  $currentScore.hide();
  $resetGame.hide();
  $characterModel.hide();

//reset function still needs work
  function resetGame(){
    console.log("resetGame");
    $resetGame.hide();
    $currentScore.hide();
    $gameStart.show();
    $typeThis.text("");
    $('#userInputForm').trigger("reset");
    level = 0;
    score = 0;
    time = 55;
    //counter = 0;
    // countdownTimer.stopInterval()
    // clearInterval(countdownTimer);
    // console.log (countdownTimer);
    gameOver = false;
    keysToType = window.sentences[level].split("");
    gameWindow.css("background-image","url(resources/zombiegrave.jpg)");
    return;
  }
  
  $gameStart.on('click', function(){
    console.log(gameWindow.css("background-image"));
    $(this).fadeOut('slow');
    howl.play();
    gameWindow.css("background-image","url(resources/zomies.gif?"+new Date().getTime().toString(32)+")");
    $typeThis.text("Press Enter after typing a correct sentence");
    setTimeout(function(){
      $typeThis.text("");
    },3000);
    
    setTimeout(function(){
      $userInput.focus();
      initEventHandlers();
      gameMusic.play();
      $timeBox.show();
      $characterModel.fadeIn('slow');
      gameWindow.css("background-image","url(resources/zombiegrave.jpg)");
      $currentScore.show();
    },11000);
  });


  var checkForWinner = function(){
   
    if (score >= 3000){
      gameOver = true;
      $userInput.off("keydown");
      setTimeout (function (){
        
        var victoryMusic = new Audio('resources/ff7.mp3'); 
        victoryMusic.play();
        $timeBox.hide();
        $currentScore.hide();
        $characterModel.hide();
        gameWindow.css("background-image","url(resources/solaire.gif");
        $typeThis.text(score)
        $typeThis.append(" You have survived");
        $resetGame.show();
          $resetGame.on('click', function(){
            resetGame();
          });
      }, 200);
    }else {
      gameOver = true;
      $userInput.off("keydown");
      setTimeout (function(){
        zomEat.play();
        $timeBox.hide();
        $characterModel.hide();
        $currentScore.hide();
        gameWindow.css("background-image","url(resources/zombieEating.gif");
        $typeThis.text(score)
        $typeThis.append(" You became a zombie happy meal");
        $resetGame.show();
          $resetGame.on('click', function(){
            resetGame();
          });
      }, 200);
    }
  }
  
  // var countdownTimer = function(){ //counter with a reset and a start and stop function within it.
  //     counter = 55;
  //     var timer = null;

  //     function countdown(){
  //       if (counter == 60) {
  //         $("#timeBox").html(counter);
  //       }
  //       if (counter <= 0) {
  //           stopInterval();
  //           checkForWinner();
  //       }
  //       else {
  //           counter--;
  //           $("#timeBox").html(counter);
  //       }
  //     }
  //       function reset() {
  //          clearInterval(timer);
  //          counter = 0;
  //       }
  //       function startInterval() {
  //          $("#timeBox").html(counter);
  //          timer = setInterval(countdown, 1000);
  //       }
  //       function stopInterval() {
  //          clearInterval(timer);
  //       }

  //       return {
  //         startInterval: startInterval
  //       }
  // }();
  
  
  function initEventHandlers(){ //function dealing with the key presses

    // console.log("initEventHandlers");
    $timeBox.html(time);

    timerId = setInterval(function() {
      console.log("setInterval is running");
      time--;
      $timeBox.html(time);

      if (time <= 0) {
        clearInterval(timerId);
        checkForWinner();
      }
    }, 1000);

    console.log(timerId);

    $typeThis.prepend(keysToType);
    $userInput.keydown(function() {
      if(event.key === keysToType[0]) {

        $('#typeThis').css("color", "gold");
        score+=10;
        $currentScore.text(score);
        keysToType.shift();
        $typeThis.text(keysToType.join(""));
        console.log(event.keyCode);
      
      }else if (event.key !== keysToType[0] && event.keyCode !== 13){ //if its a wrong key highlight the words to red, having an issue where enter, shift and other keys are highlighting as red. 
        $('#typeThis').css("color", "red");
        score-=50;
        $currentScore.text(score);
      }
  });

    $userInputForm.on('submit', function(e){ //if enter is pressed and the keytotype.length is 0 then move character right add some points and move to the next sentence...
      e.preventDefault();
      if(!gameOver) {
        if(keysToType.length === 0) {
          $('#characterModel').animate({ //on correct submit the character model will move forward
          marginLeft: "+=40"
            }, 1000, function() {
            
            });
          $userInput.val('');
          level++;
          score+=100;
          $currentScore.text(score);
          keysToType = window.sentences[level].split("");
          $typeThis.text(keysToType.join(""));
        } 
        else {
          console.log("gameOver");
          // stop the timer
          clearInterval(timerId);
          gameOver = true;
          howl.pause();
          gameMusic.pause();
          $userInput.off("keydown")
          zomEat.play();
          $timeBox.hide();
          $characterModel.hide();
          $currentScore.hide();
          gameWindow.css("background-image","url(resources/zombieEating.gif");
          $typeThis.text(score)
          $typeThis.append(" You pressed enter too early and thus you were eaten alive");
          $resetGame.show();
          $resetGame.on('click', function(){
            resetGame();
          });
        }
      }
    }) 
  };
});
  
  









