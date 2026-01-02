const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus")

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
    setTimeout(function () {
      dino.classList.remove("jump")
    }, 300)
  }
};

let dinoAlive = setInterval(function () {
  // console.log("check");

  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  // console.log(dinoTop);
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
  // console.log(cactusLeft)

  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 310) {
    alert("Game over")
  };

}, 10); 

document.addEventListener("keydown", function(event) {
  jump();
})