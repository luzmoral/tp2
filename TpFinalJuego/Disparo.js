class Disparo {
  constructor(x, y, direccion) {
    this.x = x;
    this.y = y;
    this.vel = 10;
    this.direccion = direccion;
  }

  dibujar() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, 10);
  }

  actualizar() {
    this.x += this.vel * this.direccion;
  }
}
