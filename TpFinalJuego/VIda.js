
class Vida {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.activa = true; // true = corazón lleno, false = vacío
  }

  dibujar() {
    if (this.activa) {
      image(imgCorazonLleno, this.x, this.y, 40, 30);
    } else {
      image(imgCorazonVacio, this.x, this.y, 40, 30);
    }
  }
}
