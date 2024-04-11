class Obstacle extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * 300 + 70),
      0,
      80,
      130,
      "./images/enemies/alien2.png"
    );
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 4; // if higher like 4 it moves faster
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
