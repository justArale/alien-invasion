class Explosion {
  constructor(gameScreen, top, left) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.width = 5;
    this.height = 5;
    this.top = top;
    this.element = document.createElement("img");

    this.element.src = "./images/projectiles/game-alien-explode.svg";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
    // console.log("explosion append"); // works
  }

  grow() {
    // Move the protectiles
    this.width += 4;
    this.height += 4;
    // Update the protectiles position on the screen
    this.updateSize();
  }

  updateSize() {
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }

  showExplosion() {
    // this.top = obstacle.top;
    this.grow();
    // console.log("show explosion"); // works
  }
}
