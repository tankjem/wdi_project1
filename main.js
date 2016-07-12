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

//reset function still needs work }
  
  $gameStart.on('click', function(){
    $(this).fadeOut('slow');
    gameOver = false;
    howl.play();
    gameWindow.css("background-image","url(resources/zomies.gif?"+new Date().getTime().toString(32)+")");
    $typeThis.text("Press Enter only after typing a correct sentence");
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
      setTimeout (function (){
        var victoryMusic = new Audio('resources/ff7.mp3'); 
        endGame();
        gameOver = true;
        victoryMusic.play();
        gameWindow.css("background-image","url(resources/solaire.gif");
        $typeThis.append(" You have survived");
          $resetGame.on('click', function(){
            resetGame();
          });
      }, 200);
    }else {
      setTimeout (function(){
        endGame();
        gameOver = true;
        zomEat.play();
        gameWindow.css("background-image","url(resources/zombieEating.gif"); 
        $typeThis.append(" Nom nom nom");
          $resetGame.on('click', function(){
            resetGame();
          });
      }, 200);
    }
  };

  function resetGame(){
    gameOver = false;
    $resetGame.hide();
    $currentScore.hide();
    $typeThis.text("");
    $userInputForm.trigger("reset");
    level = 0;
    score = 0;
    time = 55;
    keysToType = window.sentences[level].split("");
    gameWindow.css("background-image","url(resources/zombiegrave.jpg)");
    zomEat.pause();
    $gameStart.show();
  }
  
  function endGame (){
    
    $userInput.off("keydown");
    $timeBox.hide();
    $currentScore.hide();
    $characterModel.hide();
    $characterModel.css('margin-left','');
    $typeThis.text(score);
    $resetGame.show();

  }
    
  
  function initEventHandlers(){ //function dealing with the key presses
    console.log("event.keyCode");
    console.log("initEventHandlers");
    $timeBox.html(time);

    timerId = setInterval(function() {
      // console.log("setInterval is running");
      time--;
      $timeBox.html(time);

      if (time <= 0) {
        clearInterval(timerId);
        checkForWinner();
      }
    }, 1000);

    // console.log(timerId);

    $typeThis.prepend(keysToType);
    $userInput.keydown(function() {
      if(event.key === keysToType[0]) {

        $('#typeThis').css("color", "gold");
        score+=10;
        $currentScore.text(score);
        keysToType.shift();
        $typeThis.text(keysToType.join(""));
        // console.log(event.keyCode);
      
      }else if (event.key !== keysToType[0] && event.keyCode !== 13){ 
        $('#typeThis').css("color", "red");
        score-=50;
        $currentScore.text(score);
      }
  });

    $userInputForm.on('submit', function(e){ 
      e.preventDefault();
      if(!gameOver) {
        if(keysToType.length === 0 ) {
          $('#characterModel').animate({ 
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
          endGame();
          gameOver = true;
          clearInterval(timerId);
          howl.pause();
          gameMusic.pause();
          zomEat.play();
          gameWindow.css("background-image","url(resources/zombieEating.gif");
          $typeThis.append(" You pressed enter too early and thus you were eaten alive");
          $resetGame.on('click', function(){
            resetGame();
          });
        }
      }
    }); 
  }
});
  
  









