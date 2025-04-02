let WIDTH = 800;
let HEIGHT = 600;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade', // Enable Arcade Physics
        arcade: {
            gravity: { y: 0 }, // No gravity for this game
            debug: false       // Set to true to see debug outlines
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let lives = 10; // Initialize lives variable
let livesText; // Text object to display lives
let click = 0; // Initialize click variable
let clickText; // Text object to display clicks

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    // Add the ball with physics enabled
    ball = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, "ball");
    ball.setDisplaySize(ballSize, ballSize); // Set the ball's size
    ball.setCollideWorldBounds(true); // Make the ball bounce off the world bounds
    ball.setBounce(1); // Set full bounce (elastic collision)
    ball.setVelocity(150, 150); // Set initial velocity

    // Enable world bounds collision event
    ball.body.onWorldBounds = true; // Enable world bounds event
    this.physics.world.on('worldbounds', () => {
        // Reduce lives by 1 and update the text
        lives -= 1;
        livesText.setText(`Lives: ${lives}`);
    });

    // Make the ball interactive
    ball.setInteractive();

    // Add a click event listener
    ball.on('pointerdown', () => {
        // Reduce the ball size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Increase the ball's velocity by 10%
        ball.setVelocity(ball.body.velocity.x * 1.1, ball.body.velocity.y * 1.1);

        // Increase lives by 1 and update the text
        lives += 1;
        livesText.setText(`Lives: ${lives}`);

        // Increase click count
        click += 1;
        clickText.setText(`Clicks: ${click}`); // Update the click text

        // Check if the user wins
        if (click >= 8) {
            // Stop the ball's movement
            ball.setVelocity(0, 0);

            // Display "YOU WIN" text
            this.add.text(WIDTH / 2 - 100, HEIGHT / 2, "YOU WIN", {
                font: "40px Arial",
                fill: "#00ff00"
            }).setOrigin(0.5, 0.5);

            // Pause the game scene
            this.scene.pause();
        }
    });

    // Display lives on the top left of the screen
    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        font: "20px Arial",
        fill: "#ffffff"
    });

    // Display clicks below lives
    clickText = this.add.text(10, 40, `Clicks: ${click}`, {
        font: "20px Arial",
        fill: "#ffffff"
    });
}

function update() {
    // Check if lives reach 0
    if (lives <= 0) {
        // Stop the ball's movement
        ball.setVelocity(0, 0);

        // Display "Game Over" text
        this.add.text(WIDTH / 2 - 100, HEIGHT / 2, "Game Over", {
            font: "40px Arial",
            fill: "#ff0000"
        }).setOrigin(0.5, 0.5);

        // Pause the game scene
        this.scene.pause();
    }
}
