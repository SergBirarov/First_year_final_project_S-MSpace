function Main() {

    let start = document.getElementById("startButton");

    start.addEventListener("click", startGame);


    function startGame() {
        isGameStarted = true;
        document.getElementById("startButton").style.display = "none";
        let sec = 0
        let timer = setInterval(() => {
            document.getElementById("time").innerHTML = 'Time: ' + sec;
            sec++;
        }, 1000);

    }

    function increaseScore() {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
    }

    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    var score = -1;
    var isGameStarted = false;

    var birdX = 50;
    var birdY = canvas.height / 2;
    var birdDY = 0;
    var gravity = 0.2;
    var jumpStrength = 4;
    var gap = 150;
    var pipeWidth = 50;
    var pipeX = canvas.width;
    var pipeY = generatePipeY();
    var pipeSpeed = 2;


    function generatePipeY() {
        increaseScore();
        return Math.random() * (canvas.height - gap * 2) + gap;
    }

    function update() {
        birdY += birdDY;
        birdDY += gravity;

        pipeX -= pipeSpeed;

        if (birdY < 0 || birdY > canvas.height) {
            location.reload();
        }
        if (birdX + pipeWidth > pipeX && birdX < pipeX + pipeWidth && (birdY < pipeY || birdY > pipeY + gap)) {
            location.reload();
        }
        if (pipeX + pipeWidth < 0) {
            pipeX = canvas.width;
            pipeY = generatePipeY();
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        let birdImage = new Image();
        birdImage.src = "Assets/astronaut.png";
        context.drawImage(birdImage, birdX, birdY, 50, 50);

        let pipeTopImage = new Image();
        pipeTopImage.src = "Assets/spaceBattery1.png";
        context.drawImage(pipeTopImage, pipeX, pipeY - pipeTopImage.height, pipeWidth, pipeTopImage.height);

        let pipeBottomImage = new Image();
        pipeBottomImage.src = "Assets/spaceBattery2.png";
        context.drawImage(pipeBottomImage, pipeX, pipeY + gap, pipeWidth, canvas.height - pipeY - gap);
    }

    function handleKeyPress(event) {
        if (event.keyCode === 32) {
            if (!isGameStarted) {
                isGameStarted = true;
                document.getElementById("startButton").style.display = "none";
            }
            birdDY = -jumpStrength;
        }
    }

    document.addEventListener("keydown", handleKeyPress);

    function gameLoop() {
        if (isGameStarted) {
            update();
            draw();
        }
        requestAnimationFrame(gameLoop); // рекурсивный вызов игрового цикла
    }

    gameLoop();


}
Main();
