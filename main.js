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
  // var clearOnSubmit = false;

    gameStart.on('click', function(){
      console.log(keysToType);
      $("#typeThis").prepend(keysToType);
    });

    
    $('#userInput').keydown(function() {
           console.log(event.key);
      
      if(event.key === keysToType[0]) {
        keysToType.shift();
        $("#typeThis").text(keysToType.join(""));
        console.log(keysToType);


      }else if(keysToType.length === 0) {
        userInput.on('submit', function(e){
          e.preventDefault();
          displayKeysToType = "";
          keysToType = window.sentences[level++].split("");
          $("#typeThis").prepend(keysToType);//this is the next sentence 
          console.log("Hurrah!");
          console.log(keysToType);
        })
        
        
      }
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