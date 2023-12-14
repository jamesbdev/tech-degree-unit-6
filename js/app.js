//Declare variables
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.querySelector('.start');
const winOverlay = document.querySelector('.win');
const loseOverlay = document.querySelector('.lose');
const phrases = ["html is cool", "sunny in England", "kpop music", "rainy in Seoul", "New York City"]
let missed = 0;

const startBtn = document.querySelector('.btn__reset');


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
  //let match = null;
  let found = false;
  //loop through letters in the phrase array
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i].innerText.toLowerCase();
    const btnText = button.innerText.toLowerCase();
    //if the btn character matches the array character
    if (btnText == letter) {
      //add 'show' class
      letters[i].classList.add("show");
      found = true;
      }
  }
  return found;
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
    //show the overlay screen for win
    overlay.classList.add('win');
    overlay.style.display = 'block';
  } else if (missed == 5) {
    //if missed variable is equal to or greater than 5 
    //show that the player has lost the game 
    overlay.classList.add('lose');
    overlay.style.display = 'block';
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
    check;
    //set button to disabled
    button.setAttribute('disabled', "disabled");
    if (check == false) {
      missed += 1;
      //change heart to half heart
      changeHeart();
    }
    //call function to check if player has won or lost
    checkWin();
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

const resetPhrase = () => {
//select the current phrase
const lis = document.querySelectorAll('#phrase li');
for (let i = 0; i < lis.length; i++) {
  const li = lis[i];
  li.remove();
}
//create new phrase and add to DOM

}

//reset game functionality
const resetGame = () => {
  //add reset buttons in win and lost modals 
  // change button inner text
  startBtn.innerText = 'Play again';
  //recreate keyboard 
  recreateKeyboard();
  //add new phrase 
  //reset score to 0 
}








