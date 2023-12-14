//Declare variables
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.querySelector('.start');
const winOverlay = document.querySelector('.win');
const loseOverlay = document.querySelector('.lose');
const phrases = ["html is cool", "sunny in England", "kpop music", "rainy in Seoul", "New York City"]
let missed = 0;

const startBtn = document.querySelector('.btn__reset');

const hideOverlays = () => {
  winOverlay.style.display = 'none';
  loseOverlay.style.display = 'none'; 
}

//hide the overlays at the begining of the game
hideOverlays();

//add an event listenr to remove the starting modal
startBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
})

//chooses a random phrase from the phrases array
const getRandomPhraseAsArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const newArr = arr[randomIndex].split('');
  return newArr;
}

//choose a random phrase to display 
//append new array to DOM
const addPhraseToDisplay = (arr) => {
    const list = document.querySelector("#phrase ul");

   for(let i = 0; i < arr.length; i++) {
      const li = document.createElement("li");
      li.innerText = arr[i];
      if (arr[i] != " ") {
        //set class of 'letter'
        li.className = "letter";
      }
      list.appendChild(li);
   }
}

//assign new phrase to phraseArray
const phraseArray = getRandomPhraseAsArray(phrases);
//append the phrase to the DOM
addPhraseToDisplay(phraseArray);


//check if letter is a match 
// if yes display the letter, return the letter
// if no return null 
const checkLetter = (button) => {
  const letters = document.getElementsByClassName('letter');
  //loop through letters in the phrase array
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i].innerText.toLowerCase();
    const btnText = button.innerText;
    //if the btn character matches the array character
    if (btnText == letter) {
      //add 'show' class
      letters[i].classList.add("show");
      const match = letter[i];
      return match;
      } else {
      return null;
    }
  }
}

//changes heart to empty heart 
const changeHeart = () => {
  const hearts = document.querySelectorAll('.tries');
  //loop through hearts
  if (hearts) {
    for(let i = 0; i < hearts.length; i++){
      hearts[i].firstElementChild.setAttribute('src', 'images/lostHeart.png');
      hearts[i].classList.remove('tries');
      break;
    }
  }
}

const checkWin = () => {
  //check if number of letters with class "show" is the same as letters with class "letters"
  //count letters with class show
  const show = document.getElementsByClassName('show');
  const letters = document.getElementsByClassName('letter');
  if (show.length == letters.length) {
    console.log('player won game')
    //show the overlay screen for win
    winOverlay.style.display = 'block';
  } else if (missed == 5) {
    //if missed variable is equal to or greater than 5 
    //show that the player has lost the game 
    loseOverlay.style.display = 'block';
  }
}


//Add event listener to keyboard
keyboard.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON' && event.target.className !== "chosen") {
    const button = event.target;
    //add class of chosen  
    button.className = 'chosen';
    //set button attribute to disabled
    //check if chosen letter matches the phrase 
    const check = checkLetter(button);
    //set button to disabled
    button.setAttribute('disabled', "disabled");
    if (check == null) {
      missed += 1;
      //change heart to half heart
      changeHeart();
    }
    //call function to check if player has won or lost
    checkWin();
  }

} 
);






