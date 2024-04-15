class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-screen");
    this.gameContainer = document.getElementById("game-container");
    this.stats = document.getElementById("game-stats");
    this.livesContainer = document.getElementById("lives");
    this.highScoreContainer = document.querySelector(
      "#end-screen-header .highScore"
    );
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      64,
      48,
      "./images/game-spaceship.svg"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.whiteEnemies = [
      "./images/enemies/game-alien-1.svg",
      "./images/enemies/game-alien-2.svg",
      "./images/enemies/game-alien-3.svg",
      "./images/enemies/game-alien-4.svg",
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
    // Show the stats
    this.stats.style.display = "flex";
    this.gameContainer.style.display = "block";
    this.livesContainer.textContent = this.lives;
    // Hide end-screen by restart
    this.gameEndScreen.style.display = "none";

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
      else if (this.player.projectileHit(obstacle)) {
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
      } else if (obstacle.top > this.height) {
        if (this.score === 0) {
          const livesContainer = document.getElementById("lives");
          livesContainer.textContent = this.lives;
          this.lives--;
        } else {
          this.score--;
        }
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
      }
    }
    // If lives are 0, end the game
    this.lives === 0 && this.endGame();

    // Create a new obstacle based on random probability
    // Amount of obstacle depends on the score
    if (this.score < 10) {
      if (Math.random() > 0.98 && this.obstacles.length < 3) {
        this.obstacles.push(
          new Obstacle(this.gameScreen, this.getRandomEnemy())
        );
      }
    } else {
      if (Math.random() > 0.98 && this.obstacles.length < this.score / 2.5) {
        this.obstacles.push(
          new Obstacle(this.gameScreen, this.getRandomEnemy())
        );
      }
    }

    if (this.highScore < this.score) {
      this.setHighScore(this.score);
    }
  }

  // Set highscore to localstorage
  setHighScore = (score) => {
    // update highscore
    this.highScore = score;

    // Set highscore to localstorage
    localStorage.setItem("highScore", JSON.stringify(this.highScore));
  };

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    document.getElementById("score").innerHTML = 0;
    this.gameIsOver = true;
    // Hide game screem
    this.gameScreen.style.display = "none";
    // Set score to high score if it's higher

    this.showEndScreen();
  }

  showEndScreen() {
    this.gameContainer.style.display = "none";
    this.gameEndScreen.style.display = "block";

    // Set highscore from localstorage to the end screen
    this.highScoreContainer.innerHTML = localStorage.getItem("highScore");
  }
}
