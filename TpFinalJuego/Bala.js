
class Disparo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidad = 8;
  }

  actualizar() {
    this.y -= this.velocidad;
  }

  mostrar() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, 10);
  }
}
