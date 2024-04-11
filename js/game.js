class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-screen");

    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      130,
      "./images/enemies/alien1.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
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
    console.log("in the game loop"); // check if it's working

    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    this.gameIsOver && clearInterval(this.gameIntervalId); // short version of if-statement *
  }
  update() {
    console.log("in the update");
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
      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.top > this.height) {
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
    // When there is no other obstacle on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;
    // Hide game screem
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}

// *
// if (something) do something
// something && do something

// if (something) do something else do something else
// somethinmg ? here if it is true : here if it is false

/*  
  scoreContainer = document.getElementById("score");
  scoreContainer.innerHTML = this.score; 
          
  livesContainer = document.getElementById("lives");
  livesContainer.textContent = this.lives;       
  */
