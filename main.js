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

let score = 0;
let cactusPassed = false;
// это очки = 0, засчитанный кактус(в начале нет) и конец игры( сначала нет)
let gameOver = false;

let speedLevel = 1;



function jump() {

  if (dino.classList != "jump") {
    dino.classList.add("jump");

    jumpMusic.currentTime = 0;
    jumpMusic.play();

    setTimeout(function () {
      dino.classList.remove("jump")
    }, 300)
  }
};

start.addEventListener('click', startGame);

function startGame() {
    // если игра уже запущена — выходим
    if(gameStarted) return;

    // помечаем, что игра началась
    gameStarted = true;

    // запуск анимации(ее изначально оффаем)
    cactus.style.animation = 'block 1.5s infinite linear';
    // и тут музон врубается
    backMusic.play();
  }


let currentSpeed = '1.5s';
let nextSpeed = '1.5s';

let dinoAlive = setInterval(function () {
  // console.log("check");

  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  // Узнаём где сейчас динозавр по вертикали.
  // console.log(dinoTop);
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
  // Узнаём где сейчас кактус по горизонтали.
  // console.log(cactusLeft)

  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 310) {
    // dinoTop >= 310 это типа момент, когда он начинает прыгать, если он до 310 - 350
    // то он стоит и удар возможен, если меньше 310, то он прыгнул
    // ну тут типа если динозавр близко, то столкновение

    // Почему мы НЕ проверяем столкновение, когда dinoTop < 310? Потому что динозавр в воздухе и он перепрыгнул кактус
    //  значит умирать нельзя
    deathMusic.play();
    backMusic.pause();
    alert("Game Over! Score: " + score);
    location.reload();
  };

   if (cactusLeft < 0 && !cactusPassed) {
    //  тут если кактус ушел за экран и не был засчитан cactusPassed, то очко добавляется
    score++;
    cactusPassed = true;
    // запоминаем, что кактус был посчитан и идем дальше
    scoreEl.innerText = 'Ваши очки:' + score;
    // Показываем счёт на экране.
     console.log("SCORE:", score);
  }

  if (cactusLeft < 0 && currentSpeed !== nextSpeed) {
    // cactusLeft < 0 = препятствие закончено к след раунду идем  и когда наша обычная скорость
    // уже не равноа nextSpeed = то только тогда обновляем, что после каждого ухода кактуса
    // не обновлась скорость
  cactus.style.animation = 'none'; // полностью останавливаем анимацию
  cactus.offsetHeight; // принудительный reflow // полностью останавливаем анимацию(без этого склеятся команды)
  cactus.style.animation = `block ${nextSpeed} infinite linear`; 
  currentSpeed = nextSpeed;
}

  // 🔁 КАКТУС ПОЯВИЛСЯ ЗАНОВО
  if (cactusLeft > 600) {
    // тут ЕСЛИ ЭТО НЕ ПИСАТЬ, ТО СЧЕТЧИК НА 1 ЗАКАНЧИВАЕТСЯ И НЕ ОБНОВЛЯЕТСЯ, А ТУТ
    //  ЕСЛИ КАКТУС ВЫШЕЛ, ТИПА ДАЛЬШЕ 600 ПИКСЕЛЕЙ(ЕГО СПАВН), ТО СЧЕТЧИК ФАЛС И 
    //  МОЖНО УЖЕ ОЧКО ПРИБАВЛЯТЬ
    cactusPassed = false;
  }


  if(gameStarted) {
    if(score >= 20){
      nextSpeed = '.6s';
    } else if (score >= 15) {
      nextSpeed = '.8s';
    } else if (score >= 10) {
      nextSpeed = '1s';
    } else if(score >= 5) {
       nextSpeed = '1.2s';
    } else {
       nextSpeed = '1.5s';
    }
  }
  

}, 10); 

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
});





