// console.log ("js is working")
//   console.log(sentences);
// take the sentences and put them in the span id="typeThis"
//make the span appear on the screen 
//get text input to work and store that in an array so that it can be compared to the original sentence.
//get it to at least work once
$(function(){
  var level = 0;
  var keysToType = window.sentences[level].split("");
  var userInput = $("#userInput");
  var displayKeysToType = $("#typeThis");
  var gameStart = $("#gameStart");

    gameStart.on('click', function(){
      console.log(keysToType);
    });

    $(keysToType).each(function(){
    $("#typeThis").append(keysToType[level]);
    
    $('document').keyup(function() {
      console.log(event.key);
      
      if(event.key === keysToType[0]) {
        keysToType.shift();
        console.log(keysToType);
      } if(keysToType.length === 0) {
        // win logic
        console.log("Hurrah!");
        keysToType = window.sentances[level++].split("");
      }
    });
  });
});







//   // var userInput = $("#textInput");
//   // var gameStart = $("#gameStart");
//   // gameStart.on('click', createNewSentance);
  
//   // function createNewSentence(){
//   //   $(sentences).each(function(i){
//   //     $("#typeThis").append(sentences[0]);

//       // if (sentences===userInput){
//       //   createNewSentence;
//       // }else{
//       //   alert("you have died");
//       // };

//     });
//   };
// });