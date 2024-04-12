class Obstacle extends Component {
  constructor(gameScreen, imgSrc) {
    // Math.floor(Math.random() * 300 + 70) is a randomly generated number
    // representing the horizontal position of the car (space from the left game border)
    super(gameScreen, Math.floor(Math.random() * 300 + 70), 0, 50, 65, imgSrc);
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 2; // if higher like 4 it moves faster
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
