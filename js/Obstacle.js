class Obstacle extends Component {
  constructor(gameScreen, imgSrc) {
    // Math.floor(Math.random() * 300 + 70) is a randomly generated number
    // representing the horizontal position of the car (space from the left game border)
    super(gameScreen, Math.floor(Math.random() * 300 + 70), 0, 50, 65, imgSrc);
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 3; // if higher like 4 it moves faster
    // Update the obstacle's position on the screen
    this.updatePosition();
  }

  // launch() {
  //   const obstacleInterval = setInterval(() => {
  //     this.move();

  //     if (this.top + this.height > 0) {
  //       clearInterval(obstacleInterval);
  //     }
  //   }, 1000); // counter of interval-speed (in milliseconds)
  // }
}
