
class Jugador {
  constructor() {
    this.x = width / 2;
    this.y = height - 80;
    this.velocidad = 6;
    // this.imagen = imagenJugador;
  }

  mover(direccion) {
    this.x += direccion * this.velocidad;
    this.x = constrain(this.x, 40, width - 40);
  }

  mostrar() {
    fill(0, 0, 255);
    rect(this.x - 20, this.y - 20, 40, 40); // Reemplazo temporal si no hay imagen
    // image(this.imagen, this.x - 40, this.y - 40, 80, 80);
  }

  disparar() {
    disparos.push(new Disparo(this.x, this.y - 40));
    // sonidoDisparo.play();
  }
}
