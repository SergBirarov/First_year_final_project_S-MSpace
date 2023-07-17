function Main() {

    // Назначение обработчика события клика по кнопке старт
    document.getElementById("startButton").addEventListener("click", startGame);

    // Переменные для счетчика и кнопки старт
    var score = -1;
    var isGameStarted = false;

    // Функция для обработки нажатия на кнопку старт
    function startGame() {
        isGameStarted = true;
        document.getElementById("startButton").style.display = "none";
    }

    // Функция для увеличения счетчика
    function increaseScore() {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
    }

    // Получение ссылки на холст и его контекст
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    // Переменные для игры
    var birdX = 50; // начальная позиция птицы по оси X
    var birdY = canvas.height / 2; // начальная позиция птицы по оси Y
    var birdDY = 0; // скорость птицы по оси Y
    var gravity = 0.2; // гравитация
    var jumpStrength = 4; // сила прыжка
    var gap = 150; // промежуток между верхней и нижней трубой
    var pipeWidth = 50; // ширина трубы
    // var pipeGap = 200; // расстояние между трубами
    var pipeX = canvas.width; // начальная позиция трубы по оси X
    var pipeY = generatePipeY(); // начальная позиция трубы по оси Y
    var pipeSpeed = 2; // скорость движения труб

    // Функция для генерации случайной позиции трубы по оси Y
    function generatePipeY() {
        increaseScore();

        return Math.random() * (canvas.height - gap * 2) + gap;
    }

    // Функция для обновления игровых объектов
    function update() {
        // Обновление позиции птицы
        birdY += birdDY;
        birdDY += gravity;

        // Обновление позиции трубы
        pipeX -= pipeSpeed;

        if (birdY < 0 || birdY > canvas.height) {
            location.reload(); // перезагрузка страницы
        }
        // Проверка столкновения птицы с трубой
        if (birdX + pipeWidth > pipeX && birdX < pipeX + pipeWidth && (birdY < pipeY || birdY > pipeY + gap)) {
            // Птица столкнулась с трубой, игра окончена
            // alert("Game Over");
            location.reload(); // перезагрузка страницы
        }
        // Проверка, если труба вышла за пределы экрана, генерируем новую трубу
        if (pipeX + pipeWidth < 0) {
            pipeX = canvas.width;
            pipeY = generatePipeY();
        }
    }

    // Функция для отрисовки игровых объектов
    function draw() {
        // Очистка холста
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Отрисовка птицы
        var birdImage = new Image();
        birdImage.src = "Assets/astronaut.png";
        context.drawImage(birdImage, birdX, birdY, 50, 50);

        // Отрисовка верхней трубы
        var pipeTopImage = new Image();
        pipeTopImage.src = "Assets/spaceBattery1.png";
        context.drawImage(pipeTopImage, pipeX, pipeY - pipeTopImage.height, pipeWidth, pipeTopImage.height);

        // Отрисовка нижней трубы
        var pipeBottomImage = new Image();
        pipeBottomImage.src = "Assets/spaceBattery2.png";
        context.drawImage(pipeBottomImage, pipeX, pipeY + gap, pipeWidth, canvas.height - pipeY - gap);
    }

    // Функция для обработки нажатия клавиши пробел
    function handleKeyPress(event) {
        if (event.keyCode === 32) { // код клавиши пробел
            if (!isGameStarted) {
                isGameStarted = true;
                document.getElementById("startButton").style.display = "none";
            }
            birdDY = -jumpStrength;
        }
    }

    // Назначение обработчика события нажатия клавиши пробел
    document.addEventListener("keydown", handleKeyPress);

    // Главный игровой цикл
    function gameLoop() {
        if (isGameStarted) {
            update(); // обновление игры
            draw(); // отрисовка игры
        }
        requestAnimationFrame(gameLoop); // рекурсивный вызов игрового цикла
    }

    // Запуск игрового цикла
    gameLoop();


}
Main();
