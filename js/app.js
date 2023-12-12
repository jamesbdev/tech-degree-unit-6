const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const phrases = ["html is cool", "sunny in England", "kpop music", "rainy in Seoul", "New York City"]
let missed = 0;

const startBtn = document.querySelector('.btn__reset');

startBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
})

const getRandomPhraseAsArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const newArr = arr[randomIndex].split('');
  return newArr;
}

const addPhraseToDisplay = (arr) => {

}

getRandomPhraseAsArray(phrases);



