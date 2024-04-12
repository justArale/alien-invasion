class Projectile {
  constructor(gameScreen, top, left, velocity) {
    this.gameScreen = gameScreen;
    this.top = top;
    this.left = left;
    this.velocity = velocity;
    this.width = 5;
    this.height = 15;
    this.element = document.createElement("img");

    this.element.src = "./images/projectile.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Move the protectiles up by passed velocity
    this.top -= this.velocity; // it moves faster if higher
    // Update the protectiles position on the screen
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
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
