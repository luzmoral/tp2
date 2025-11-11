class Enemigo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = random(2, 4);
    this.t = 50;
  }

  dibujar() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.t);
  }

  actualizar() {
    this.x -= this.vel;
    if (this.x < -50) this.reiniciar();
  }

  reiniciar() {
    this.x = width + random(100, 300);
    this.y = random(100, height - 100);
  }
}
