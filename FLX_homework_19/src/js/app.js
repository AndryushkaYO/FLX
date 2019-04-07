/*---Buttons----*/
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

const root = document.getElementById('root');
const resultPlace = document.getElementById('result');
let counter = 0;
let raundResult;
let wins = 0;
let looses = 0;
let finalResult;
let first=true;

const getRandom = () => {
    const types = ['rock', 'paper', 'scissors'];
    return types[Math.floor(Math.random() * types.length)];
};
const getResult = (random, chosen) => {
    if (random === chosen) {
        return 'It is a DRAW!';
    }
    if (chosen === 'rock') {
        return random === 'paper' ? 'You’ve LOST!' : 'You’ve WON!';
    }
    if (chosen === 'paper') {
        return random === 'rock' ? 'You’ve WON!' : 'You’ve LOST!';
    }
    if (chosen === 'scissors') {
        return random === 'rock' ? 'You’ve LOST!' : 'You’ve WON!';
    }
};
const showImg = (img) => {
    const imageShape = document.createElement('img');
    raundResult.appendChild(imageShape);
    imageShape.setAttribute('src', `img/${img}.jpg`);
};


/*--- Game Logic ---*/
const playGame = (event) => {
    if (raundResult && raundResult.parentNode === root) {
        root.removeChild(raundResult);
    }
    if (counter === 0 && !first) {
        resultPlace.removeChild(finalResult);          
        first=true;     
    }
    counter++; 

    raundResult = document.createElement('div');
    raundResult.setAttribute('id', 'game-result');
    root.appendChild(raundResult);

    const random = getRandom();
    const result = getResult(random, event.target.id);

    if (result === 'You’ve LOST!') {
        looses++;
    }
    if (result === 'You’ve WON!') {
        wins++;
    }

    showImg(event.target.id);

    const getInfo = document.createElement('p');
    raundResult.appendChild(getInfo);
    const getInfoText = document.createTextNode(
        `Round ${counter}, 
      ${event.target.id} vs ${random}, 
      ${result}`
    );

    getInfo.appendChild(getInfoText);
    showImg(random);

    if (counter > 2) {
        finalResult = document.createElement('h3');
        resultPlace.appendChild(finalResult);
        let win = `Congratulations you've WON! Your score: ${wins}:${looses}`;
        let lose = `Sorry, you've LOST! Your score: ${wins}:${looses}`;
        let draw = `It is a DRAW! Your score: ${wins}:${looses}`;
        let rez = wins > looses ? win : lose;
        if (wins === looses) {
            rez = draw;
        }
        let text = document.createTextNode(rez);
        finalResult.appendChild(text);
        counter = 0;
        wins = 0;
        looses = 0;
        first=false;
    }
};

const resetGame = () => {
    counter = 0;
    wins = 0;
    looses = 0;

    if (finalResult && finalResult.parentNode === result) {
        result.removeChild(finalResult);
    }

    if (raundResult && raundResult.parentNode === root) {
        root.removeChild(raundResult);
    }
};

/*-- Events --*/
rockBtn.addEventListener('click', playGame);
paperBtn.addEventListener('click', playGame);
scissorsBtn.addEventListener('click', playGame);
resetBtn.addEventListener('click', resetGame);