class Player extends Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, left, top, width, height, imgSrc);
    this.directionX = 0;
    this.directionY = 0;
  }

  move() {
    // Update player's car position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player's car stays within the game screen
    // handles left hand side
    if (this.left < 30) {
      this.left = 30;
    }

    // handles top side
    if (this.top < 50) {
      this.top = 50;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 50) {
      this.left = this.gameScreen.offsetWidth - this.width - 50;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 50) {
      this.top = this.gameScreen.offsetHeight - this.height - 50;
    }

    // Update the player's car position on the screen
    this.updatePosition();
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
