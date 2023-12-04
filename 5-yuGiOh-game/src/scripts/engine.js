const states = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score-ponts')
    },
    cardsSprites:{
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type')
    },
    fieldCards:{
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    button: document.getElementById('next-duel')
};
const playerSides = {
    player1: 'player-cards',
    computer: 'computer-cards'
};

const pathImages = './src/assets/icons/'
const cardData = [
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'paper',
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2]
    },
    {
        id: 1,
        name: 'Dark Magician',
        type: 'rock',
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0]
    },
    {
        id: 2,
        name: 'Exodia',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1]
    },
];

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);

    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', idCard);
    cardImage.classList.add('card');

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'));
        });

        cardImage.addEventListener('mouseover', ()=> {
            drawSelectCard(idCard);
        });

    }



    return cardImage;
}

async function drawSelectCard(index){
    states.cardsSprites.avatar.src = cardData[index].img;
    states.cardsSprites.name.innerText = cardData[index].name;
    states.cardsSprites.type.innerText = "Atribute: " + cardData[index].type;

}

async function setCardsField(cardId){
    await removeAllCards();

    let computerCardId = await getRandomCardId()

    states.fieldCards.player.style.display = 'block';
    states.fieldCards.computer.style.display = 'block';


    states.fieldCards.player.src = cardData[cardId].img;
    states.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId)

    await updateScore();
    await drawButton(duelResults);
}

async function updateScore(){
    states.score.scoreBox.innerText = `Win: ${states.score.playerScore} | Lose: ${states.score.computerScore}`
}

async function drawButton(text){
    states.button.innerText = text;
    states.button.style.display = 'block';
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = 'draw';
    let playerCard = cardData[playerCardId]

    if (playerCard.winOf.includes(computerCardId)){
        duelResults = 'win';
        await playAudio('win');
        states.score.playerScore++;
    }
    if (playerCard.loseOf.includes(computerCardId)){
        duelResults = 'lose';
        await playAudio('lose');
        states.score.computerScore++;
    }

    return duelResults;
}

async function removeAllCards(){
    let cards = document.querySelector('#computer-cards');

    let imageElements = cards.querySelectorAll('img');
    imageElements.forEach((img) => {
        img.remove();
    });

    cards = document.querySelector('#player-cards');

    imageElements = cards.querySelectorAll('img');
    imageElements.forEach((img) => {
        img.remove();
    });
}

async function drawCards(cardNumber, fieldSide){
    for(let i = 0; i < cardNumber; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

async function resetDuel(){
    await cleanCardDetails();

    states.button.style.display = 'none';
    states.fieldCards.player.style.display = 'none';
    states.fieldCards.computer.style.display = 'none';

    init();

}

async function cleanCardDetails(){
    states.cardsSprites.avatar.src = '';
    states.cardsSprites.name.innerText = 'Selecione uma carta'
    states.cardsSprites.type.innerText = 'Selecione uma carta'
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);

    try {
        audio.play();   
    } catch{}
}

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById('bgm');
    bgm.play();
}


init();