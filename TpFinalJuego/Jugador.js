class Jugador {
  constructor() {
    this.x = 100;
    this.y = 370;
    this.t = 140;
    this.v = 10;
    this.imagenes = imagenesMorty;
    this.frame = 0;
    this.contador = 0;
    this.direccion = 1; // 1 = derecha, -1 = izquierda
  }

  dibujar() {
    push();
    imageMode(CENTER);
    image(this.imagenes[this.frame], this.x, this.y, this.t, this.t * 1.6);
    pop();
  }

  actualizar() {
    // Solo animar si se está moviendo
    if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
      this.contador++;
      if (this.contador % 6 === 0) {
        if (this.direccion === 1) {
          // 🔹 Frames 0–3: derecha
          this.frame = (this.frame + 1) % 4;
        } else {
          // 🔹 Frames 4–7: izquierda
          this.frame = 4 + ((this.frame - 4 + 1) % 4);
        }
      }
   }
  }

  mover(direccion) {
    this.x += direccion * this.v;
    this.x = constrain(this.x, 0, width - this.t);
    this.direccion = direccion;
  }

  disparar() {
    disparos.push(new Disparo(this.x + this.t / 2 * this.direccion, this.y - 20, this.direccion));
  }
}
