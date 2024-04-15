class Explosion {
  constructor(gameScreen, top, left) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.width = 20;
    this.height = 20;
    this.top = top;
    this.element = document.createElement("img");

    this.element.src = "images/projectiles/game-alien-explode.svg";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
    // console.log("explosion append"); // works
  }

  launch() {
    const explosionIntervall = setInterval(() => {
      this.grow();
      if (this.width > 32 && this.height > 32) {
        clearInterval(explosionIntervall);
        this.element.remove();
      }
    }, 600); // counter of interval-speed (in milliseconds)
  }

  grow() {
    // increase the imgagesize
    this.width += 4;
    this.height += 4;
    // Update the imgagesize on the screen
    this.updateSize();
  }

  updateSize() {
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }

  showExplosion() {
    this.launch();
  }
}
