const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreEl = document.getElementById("score");
// тут мы переменные из HTML переносим в JS и по айди их находим get element ID
//  и даем им имя
const jumpMusic = new Audio('музло/прыжок.mp3');
const backMusic = new Audio('музло/Фон МАСТИ.mp3');
const deathMusic = new Audio('музло/проигрыш.mp3');

backMusic.loop = true; // чтоб бесконечно играла
backMusic.volume = 0.3; // громкость
let musicStarted = true;

jumpMusic.volume = 0.3;

deathMusic.volume = 0.3;

let gameStarted = false;
let cactusPassed = false;
let score = 0;
let currentSpeed = '1.5s';
let nextSpeed = '1.5s';

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    jumpMusic.currentTime = 0;
    jumpMusic.play();
    setTimeout(() => dino.classList.remove("jump"), 500);
  }
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  score = 0;
  scoreEl.innerText = 'Ваши очки: 0';
  cactus.style.animation = `block ${currentSpeed} infinite linear`;
  backMusic.play();
}

function changeSkin(skin) {
  dino.style.backgroundImage = `url('${skin}')`;
}

let dinoAlive = setInterval(function () {
  if (!gameStarted) return;

  let dinoRect = dino.getBoundingClientRect();
  let cactusRect = cactus.getBoundingClientRect();

  // 1. СТОЛКНОВЕНИЕ (getBoundingClientRect — самый точный метод)
  if (
    dinoRect.right > cactusRect.left + 15 && 
    dinoRect.left < cactusRect.right - 15 &&
    dinoRect.bottom > cactusRect.top + 10
  ) {
    deathMusic.currentTime = 0;
    deathMusic.play();
    backMusic.pause();
    alert("Game Over! Score: " + score);
    location.reload();
  }

  // 2. СЧЕТЧИК (Когда ПРАВАЯ сторона кактуса ушла левее ЛЕВОЙ стороны дино)
  if (cactusRect.right < dinoRect.left && !cactusPassed) {
    score++;
    cactusPassed = true;
    scoreEl.innerText = 'Ваши очки: ' + score;
    updateSpeed();
  }

  // 3. СБРОС ФЛАГА (Когда кактус снова вылетает справа)
  if (cactusRect.left > dinoRect.right) {
    cactusPassed = false;
  }
}, 10);

function updateSpeed() {
  // Логика прогрессии
  if (score >= 20) nextSpeed = '0.7s';
  else if (score >= 15) nextSpeed = '0.9s';
  else if (score >= 10) nextSpeed = '1.1s';
  else if (score >= 5) nextSpeed = '1.3s';

  if (currentSpeed !== nextSpeed) {
    // Чтобы плавно сменить скорость, ждем начала нового цикла анимации
    // Но для простоты сбрасываем сразу:
    cactus.style.animation = 'none';
    cactus.offsetHeight; 
    cactus.style.animation = `block ${nextSpeed} infinite linear`;
    currentSpeed = nextSpeed;
  }
}

// Слушатели событий
start.addEventListener('click', startGame);
document.addEventListener("keydown", (e) => { if(gameStarted) jump(); });
document.addEventListener("touchstart", (e) => { if(gameStarted) jump(); });


document.addEventListener("keydown", function(event) {
  if(!gameStarted) return;

  if(gameOver) return;

  if(musicStarted){
    backMusic.play();

  }
  jump();
})

document.addEventListener("touchstart", function (event) {
  jump();
}); // это прыжок для мобилы ( вместо key тут touchstart)




// ПЕЕЕЕРЕЕЕЕЕЕЕЕПИИИИИИИСАААААААТЬЬЬЬЬЬЬЬЬЬЬЬЬЬ ИЗМЕНЕНИЯ АНИМАЦИИ!!!!!!!!!!!1
