class Jugador {
  constructor() {
    this.x = 100;
    this.y = height - 150;
    this.velocidad = 6;
    this.frame = 0;
    this.contador = 0;
    this.direccion = 1; // 1 = derecha, -1 = izquierda
  }

  mover(direccion, forzarAnimacion = false) {
    //  Si el fondo no se mueve, Morty se desplaza
    if (juegoActivo) {
      this.x += direccion * this.velocidad;
      this.x = constrain(this.x, 40, width / 2);
    } else {
      //  Si el fondo ya frenó, puede moverse libremente
      this.x += direccion * this.velocidad;
      this.x = constrain(this.x, 40, width - 40);
    }

    //  Guarda hacia dónde mira
    if (direccion !== 0) {
      this.direccion = direccion;
    }

    //  Animación (incluso si está quieto pero "forzarAnimación" está activo)
    this.contador++;
    if (this.contador % 6 === 0 && (direccion !== 0 || forzarAnimacion)) {
      if (this.direccion === 1) {
        // Frames 0–3 → derecha
        this.frame = (this.frame + 1) % 4;
      } else {
        // Frames 4–7 → izquierda
        this.frame = 4 + ((this.frame - 4 + 1) % 4);
      }
    }
  }

  mostrar() {
    push()
    imageMode(CENTER);
    image(imagenesMorty[this.frame], this.x, this.y, 135, 235);
    pop()
  }

disparar() {
  disparos.push(new Disparo(this.x + this.direccion * 40, this.y - 20, this.direccion));
 }
}
