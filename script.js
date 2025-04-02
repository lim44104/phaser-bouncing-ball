let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 1.5;
let xspeed = 1.0;
let lives = 10; // Initialize lives variable
let livesText; // Text object to display lives

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Make the ball interactive
    ball.setInteractive();

    // Add a click event listener
    ball.on('pointerdown', () => {
        // Reduce the ball size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Increase the speed by 10%
        xspeed *= 1.1;
        yspeed *= 1.1;

        // Increase lives by 1 and update the text
        lives += 1;
        livesText.setText(`Lives: ${lives}`);
    });

    // Display lives on the top left of the screen
    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        font: "20px Arial",
        fill: "#ffffff"
    });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    // The || sign means "or"
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        // Multiplying by -1 will "flip" the direction
        yspeed *= -1;

        // Reduce lives by 1 and update the text
        lives -= 1;
        livesText.setText(`Lives: ${lives}`);
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;

        // Reduce lives by 1 and update the text
        lives -= 1;
        livesText.setText(`Lives: ${lives}`);
    }

    // Check if lives reach 0
    if (lives <= 0) {
        // Stop the ball's movement
        xspeed = 0;
        yspeed = 0;

        // Display "Game Over" text
        this.add.text(WIDTH / 2 - 100, HEIGHT / 2, "Game Over", {
            font: "40px Arial",
            fill: "#ff0000"
        }).setOrigin(0.5, 0.5);

        // Pause the game scene
        this.scene.pause();
    }
}
