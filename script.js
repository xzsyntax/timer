const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const setMinutesInput = document.getElementById('setMinutes');
const setSecondsInput = document.getElementById('setSeconds');
const alarmSound = document.getElementById('alarmSound');
const trBtn = document.getElementById('tr-btn');
const enBtn = document.getElementById('en-btn');

let timeLeft;
let timerId = null;
let isRunning = false;
let currentLanguage = 'tr';

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Dil butonlarının aktif durumunu güncelle
    if (lang === 'tr') {
        trBtn.classList.add('active');
        enBtn.classList.remove('active');
    } else {
        enBtn.classList.add('active');
        trBtn.classList.remove('active');
    }

    // Başlığı güncelle
    document.querySelector('h1').textContent = document.querySelector('h1').getAttribute(`data-${lang}`);
    
    // Butonları güncelle
    startBtn.textContent = startBtn.getAttribute(`data-${lang}`);
    resetBtn.textContent = resetBtn.getAttribute(`data-${lang}`);
    
    // Input placeholder'ları güncelle
    setMinutesInput.placeholder = setMinutesInput.getAttribute(`data-${lang}-placeholder`);
    setSecondsInput.placeholder = setSecondsInput.getAttribute(`data-${lang}-placeholder`);

    // Başlat/Durdur butonunun durumunu kontrol et
    if (isRunning) {
        startBtn.textContent = lang === 'tr' ? 'Başlat' : 'Start';
    }
}

function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = currentLanguage === 'tr' ? 'Başlat' : 'Start';
        isRunning = false;
        return;
    }

    let minutes = parseInt(setMinutesInput.value) || 0;
    let seconds = parseInt(setSecondsInput.value) || 0;

    if (minutes === 0 && seconds === 0) return;

    timeLeft = minutes * 60 + seconds;
    startBtn.textContent = currentLanguage === 'tr' ? 'Durdur' : 'Stop';
    isRunning = true;

    timerId = setInterval(() => {
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerId);
            alarmSound.play();
            startBtn.textContent = currentLanguage === 'tr' ? 'Başlat' : 'Start';
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
    startBtn.textContent = currentLanguage === 'tr' ? 'Başlat' : 'Start';
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

// Sayfa yüklendiğinde Türkçe'yi aktif et
changeLanguage('tr'); 