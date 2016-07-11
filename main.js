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
  var gameMusic = new Audio('resources/zombieTheme.mp3');
  var victoryMusic = new Audio('resources/ff7.mp3');
  var zomEat = new Audio ('resources/zomEat.mp3');
  
  $currentScore.hide();

  $characterModel.hide();

  gameIntro();

  function gameIntro(){ // on click do all this
    $gameStart.on('click', function(){
      $(this).fadeOut('slow');
      $userInput.focus();
      gameWindow.css("background-image","url(resources/zomies.gif");
      $typeThis.text("Press Enter after typing sentence"); 
      setTimeout(function(){
        $typeThis.text("");
      },3000);
      setTimeout(function(){
        initEventHandlers();
        gameMusic.play();
        countdownTimer.startInterval();
        $characterModel.fadeIn('slow');
        gameWindow.css("background-image","url(resources/zombiegrave.jpg");
        $currentScore.show();
      },11000);
    });
  }


  var checkForWinner = function(){
   
    if (score >= 2000){
      $typeThis.text("");
      setTimeout (function (){ 
        victoryMusic.play();
        $timeBox.hide();
        $currentScore.hide();
        $characterModel.hide();
        gameWindow.css("background-image","url(resources/solaire.gif");
        $typeThis.text(score)
        $typeThis.append(" You have survived");
      }, 200);
    }else {
      $typeThis.text("");
      setTimeout (function(){
        zomEat.play();
        $timeBox.hide();
        $characterModel.hide();
        $currentScore.hide();
        gameWindow.css("background-image","url(resources/zombieEating.gif");
        $typeThis.text(score)
        $typeThis.append(" You became a zombie meal");
      }, 200);
    }
  }
  
  var countdownTimer = function(){ //counter with a reset and a start and stop function within it.
      counter = 55;
      var timer = null;

      function countdown(){
        if (counter == 60) {
          $("#timeBox").html(counter);
        }
        if (counter <= 0) {
            stopInterval();
            checkForWinner();
        }
        else {
            counter--;
            $("#timeBox").html(counter);
        }
      }
        function reset() {
           clearInterval(timer);
           counter = 0;
        }
        function startInterval() {
           $("#timeBox").html(counter);
           timer = setInterval(countdown, 1000);
        }
        function stopInterval() {
           clearInterval(timer);
        }

        return {
          startInterval: startInterval
        }
  }();
  
  
  function initEventHandlers(){ //function dealing with the key presses
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
      } else{
        zomEat.play();
        $typeThis.text("");
        $timeBox.hide();
        $characterModel.hide();
        $currentScore.hide();
        gameWindow.css("background-image","url(resources/zombieEating.gif");
        $typeThis.text(score)
        $typeThis.append(" You became a zombie meal");
        
      };
    }) 
  };
});
  
  









