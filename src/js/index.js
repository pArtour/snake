import '../styles/main.scss';
const canvas = () => {

    const canvas = document.querySelector('.canvas'),
          ctx = canvas.getContext('2d');

    const background = new Image();
    background.src = '/src/img/bg.png';

    const foodImg = new Image();
    foodImg.src = '/src/img/food.png';

    const box = 32; // 1 square equals 32 px on bg image

    const state = {
        score: 0,
        food: {
            x: Math.floor(Math.random() * 17 + 1) * box, //17 cells on x axis 1 ceils to pass to prevent rendering images outside the "map"
            y: Math.floor(Math.random() * 15 + 3) * box //15 cells on y axis and 3 ceils to pass to prevent rendering images outside the "map"
        },
        snake: [],
        dir: ''
    }

    state.snake[0] = { // 1st elem (head of the snake)
        x: 9 * box, // 9 by x axis an 10 by y axis is the center of canvas 
        y: 10 * box
    };

    document.addEventListener('keydown', direction)

    function direction(event) {
        if ((event.keyCode == 37 || event.keyCode == 65) && state.dir != 'right') state.dir = 'left';
        if ((event.keyCode == 38 || event.keyCode == 87) && state.dir != 'dowm')  state.dir = 'up';
        if ((event.keyCode == 39 || event.keyCode == 68) && state.dir != 'left')  state.dir = 'right';
        if ((event.keyCode == 40 || event.keyCode == 83) && state.dir != 'up')    state.dir = 'down';
    }

    function eatTail(head, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (head.x == arr[i].x && head.y == arr[i].y) {
                clearInterval(game)
            }
        }
    }

    function printScore(state) {
        ctx.fillStyle = 'white';
        ctx.font = "50px Atial";
        ctx.fillText(state.score, box * 2.5, box * 1.7);
    }

    const drawGame = () => {

        ctx.drawImage(background, 0, 0);
        ctx.drawImage(foodImg, state.food.x, state.food.y);

        for (let i = 0; i < state.snake.length; i++) {
            ctx.fillStyle = i === 0 ? 'red' : 'green'; //head is red
            ctx.fillRect(state.snake[i].x, state.snake[i].y, box, box);
        }

        printScore(state);
        

        let snakeX = state.snake[0].x;
        let snakeY = state.snake[0].y;

        if (snakeX == state.food.x && snakeY == state.food.y) {
            state.score++;
            state.food = {
                x: Math.floor(Math.random() * 17 + 1) * box, //17 cells on x axis 1 ceils to pass to prevent rendering images outside the "map"
                y: Math.floor(Math.random() * 15 + 3) * box //15 cells on y axis and 3 ceils to pass to prevent rendering images outside the "map"
            };
        } else {
            state.snake.pop();
        }

        if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
            clearInterval(game);
        }

        if (state.dir == 'left') snakeX -= box;
        if (state.dir == 'right') snakeX += box;
        if (state.dir == 'up') snakeY -= box;
        if (state.dir == 'down') snakeY += box;

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        eatTail(newHead, state.snake);

        state.snake.unshift(newHead);
    }


    let game = setInterval(drawGame, 80)
}

canvas();