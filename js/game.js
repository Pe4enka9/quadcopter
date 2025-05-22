const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

// Получаем элемент canvas из HTML и контекст для рисования
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = document.querySelector('main').offsetWidth;
canvas.height = document.querySelector('main').offsetHeight;

// Константы игры — неизменяемые параметры
const birdImg = new Image();
birdImg.src = 'img/bird.svg';
const GRAVITY = 0.5;         // Сила гравитации (ускорение птицы вниз)
const FLAP = -8;             // Сила взмаха крыльев (птица движется вверх)
const PIPE_WIDTH = 60;       // Ширина труб
let PIPE_GAP = 150;        // Расстояние между верхней и нижней трубой (отверстие)
const BIRD_SIZE = 40;        // Размер птицы (ширина и высота квадрата)

if (window.innerWidth <= 420) {
    canvas.height = 400;

    PIPE_GAP = 200;
}

// Переменные состояния игры
let birdY = canvas.height / 2;     // Вертикальная позиция птицы (по центру по Y)
let birdVelocity = 0;              // Текущая скорость птицы по оси Y
let pipes = [];                    // Массив труб
let score = 0;                     // Счёт игрока
let gameOver = false;              // Статус игры: закончена или нет

// Обработчик нажатий клавиш
document.addEventListener("keydown", e => {
    if (e.code === "Space") {      // Если нажат пробел
        if (!gameOver) {
            birdVelocity = FLAP;   // Птица взмывает вверх
        }
    }
});

// Обработчик клика мыши на canvas
canvas.addEventListener("click", () => {
    if (!gameOver) {
        birdVelocity = FLAP;
    }
});

// Создание новой трубы
function createPipe() {
    // Высота верхней части трубы случайная, но так, чтобы между трубами был зазор
    const topHeight = Math.random() * (canvas.height - PIPE_GAP - 100) + 20;
    pipes.push({
        x: canvas.width,           // Начальная позиция трубы за пределами экрана
        top: topHeight,            // Высота верхней трубы
        passed: false              // Флаг, прошла ли птица эту трубу
    });
}

// Функция перезапуска игры
function resetGame() {
    birdY = canvas.height / 2;     // Возвращаем птицу в начальную позицию
    birdVelocity = 0;              // Обнуляем скорость
    pipes = [];                    // Очищаем массив труб
    score = 0;                     // Сбрасываем счёт
    gameOver = false;              // Снимаем флаг окончания игры
}

// Счетчик кадров, используется для создания новых труб
let frames = 0;

// Логика обновления состояния игры
function update() {
    if (gameOver) return;          // Если игра окончена, выходим

    // Применяем гравитацию к птице
    birdVelocity += GRAVITY;
    birdY += birdVelocity;

    // Каждые 90 кадров создаём новую трубу (~1.5 секунды при 60 FPS)
    if (frames % 120 === 0) {
        createPipe();
    }

    // Обновляем позиции всех труб
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x -= 2;               // Двигаем трубу влево

        // Проверяем столкновение птицы с трубой
        if (
            pipe.x < 50 + BIRD_SIZE && // Птица достигла уровня трубы
            (birdY < pipe.top || birdY + BIRD_SIZE > pipe.top + PIPE_GAP) && // Птица вне промежутка
            pipe.x + PIPE_WIDTH > 50  // Труба ещё не миновала птицу
        ) {
            gameOver = true;       // Игра окончена
        }

        // Увеличиваем счёт, если птица успешно прошла трубу
        if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
            score++;
            pipe.passed = true;
        }
    }

    // Удаляем трубы, которые ушли за левый край экрана
    pipes = pipes.filter(pipe => pipe.x + PIPE_WIDTH > 0);

    // Проверяем столкновение с полом или потолком
    if (birdY + BIRD_SIZE > canvas.height || birdY < 0) {
        gameOver = true;
    }

    frames++;                      // Увеличиваем счетчик кадров
    requestAnimationFrame(draw); // Запрашиваем следующий кадр отрисовки
}

// Функция отрисовки графики
function draw() {
    // Очищаем холст перед каждой отрисовкой
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем птицу (прямоугольник)
    ctx.fillStyle = "#FFD700"; // Цвет: золотой
    // ctx.fillRect(50, birdY, BIRD_SIZE, BIRD_SIZE); // Координаты и размер птицы
    ctx.drawImage(birdImg, 50, birdY, BIRD_SIZE, BIRD_SIZE);

    // Рисуем трубы (верхняя и нижняя)
    ctx.fillStyle = "#228B22"; // Цвет: темно-зелёный
    for (let pipe of pipes) {
        // Верхняя труба
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
        // Нижняя труба
        ctx.fillRect(
            pipe.x,
            pipe.top + PIPE_GAP,
            PIPE_WIDTH,
            canvas.height - pipe.top - PIPE_GAP
        );
    }

    // Отображаем текущий счёт
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.textAlign = 'left';
    ctx.fillText("Счёт: " + score, 10, 30);

    // Если игра окончена — показываем сообщение
    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Полупрозрачный фон

        ctx.fillStyle = "#fff";

        if (window.innerWidth <= 420) {
            ctx.font = "18px Arial";
        } else {
            ctx.font = "36px Arial";
        }

        ctx.textAlign = "center";
        ctx.fillText("Игра окончена!", canvas.width / 2, canvas.height / 2);

        restartButton.style.display = 'block';
    }

    update(); // Переходим к следующему обновлению состояния игры
}

// Инициализация игры
birdImg.onload = function () {
    startButton.style.display = 'block';
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    resetGame();
    draw();
});

restartButton.addEventListener('click', () => {
    restartButton.style.display = 'none';
    resetGame();
    draw();
});
