
class Jugador {
  constructor(imagenes, juego) { //posicion,tamaño,velocidad,frame alctual,direccion
    this.x = 100;
    this.y = 370;
    this.t = 140;
    this.v = 10;
    this.imagenes = imagenes;
    this.frame = 0;
    this.contador = 0;
    this.direccion = 1;
    this.juego = juego;
  }

  dibujar() {
    push();
    imageMode(CENTER);
    image(this.imagenes[this.frame], this.x, this.y, this.t, this.t * 1.6);
    pop();
  }

  actualizar() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
      this.contador++;
      
      if (this.contador % 6 === 0) {
        if (this.direccion === 1) this.frame = (this.frame + 1) % 4;
        else this.frame = 4 + ((this.frame - 4 + 1) % 4);
      }
    }
  }

  mover(direccion) {
    this.x += direccion * this.v;
    this.x = constrain(this.x, 0, width - this.t);
    this.direccion = direccion;
  }

 
  disparar() {
  juego.disparos.push(new Disparo(
    this.x + (this.t / 2) * this.direccion,
    this.y - 20,
    this.direccion
  ));
}
}
