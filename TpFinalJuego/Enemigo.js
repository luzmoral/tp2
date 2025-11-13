
class Enemigo {
  constructor(x, y) {
    this.x = x;
    this.y = height - this.t / 2 - 50; // ajustá el -50 según el suelo de tu fondo
    this.vel = random(2, 4);
    this.t = 150; // tamaño del alien
  }

  dibujar() {
    push();
    imageMode(CENTER);
    image(imgAlien, this.x, this.y, this.t, this.t,);
    pop();
  }

  actualizar() {
    this.x -= this.vel;
    if (this.x < -50) this.reiniciar();
  }

  reiniciar() {
    this.x = width + random(100, 300);
    this.y = height - this.t / 2 - 50;

  }
}
