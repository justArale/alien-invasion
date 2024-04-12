class Projectile {
  constructor(gameScreen, top, left) {
    this.gameScreen = gameScreen;
    this.top = top;
    this.left = left;
    this.width = 5;
    this.height = 25;
    this.element = document.createElement("img");

    this.element.src = "./images/projectiles/projectile-green.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Move the protectiles
    this.top -= 20; // how many px between each move
    // Update the protectiles position on the screen
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }

  launch() {
    const projectileInterval = setInterval(() => {
      this.move();

      if (this.top + this.height < 0) {
        clearInterval(projectileInterval);
        this.element.remove();
      }
    }, 90); // counter of interval-speed (in milliseconds)
  }

  didCollide(obstacle) {
    const projectileRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      projectileRect.left < obstacleRect.right &&
      projectileRect.right > obstacleRect.left &&
      projectileRect.top < obstacleRect.bottom &&
      projectileRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
