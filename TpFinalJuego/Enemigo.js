
class Enemigo {
  constructor() {
    this.x = random(40, width - 40);
    this.y = -50;
    this.velocidad = random(2, 4);
    // this.imagen = imagenEnemigo;
  }

  actualizar() {
    this.y += this.velocidad;
  }

  mostrar() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 50); // Reemplazo temporal si no hay imagen
    // image(this.imagen, this.x - 35, this.y - 35, 70, 70);
  }
}
