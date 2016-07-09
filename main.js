// console.log ("js is working")
//   console.log(sentences);
// take the sentences and put them in the span id="typeThis"
//make the span appear on the screen 
//get text input to work and store that in an array so that it can be compared to the original sentence.
//get it to at least work once
$(function(){
  var level = 0;
  var keysToType = window.sentences[level].split("");
  var $userInputForm = $("#userInputForm");
  var $userInput = $("#userInput");
  var $typeThis = $("#typeThis");
  var $gameStart = $("#gameStart");
  var $score = $("#score")
  // var clearOnSubmit = false;

  $gameStart.on('click', function(){
    console.log(keysToType);
    $(this).fadeOut('slow');
    $score.show();
    $userInput.focus();
    initEventHandlers();
    //  //right a transition to the game starting so it should go down into the game starting below 
  });

  
  function initEventHandlers(){
    $typeThis.prepend(keysToType);
    $userInput.keydown(function() {
         console.log(event.key);
      
      if(event.key === keysToType[0]) {
        keysToType.shift();
        $typeThis.text(keysToType.join(""));//write some kind of transition for the letters maybe add something extra to show whether you are right or wrong as you type
        console.log(keysToType);
      }
    });

    $userInputForm.on('submit', function(e){
      
      e.preventDefault();

      if(keysToType.length === 0) {
//figure out a way to show that you won or loss maybe a pass score to continue to the next level and put in an array within an array  
        $userInput.val('');
        level++;
        keysToType = window.sentences[level].split("");
        $typeThis.text(keysToType.join(""));//this is the next sentence 
        console.log("Hurrah!");
      }
    });
  };


});








