$(function(){
  var level = 0;
  var keysToType = window.sentences[level].split("");
  var $userInputForm = $("#userInputForm");
  var $userInput = $("#userInput");
  var $typeThis = $("#typeThis");
  var $gameStart = $("#gameStart");
  var $characterModel = $("#characterModel");
  var $currentScore = $("#score");

  $characterModel.hide();
  $gameStart.on('click', function(){
    $(this).fadeOut('slow');
    $userInput.focus();
    setTimeout(function(){
      initEventHandlers();
      $characterModel.show();
    },2000);
  });

  
  function initEventHandlers(){
    $typeThis.prepend(keysToType);
    $userInput.keydown(function() {
      
      if(event.key === keysToType[0]) {
        keysToType.shift();
        $typeThis.text(keysToType.join(""));
        // setTimeout(function(){
        //   $typeThis.append("PRESS ENTER");
        // }, 3000);
      }else if (event.key!== keysToType[0]){
        
      };
    });

    $userInputForm.on('submit', function(e){
      
      e.preventDefault();
    

      if(keysToType.length === 0) {
        $userInput.val('');
        level++;
        $currentScore++;
        $('#score').append($currentScore);
        keysToType = window.sentences[level].split("");
        $typeThis.text(keysToType.join(""));
      }
    });
  };
  


  


});








