


class Enemigo {
  constructor(x, y) {
    this.t = 150; // tamaño del alien
    this.x = x;
    this.y = height - this.t / 2 - 50; 
    this.vel = random(2, 4);
    
  }

  dibujar() {
    push();
    imageMode(CENTER);
    image(imgAlien, this.x, this.y, this.t, this.t,);
    pop();
  }
 
 // reaparece en la izquierda
  actualizar() {
    this.x -= this.vel;
    if (this.x < -50) this.reiniciar();
  }


  reiniciar() {
    this.x = width + random(100, 300);
    this.y = height - this.t / 2 - 50;

  }
}
