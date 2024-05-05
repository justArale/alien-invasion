class Player extends Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, left, top, width, height, imgSrc);
    this.directionX = 0;
    this.directionY = 0;
    this.playerProjectile = [];
  }

  move() {
    // Update player's space ship position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player's space ship stays within the game screen
    // handles left hand side
    if (this.left < 10) {
      this.left = 10;
    }

    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles bottom side
    // if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
    //   this.top = this.gameScreen.offsetHeight - this.height - 10;
    // }

    // Update the player's space ship position on the screen
    this.updatePosition();
  }

  fireProjectile() {
    const projectile = new Projectile(
      this.gameScreen,
      this.top,
      this.left + this.width / 2
    );

    this.playerProjectile.push(projectile);

    const shootSound = new Audio("sounds/sfx-laser1.ogg");
    shootSound.play();
    for (let i = 0; i < this.playerProjectile.length; i++) {
      const projectile = this.playerProjectile[i];
      projectile.launch();
    }
  }

  //   projectileHit(obstacle) {
  //     for (let i = 0; i < this.playerProjectile.length; i++) {
  //       if (this.playerProjectile[i].didHit(obstacle)) {
  //         this.playerProjectile[i].destroyProjectile();
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }

  projectileHit(obstacle) {
    for (let i = 0; i < this.playerProjectile.length; i++) {
      const projectile = this.playerProjectile[i];
      if (projectile.didHit(obstacle)) {
        projectile.showExplosion(obstacle);
        projectile.destroyProjectile();
        return true;
      }
    }
    return false;
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
