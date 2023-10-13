
let score =JSON.parse(localStorage.getItem('FinalScore'))
|| {
  Wins: 0,
  Losses: 0,
  Tied: 0
};

document.querySelector('.message').innerHTML = 
`Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Tied}`;

 /* if (score=== null){
  score ={
    wins: 0,
    losses: 0,
    tied: 0
  };
 };
 */
function pickComputerMove(){
  let computerMove='';
  let randomNumber = Math.random();

  if(randomNumber>=0 && randomNumber<1/3){
    computerMove = "Rock";
  }else if(randomNumber >1/3 && randomNumber<=2/3){
    computerMove = "Paper";
  }else if(randomNumber>2/3 && randomNumber<1){
    computerMove = "Scissors";
  }
  return computerMove;
}

function finalsum(usermove){
  let computerMove = pickComputerMove();
  let result = '';

  if(usermove === 'Scissors'){
    if(computerMove === 'Rock'){
      result = 'You lose';
     }else if(computerMove === 'Paper'){
      result = 'You win';
     }else if(computerMove === 'Scissors'){
      result = 'You tied';
     }
  }else if(usermove === 'Rock'){
    if(computerMove === 'Rock'){
      result = 'You tied';
     }else if(computerMove === 'Paper'){
      result = 'You lose';
     }else if(computerMove === 'Scissors'){
      result = 'You win';
     }
  } else if(usermove === 'Paper'){
    if(computerMove === 'Rock'){
      result = 'You win';
     }else if(computerMove === 'Paper'){
      result = 'You tied';
     }else if(computerMove === 'Scissors'){
      result = 'You lose';
     }
  }

  if(result === 'You win'){
    score.Wins++;
  }else if(result === 'You lose'){
    score.Losses++;
  }else if(result === 'You tied'){
    score.Tied++;
  }
  
  // localStorage only supports string
  localStorage.setItem('FinalScore', JSON.stringify(score));

  document.querySelector('.status')
    .innerHTML = `${result}`

  document.querySelector('.moves')
    .innerHTML = `You
    <img class="play-img" src="./images/${usermove}-emoji.png">
    <img class="play-img" src="./images/${computerMove}-emoji.png">
    Computer` ;

  document.querySelector('.message').innerHTML = 
  `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Tied}`;
  
}

function resetScore(){
  score.Wins =0;
  score.Losses =0;
  score.Tied = 0;
  localStorage.removeItem('FinalScore');
  document.querySelector('.message').innerHTML = 
`Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Tied}`;
}

document.querySelector('.reset-btn')
  .addEventListener('click', () => {
    document.querySelector('.confirmation-message') 
    .innerHTML = `Are you sure you want to reset the score? 
    <button class="styleYesReset"  onclick = "yesReset();">Yes</button><button class="styleNoReset" onClick="noReset()">No</button>`
    // resetScore();
  })



// let isAutoPlaying = false;
// let intervalId;

// function autoPlay(){
//   if(!isAutoPlaying){
//    intervalId = setInterval(function (){
//       const usermove = pickComputerMove();
//       finalsum(usermove)
//     }, 1000);
//     isAutoPlaying = true;
//   }
//   else{
//     clearInterval(intervalId);
//     isAutoPlaying = false;
//   }
  
// }

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// };

document.querySelector('.autoPlay-btn')
  .addEventListener('click', () => {
    autoPlay();
  })

function autoPlay(){

  if(!isAutoPlaying)
  {
    intervalId = setInterval(() => {
      let usermove = pickComputerMove();
      finalsum(usermove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.autoPlay-btn').innerHTML = 'Stop AutoPlay';
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.autoPlay-btn').innerHTML = 'Auto Play';
  }
  
}


document.querySelector('.js-rock-button')
 .addEventListener('click', () => {
  finalsum('Rock');
 });

 document.querySelector('.js-paper-button')
  .addEventListener('click',() => {
    finalsum('Paper');
  });

  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      finalsum('Scissors');
    });

    document.body.addEventListener('keydown', (event) => {
      if(event.key === 'r'){
        finalsum('Rock');
      }else if(event.key === 'p'){
        finalsum('Paper');
      }else if(event.key === 's'){
        finalsum('Scissors');
      }else if(event.key === 'a'){
        autoPlay();
      }else if(event.key === 'Backspace'){
        
        document.querySelector('.confirmation-message') 
    .innerHTML = `Are you sure you want to reset the score? 
    <button class="styleYesReset"  onclick = "yesReset();">Yes</button><button class="styleNoReset" onclick="noReset()">No</button>`
      }
    });

    function yesReset(){
      resetScore();
      document.querySelector('.confirmation-message') 
    .innerHTML = '';
    }

    function noReset(){
      document.querySelector('.confirmation-message') 
    .innerHTML = '';
    }



    
    