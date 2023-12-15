//Declare variables
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.querySelector('.start');
const winOverlay = document.querySelector('.win');
const loseOverlay = document.querySelector('.lose');
const phrases = ["HTML is cool", "Sunny in England", "kpop music", "rainy in Seoul", "New York City"]
let missed = 0;

const startBtn = document.querySelector('.btn__reset');
const hearts = document.querySelectorAll('.tries');


//chooses a random phrase from the phrases array
const getRandomPhraseAsArray = arr => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const newArr = arr[randomIndex].split('');
  return newArr;
}

//choose a random phrase to display 
//append new array to DOM
const addPhraseToDisplay = arr => {
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
let phraseArray = getRandomPhraseAsArray(phrases);
//append the phrase to the DOM
addPhraseToDisplay(phraseArray);


//check if letter is a match 
// if yes display the letter, return the letter
// if no return null 
const checkLetter = button => {
  const letters = document.getElementsByClassName('letter');
  let found = false;
  //loop through letters in the phrase array
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i].innerText.toLowerCase();
    const btnText = button.innerText.toLowerCase();
    //if the btn character matches the array character
    if (btnText == letter) {
      //display the letter that was matched
      letters[i].classList.add('show');
      found = true;
    }
  }
  return found;
}

//changes heart to empty heart 
const changeHeart = () => {
  //const heartsLis = document.getElementsByClassName('tries');
  const heartImages = document.querySelectorAll('.tries img:not(.empty)');
  for (let i = 0; i < heartImages.length; i++) {
      heartImages[i].setAttribute('src', 'images/lostHeart.png');
      heartImages[i].className = 'empty'; 
      break;
  }
  missed++;
  console.log(missed);
}


//checks if player has won or lost the game
//Displays a modal to show the result
const checkWin = () => {
  //check if number of letters with class "show" is the same as letters with class "letters"
  //count letters with class show
  const title = document.querySelector('h2');
  const show = document.getElementsByClassName('show');
  const letters = document.getElementsByClassName('letter');


  if (show.length == letters.length) {
    //show the overlay screen for win
    overlay.classList.add('win');
    title.innerText = 'You have won the game!';
    overlay.style.display = 'flex';
  } else if (missed > 4) {
    //if missed variable is equal to or greater than 5 
    //show that the player has lost the game 
    overlay.classList.add('lose');
    title.innerText = 'Sorry, you have lost. Try again!';
    overlay.style.display = 'flex';
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
    if (check == false) {
      //remove one heart
      changeHeart();
    }
    //call function to check if player has won or lost
    checkWin();
    //add reset class to modal button
    startBtn.classList.add('reset'); 
  }

} 
);


//resets the keyboard when the player starts the game again
const recreateKeyboard = () => {
  const keys = keyboard.getElementsByTagName('button');
  for (let i = 0; i < keys.length; i++) {
    const button = keys[i];
    if (button.className == 'chosen') {
      button.classList.remove('chosen');
      button.removeAttribute('disabled');
    }
  }
}

//removes the current phrase from the DOM
const removePhrase = () => {
//select the current phrase
const lis = document.querySelectorAll('#phrase li');
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.remove();
  }
}

//resets the hearts to full heart
//reset score to 0;
const resetHearts = () => {
  //reset missed to 0
  missed = 0;
  //set hearts to the full heart image
  const emptyHearts = document.querySelectorAll('.empty');
  for (let i = 0; i < emptyHearts.length; i++) {
    const heart = emptyHearts[i];
    heart.setAttribute('src', 'images/liveHeart.png');
    heart.classList.remove('empty');
  }
}

//reset game functionality
const resetGame = () => {
  // change button inner text
  startBtn.innerText = 'Play again';
  recreateKeyboard();
  removePhrase();
  //create new phrase array
  const newPhrase = getRandomPhraseAsArray(phrases)
  //add new phrase
  addPhraseToDisplay(newPhrase);
  resetHearts();
  //remove win and lose classes from modal
  overlay.classList.remove('win', 'lose');
}


//add an event listenr to remove the starting modal
startBtn.addEventListener('click', (element) => {
  //check if button has class of reset, reset the game
  if (startBtn.classList.contains('reset')) {
    resetGame();
  
  }
  overlay.style.display = 'none';
})






