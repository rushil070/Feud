let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");


let gameStarted = false;
let gameOver = false;
let winScore = 20;
let winnerMessage = "";
let fastMode = false;
let grass = new Image();
grass.src = "grass.jpg";


let coinImg = new Image();
coinImg.src = "coin.png";


let p1Img = new Image();
p1Img.src = "Player1.png";


let p2Img = new Image();
p2Img.src = "Player2.png";


let player1 = {
   x: 100,
   y: 250,
   size: 40,
   speed: 5,
   score: 0
};


let player2 = {
   x: 1000,
   y: 250,
   size: 40,
   speed: 5,
   score: 0
};


let coins = [];


let keys = {};


document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);


function resetGameState() {
   winnerMessage = "";
   gameStarted = false;
   gameOver = false;
   fastMode = false;
   player1.score = 0;
   player2.score = 0;
   winScore = 20;
   player1.x = 100;
   player1.y = 250;
   player2.x = 1000;
   player2.y = 250;
   coins = [];

   clearKeys();
   updateScore();
}

function clearKeys() {
   for (let key in keys) {
       keys[key] = false;
   }
}


function spawnCoin() {
   return {
       x: Math.random() * (canvas.width - 50),
       y: Math.random() * (canvas.height - 50),
       size: 30
   };
}


function updateScore() {
   document.getElementById("player1Score").innerText = "Player 1: " + player1.score;
   document.getElementById("player2Score").innerText = "Player 2: " + player2.score;
}


function movePlayers() {
   if (!gameStarted || gameOver) return;


   if (keys["w"]) player1.y -= player1.speed;
   if (keys["s"]) player1.y += player1.speed;
   if (keys["a"]) player1.x -= player1.speed;
   if (keys["d"]) player1.x += player1.speed;


   if (keys["ArrowUp"]) player2.y -= player2.speed;
   if (keys["ArrowDown"]) player2.y += player2.speed;
   if (keys["ArrowLeft"]) player2.x -= player2.speed;
   if (keys["ArrowRight"]) player2.x += player2.speed;


   player1.x = Math.max(0, Math.min(canvas.width - player1.size, player1.x));
   player1.y = Math.max(0, Math.min(canvas.height - player1.size, player1.y));


   player2.x = Math.max(0, Math.min(canvas.width - player2.size, player2.x));
   player2.y = Math.max(0, Math.min(canvas.height - player2.size, player2.y));
}


function checkCoins(player) {
   if (!gameStarted || gameOver) return;


   for (let coin of coins) {
       let dx = player.x - coin.x;
       let dy = player.y - coin.y;
       let dist = Math.sqrt(dx * dx + dy * dy);


       if (dist < 30) {
           player.score++;
           updateScore();


           coin.x = Math.random() * (canvas.width - 50);
           coin.y = Math.random() * (canvas.height - 50);


           if (player.score >= winScore) {
               endGame(player);
           }
       }
   }
}


function endGame(winner) {


   gameStarted = false;
   gameOver = true;


   coins = [];


   if (winner === player1) {
       winnerMessage = "Player 1 Wins!";
   }
   else if (winner === player2) {
       winnerMessage = "Player 2 Wins!";
   }
   else {
       winnerMessage = "It's a Tie!";
   }
}


function draw() {
   ctx.drawImage(grass, 0, 0, canvas.width, canvas.height);
   if (gameStarted) {
       for (let coin of coins) {
           ctx.drawImage(coinImg, coin.x, coin.y, coin.size, coin.size);
       }
       ctx.drawImage(p1Img, player1.x, player1.y, player1.size, player1.size);
       ctx.drawImage(p2Img, player2.x, player2.y, player2.size, player2.size);
   }
   if (gameOver) {
       ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
       ctx.fillRect(0, 0, canvas.width, canvas.height);
       ctx.fillStyle = "gold";
       ctx.font = "bold 60px Arial";
       ctx.textAlign = "center";
       ctx.fillText(
           winnerMessage,
           canvas.width / 2,
           canvas.height / 2
       );
   }
}


function loop() {
   draw();
   movePlayers();
   checkCoins(player1);
   checkCoins(player2);
   requestAnimationFrame(loop);
}
loop();


document.getElementById("startBtn").addEventListener("click", () => {
   resetGameState();
   coins = [spawnCoin()];
   player1.speed = 4;
   player2.speed = 4;
   gameStarted = true;
});


document.getElementById("resetBtn").addEventListener("click", () => {
   resetGameState();
});


document.getElementById("hardModeBtn").addEventListener("click", () => {
   resetGameState();


   coins = [];
   for (let i = 0; i < 5; i++) {
       coins.push(spawnCoin());
   }
   player1.speed = 4;
   player2.speed = 4;
   gameStarted = true;
});


document.getElementById("fastModeBtn").addEventListener("click", () => {
   resetGameState();
   fastMode = true;
   player1.speed = 12;
   player2.speed = 12;


   coins = [
       {
           x: Math.random() * (canvas.width - 50),
           y: Math.random() * (canvas.height - 50),
           size: 30
       }
   ];


   gameStarted = true;
});

document.getElementById("closeWelcomeBtn").addEventListener("click", () => {
    document.getElementById("welcomeModal").style.display = "none";
});

document.getElementById("tenModeBtn").addEventListener("click", () => {

    resetGameState();

    winScore = 10;

    coins = [spawnCoin()];

    player1.speed = 4;
    player2.speed = 4;

    gameStarted = true;
});