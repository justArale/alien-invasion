class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndIntroScreen = document.getElementById("game-end-intro");
    this.gameEndScreen = document.getElementById("game-end-screen");

    this.player = new Player(
      this.gameScreen,
      200,
      500,
      50,
      65,
      "./images/whiteSpaceShip.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 1;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.whiteEnemies = [
      "./images/enemies/whiteAlien1.png",
      "./images/enemies/whiteAlien2.png",
      "./images/enemies/whiteAlien3.png",
    ];
  }

  // returns a random enemie from the this.whiteEnemies-array
  getRandomEnemy() {
    const randomIndex = Math.floor(Math.random() * this.whiteEnemies.length);
    return this.whiteEnemies[randomIndex];
  }

  start() {
    // Set the height and the width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "block";

    // Runs the gameLoop on the frequency od 60 times per secends.
    // Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency); // set the frequency
  }
  gameLoop() {
    // console.log("in the game loop"); // check if it's working

    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    this.gameIsOver && clearInterval(this.gameIntervalId); // short version of if-statement *
  }
  update() {
    //  console.log("in the update");
    this.player.move();

    // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
      // If the player's car collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        const livesContainer = document.getElementById("lives");
        livesContainer.textContent = this.lives;
        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (at the bottom) or shooten
      else if (
        obstacle.top > this.height ||
        this.player.projectileHit(obstacle)
      ) {
        // Increase the score by 1
        this.score++;
        const scoreContainer = document.getElementById("score");
        scoreContainer.textContent = this.score;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }
    // If lives are 0, end the game
    this.lives === 0 && this.endGame();

    // Create a new obstacle based on random probability
    // When there are 1 other obstacle on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen, this.getRandomEnemy()));
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;
    // Hide game screem
    this.gameScreen.style.display = "none";
    this.gameEndIntroScreen.style.display = "block";
    // this.showEndScreen();
    setTimeout(() => this.showEndScreen(), 3000);
  }

  showEndScreen() {
    this.gameEndIntroScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}

// if (something) do something
// something && do something

// if (something) do something else do something else
// somethinmg ? here if it is true : here if it is false
