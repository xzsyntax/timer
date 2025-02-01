const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const setMinutesInput = document.getElementById('setMinutes');
const setSecondsInput = document.getElementById('setSeconds');
const alarmSound = document.getElementById('alarmSound');

let timeLeft;
let timerId = null;
let isRunning = false;

function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = 'Başlat';
        isRunning = false;
        return;
    }

    let minutes = parseInt(setMinutesInput.value) || 0;
    let seconds = parseInt(setSecondsInput.value) || 0;

    if (minutes === 0 && seconds === 0) return;

    timeLeft = minutes * 60 + seconds;
    startBtn.textContent = 'Durdur';
    isRunning = true;

    timerId = setInterval(() => {
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerId);
            alarmSound.play();
            startBtn.textContent = 'Başlat';
            isRunning = false;
            updateDisplay(0, 0);
            return;
        }

        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;
        updateDisplay(minutesLeft, secondsLeft);
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Başlat';
    setMinutesInput.value = '';
    setSecondsInput.value = '';
    updateDisplay(0, 0);
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Input kontrolü
setMinutesInput.addEventListener('input', function() {
    if (this.value > 59) this.value = 59;
    if (this.value < 0) this.value = 0;
});

setSecondsInput.addEventListener('input', function() {
    if (this.value > 59) this.value = 59;
    if (this.value < 0) this.value = 0;
}); 