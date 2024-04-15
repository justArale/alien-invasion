window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const launchScreen = document.getElementById("launch-screen");
  const highScoreContainer = document.querySelector(
    "#start-screen-header .highScore"
  );

  // Set highscore from localstorage to the start screen
  highScoreContainer.innerHTML = localStorage.getItem("highScore");

  let game;

  startButton.addEventListener("click", function () {
    // launchScreen.style.display = "block";
    showLaunchScreen();
    setTimeout(() => startGame(), 3000); // 3sec intro between start screen and game
    // startGame();
  });

  function startGame() {
    console.log("start game");
    launchScreen.style.display = "none";
    game = new Game(); // add a new game to "class Game"
    game.start(); // runs the start function in "class Game"
  }

  function showLaunchScreen() {
    launchScreen.style.display = "flex";
    const startScreen = document.getElementById("game-start-screen");
    startScreen.style.display = "none";
    const stats = document.getElementById("game-stats");
    stats.style.display = "none";
  }

  // function that handles the keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    // Check if the pressed key is on the possibleKeyStrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the pressed key
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -5; // higher number = faster
          break;
        case "ArrowUp":
          game.player.directionY = -5;
          break;
        case "ArrowRight":
          game.player.directionX = 5;
          break;
        case "ArrowDown":
          game.player.directionY = 5;
          break;
      }
    } else if (key === " ") {
      game.player.fireProjectile();
    }

    // Zusätzliche Logik, um die Richtung des Spielers zurückzusetzen, wenn keine Taste gedrückt wird
    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
          game.player.directionX = 0; // reset X-direction
          break;
        case "ArrowUp":
        case "ArrowDown":
          game.player.directionY = 0; // reset Y-direction
          break;
      }
    });
    // Add the handleKeydown function as an event listener for the keydown event
  }

  window.addEventListener("keydown", handleKeydown);

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    // location.reload();
    startGame();
  }
};
