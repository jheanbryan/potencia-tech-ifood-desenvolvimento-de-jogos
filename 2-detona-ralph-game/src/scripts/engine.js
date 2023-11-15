const state = {
    views:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.getElementById('time-left'),
        score: document.getElementById('score')
    },
    values:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    }
};

function countDown(){
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0){
        window.alert(`Game over!\n Resultado: ${state.values.result}`)
    }
}

function randomSquare(){
    state.views.squares.forEach((square) => {
        square.classList.remove('enemy');
    })

    let randomNumber = Math.floor((Math.random() * 9));
    let randomSquare = state.views.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function movieEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(){
    let audio = new Audio('./src/sounds/hit.m4a');
    audio.volume = 0.1;
    audio.play();
}

function addListenerHitBox() {
    state.views.squares.forEach((square) => {
        square.addEventListener('click', () => {
           if (square.id === state.values.hitPosition){
            playSound();
            state.values.result++;
            state.views.score.textContent = state.values.result;
            state.values.hitPosition = null;
           };
        });
    });
}

function init() {
    movieEnemy();
    addListenerHitBox();
}

init();
