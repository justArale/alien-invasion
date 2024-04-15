class Explosion {
  constructor(gameScreen, top, left) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.width = 50;
    this.height = 65;
    this.top = top;
    this.element = document.createElement("img");
    this.element.className = "explosion";

    this.element.src = "images/projectiles/game-alien-explode.svg";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  showExplosion() {
    setTimeout(() => this.element.remove(), 1500);
  }
}
