class Disparo {
  constructor(x, y, direccion) {
    this.x = x;
    this.y = y;
    this.direccion = direccion; // 1 = derecha, -1 = izquierda
    this.velocidad = 10;
  }

  actualizar() {
    this.x += this.velocidad * this.direccion;
  }

  mostrar() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, 10);
  }
}
