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
  //things still to do: sort out the win condition and make something happen when a player gets a letter wrong, maybe reset the sentence... If they get it right I need a mesage for them to press enter afterwards or perhaps just move on to the next word... Winner and lose conditions with a game reset at the end....Do I do this at the beginning or after do I write a function for each do I change to OOP...too many questions not enough time
  
  $currentScore.hide();
  $characterModel.hide();
  gameIntro();
  
  function gameIntro(){
    $gameStart.on('click', function(){
      $(this).fadeOut('slow');
      $userInput.focus();
      setTimeout(function(){
        initEventHandlers();
        $characterModel.fadeIn();
        $currentScore.show();
      },2000);
    });
  }
  
  function initEventHandlers(){
    $typeThis.prepend(keysToType);
    $userInput.keydown(function() {

      if(event.key === keysToType[0]) {
        $('#typeThis').css("color", "white");
        keysToType.shift();
        $typeThis.text(keysToType.join(""));
      
      }else if (event.key !== keysToType){
        $('#typeThis').css("color", "red");
        console.log("wrong letter");
        console.log(keysToType);
      }else{
        console.log("press enter for next sentence")
      };
    });

    $userInputForm.on('submit', function(e){
      e.preventDefault();
      // $('#characterModel').css("margin-left", "25px");
    

      if(keysToType.length === 0) {
        $('#characterModel').animate({
        marginLeft: "+=40"
          }, 500, function() {
        //Complete
          }
        );
        $userInput.val('');
        level++;
        score++;
        $currentScore.prepend(score);
        keysToType = window.sentences[level].split("");
        $typeThis.text(keysToType.join(""));
        console.log("hurrah");
      }
    })
  };
});
  
  









