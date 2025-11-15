
class Disparo {
  constructor(x, y, direccion) {
    //atributos del modelo
    this.x = x;
    this.y = y;
    this.direccion = direccion;
    this.velocidad = 10;
    this.eliminado = false;
  }

  actualizar() {
    this.x += this.velocidad * this.direccion;
  }

  dibujar() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, 10);
  }
}
