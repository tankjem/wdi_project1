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
  var $counter = $("#timeBox");
  //things still to do: sort out the win condition and make something happen when a player gets a letter wrong, maybe reset the sentence... If they get it right I need a mesage for them to press enter afterwards or perhaps just move on to the next word... Winner and lose conditions with a game reset at the end....
  $currentScore.hide();
  $characterModel.hide();
  gameIntro();

  function gameIntro(){ // on click do all this
    $gameStart.on('click', function(){
      $(this).fadeOut('slow');
      $userInput.focus();
      var background = $("#gameWindow");
      background.css("background-image","url(resources/zomies.gif");
      $typeThis.text("Press Enter after sentence"); //letting them know what to do
      setTimeout(function(){
        $typeThis.text("");
      },3000);
      setTimeout(function(){
        initEventHandlers();
        countdownTimer.startInterval();
        $characterModel.fadeIn('slow');

        background.css("background-image","url(resources/zombiegrave.jpg");
        $currentScore.show();
      },11000);
    });
  }


  
  var countdownTimer = function(){ //counter with a reset and a start and stop function within it.

       var counter = 60;
       var timer = null;

       function countdown(){
           if (counter == 60) {
               $("#timeBox").html(counter);
           }
           if (counter <= 0) {
              stopInterval();
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
      
      }else if (event.key !== keysToType){ //if its a wrong key highlight red 
        $('#typeThis').css("color", "red");
        score-=20;
        $currentScore.text(score);
        console.log("wrong letter");
        console.log(keysToType);
      }else{
        console.log("press enter for next sentence")
      };
    });

    $userInputForm.on('submit', function(e){ //if enter is pressed and the keytotype.length is 0 then move character right add some points and move to the next sentence...
      e.preventDefault();

      if(keysToType.length === 0) {
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
        console.log("hurrah");
      } else{
        alert("you have tasty brains..."); //if enter is pressed early 
      };
    })
    
  };

  // function checkForWinner(){ // a function that i can call for my win conditions. If the timer reaches zero and the score is more than 1500 then you can progress if not you were eaten. Where would I call this function...
  //   if (('#counter' === 0 && '#currentScore' >= 1500)){
  //     alert("you have won")
  //   }else {
  //     alert("you have lost")
  //   }
  // }
  // checkForWinner();   
  
  
});
  
  









