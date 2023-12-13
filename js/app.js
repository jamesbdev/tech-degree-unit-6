//Declare variables
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
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
    if (btnText == letter) {
      letters[i].classList.add("show");
      const matchingLetter = letter[i];
      return matchingLetter;
      } else {
      return null;
    }
  }
}

const changeHeart = () => {
  const hearts = document.querySelectorAll('.tries');
  console.log(hearts);
  //loop through hearts
  if (hearts) {
    for(let i = 0; i < hearts.length; i++){
      hearts[i].firstElementChild.setAttribute('src', 'images/lostHeart.png');
      hearts[i].classList.remove('tries');
      break;
    }
  }


}

//Add event listener to keyboard
keyboard.addEventListener('click', (event) => {
  const button = event.target;
  button.className = 'chosen';
  //set button attribute to disabled
  //check if chosen letter matches the phrase 
  const check = checkLetter(button);
  //set button to disabled
  console.log(check);
  button.setAttribute('disabled', "disabled");
  if (check == null) {
    missed += 1;
    //change heart to half heart
    changeHeart();
  }
  

} 
);



