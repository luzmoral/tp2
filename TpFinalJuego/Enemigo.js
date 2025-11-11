
class Enemigo {
  constructor() {
    this.lado = random([0, 1]);
    this.y = random(100, height - 100);
    this.velocidad = random(2, 4);
    // this.imagen = imagenEnemigo;
    
    if (this.lado === 0) {
      this.x = -50; // entra desde la izquierda
      this.direccion = 1;
    } else {
      this.x = width + 50; // entra desde la derecha
      this.direccion = -1;
    }
  }

  actualizar() {
    this.x += this.velocidad * this.direccion;
  }

  mostrar() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 50); // Reemplazo temporal si no hay imagen
    // image(this.imagen, this.x - 35, this.y - 35, 70, 70);
  }
}
