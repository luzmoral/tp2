class Juego {
  constructor() {
    this.jugador = 0;
    this.balas = [];             // Balas del jugador
    this.disparosEnemigos = [];  // Balas de enemigos
    this.enemigos = [];
    this.imagenesMorty = [];
    this.fondo = 0;

    this.puntos = 0;
    this.vidas = 3;
    this.desplazamientoFondo = 0;
    this.velocidadFondo = 2;
    this.fondoMaximo = 1200;

    this.estado = "inicio"; // "inicio", "jugando", "ganaste", "perdiste"
  }

  preload() {
    for (let i = 0; i < 8; i++) {
      this.imagenesMorty.push(loadImage("assets/morty/m" + (i + 1) + ".png"));
    }
    this.fondo = loadImage("assets/fondoJuego.jpg");
  }

  setup() {
    this.jugador = new Jugador(this.imagenesMorty, this);
  }

  draw() {
    background(0);

    if (this.estado === "inicio") {
      this.mostrarInicio();
    } else if (this.estado === "jugando") {
      this.ejecutarJuego();
    } else {
      this.mostrarFin();
    }
  }

  mostrarInicio() {
    image(this.fondo, 0, 0, width, height);
    fill(255);
    textSize(36);
    textAlign(CENTER);
    text("Morty Escape", width / 2, height / 2 - 40);
    textSize(20);
    text("Presioná ENTER para comenzar", width / 2, height / 2 + 20);
  }

  iniciarJuego() {
    this.estado = "jugando";
    this.puntos = 0;
    this.vidas = 3;
    this.desplazamientoFondo = 0;
    this.enemigos = [];
    this.balas = [];
    this.disparosEnemigos = [];
  }

  ejecutarJuego() {
    // Fondo desplazable
    let anchoImg = this.fondo.width;
    let x = -(this.desplazamientoFondo % anchoImg);
    image(this.fondo, x, 0, anchoImg, height);
    image(this.fondo, x + anchoImg, 0, anchoImg, height);

    // Jugador
    this.jugador.controlar();
    this.jugador.actualizar();
    this.jugador.dibujar();

    // Balas del jugador
    for (let i = this.balas.length - 1; i >= 0; i--) {
      this.balas[i].actualizar();
      this.balas[i].dibujar();

      if (this.balas[i].fueraDePantalla()) {
        this.balas.splice(i, 1);
        continue;
      }

      for (let j = this.enemigos.length - 1; j >= 0; j--) {
        if (dist(this.balas[i].x, this.balas[i].y, this.enemigos[j].x, this.enemigos[j].y) < 30) {
          this.enemigos.splice(j, 1);
          this.balas.splice(i, 1);
          this.puntos++;
          break;
        }
      }
    }

    // Enemigos
    if (this.desplazamientoFondo >= this.fondoMaximo) {
      if (this.enemigos.length < 5 && random(1) < 0.02) {
        this.enemigos.push(new Enemigo(width + 50, random(100, height - 100), this));
      }

      for (let e of this.enemigos) {
        e.dibujar();
        e.actualizar();

        // Disparos enemigos
        if (random(1) < 0.005) e.disparar();

        // Colisión enemigo-jugador
        if (dist(this.jugador.x, this.jugador.y, e.x, e.y) < 40) {
          this.vidas--;
          e.reiniciar();
        }
      }
    }

    // Disparos enemigos
    for (let i = this.disparosEnemigos.length - 1; i >= 0; i--) {
      this.disparosEnemigos[i].actualizar();
      this.disparosEnemigos[i].dibujar();

      if (this.disparosEnemigos[i].fueraDePantalla()) {
        this.disparosEnemigos.splice(i, 1);
        continue;
      }

      if (dist(this.disparosEnemigos[i].x, this.disparosEnemigos[i].y, this.jugador.x, this.jugador.y) < 30) {
        this.vidas--;
        this.disparosEnemigos.splice(i, 1);
      }
    }

    // HUD
    fill(255);
    textSize(20);
    text("Vidas: " + this.vidas, 20, 30);
    text("Puntos: " + this.puntos, 20, 60);

    if (this.vidas <= 0) this.estado = "perdiste";
    else if (this.puntos >= 10) this.estado = "ganaste";
  }

  mostrarFin() {
    image(this.fondo, 0, 0, width, height);
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text(this.estado === "ganaste" ? "GANASTE" : "PERDISTE", width / 2, height / 2);
    textSize(20);
    text("Presioná ENTER para volver a jugar", width / 2, height / 2 + 40);
  }

  keyPressed() {
    if (this.estado === "inicio" && keyCode === ENTER) {
      this.iniciarJuego();
    } else if (this.estado === "jugando" && key === ' ') {
      this.jugador.disparar();
    } else if ((this.estado === "ganaste" || this.estado === "perdiste") && keyCode === ENTER) {
      this.iniciarJuego();
    }
  }
}
