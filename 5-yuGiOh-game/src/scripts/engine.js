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
        id: 2,
        name: 'Dark Magician',
        type: 'rock',
        img: `${pathImages}maician.png`,
        winOf: [2],
        loseOf: [0]
    },
    {
        id: 3,
        name: 'Exodia',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1]
    },
];

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);

    return cardData[randomIndex];
}

async function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', idCard);
    cardImage.classList.add('card');

    if(fieldSide == playerSides.player1){
        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'));
        })
    }

    cardImage.addEventListener('mouseover', ()=> {
        console.log(idCard)
        drawSelectCards(idCard);
    });

    return cardImage;
}

async function drawSelectCards(index){
    //states.cardsSprites.avatar.src = cardData[index].img;
    states.cardsSprites.name.innerText = cardData[index].name;
    states.cardsSprites.type.innerText = "Atribute: " + cardData[index].type;
}

async function drawCards(cardNumber, fieldSide){
    for (let i = 0; i < cardNumber; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

}


init();