const pianoKeys = document.querySelectorAll('.key');
const volumeSlider = document.querySelector('.input-volume');
const keysCheck = document.querySelector('.input-show-keys');

let audio = new Audio('src/tunes/a.wav');
let mapedKeys = [];

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add('active');
    setTimeout(() => {
        clickedKey.classList.remove('active');
    }, 150)
}

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => {playTune(key.textContent)});
    mapedKeys.push(key.textContent);
});

document.addEventListener('keydown', (e) => {
    if (mapedKeys.includes(e.key)) {
        playTune(e.key);
    }
});

const handVolume = (e) => {
    audio.volume = e.target.value;
}

const showHidekeys = (e) => {
    pianoKeys.forEach((key) => {
        key.classList.toggle('hide');
    })
}

volumeSlider.addEventListener('input', handVolume)
keysCheck.addEventListener('click', showHidekeys)