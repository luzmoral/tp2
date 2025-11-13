class Juego {
  constructor(imagenesMorty, fondo, imgAlien, imgCorazonLleno, imgCorazonVacio, portada, fondoCreditos) {
    this.imagenesMorty = imagenesMorty;
    this.fondo = fondo;
    this.imgAlien = imgAlien;
    this.imgCorazonLleno = imgCorazonLleno;
    this.imgCorazonVacio = imgCorazonVacio;
    this.portada = portada;
    this.fondoCreditos = fondoCreditos;

    this.jugador = 0;
    this.disparos = [];
    this.enemigos = [];
    this.vidasJugador = [];
    this.puntos = 0;

    this.desplazamientoFondo = 0;
    this.velocidadFondo = 2;
    this.fondoMaximo = 1200;

    this.estado = "inicio"; //  "inicio", "jugando", "creditos"

    // botones
    this.botonJugar = { x: 240, y: 300, w: 160, h: 50 };
    this.botonCreditos = { x: 240, y: 370, w: 160, h: 50 };
  }

  iniciar() {
    this.jugador = new Jugador(this.imagenesMorty, this);
    this.disparos = [];
    this.enemigos = [];
    this.vidasJugador = [];
    this.puntos = 0;
    this.desplazamientoFondo = 0;

    for (let i = 0; i < 3; i++) {
      this.vidasJugador.push(new Vida(20 + i * 50, 20));
    }
  }

  actualizar() {
    if (this.estado !== "jugando") return;

    if (keyIsDown(LEFT_ARROW)) this.jugador.mover(-1);

    if (keyIsDown(RIGHT_ARROW)) {
      if (this.desplazamientoFondo < this.fondoMaximo) {
        if (this.jugador.x < width / 2) this.jugador.mover(1);
        else {
          this.desplazamientoFondo += this.velocidadFondo;
          this.jugador.actualizar();
        }
      } else {
        this.jugador.mover(1);
      }
    }

    this.jugador.actualizar();

    // disparos y colisiones
    for (let d of this.disparos) {
      if (!d.eliminado) {
        d.actualizar();
        for (let e of this.enemigos) {
          if (!e.eliminado && dist(d.x, d.y, e.x, e.y) < 30) {
            e.eliminado = true;
            d.eliminado = true;
            this.puntos++;
          }
        }
      }
    }

    this.disparos = this.disparos.filter(d => !d.eliminado);

    // enemigos
    if (this.desplazamientoFondo >= this.fondoMaximo) {
      if (this.enemigos.length < 5 && random(1) < 0.02) {
        this.enemigos.push(new Enemigo(width + 50, random(100, height - 100)));
      }

      for (let e of this.enemigos) {
        if (!e.eliminado) {
          e.actualizar();
          if (dist(this.jugador.x, this.jugador.y, e.x, e.y) < 40) {
            this.quitarVida();
            e.reiniciar();
          }
        }
      }
    }

    // revisar fin del juego
    const vidasRestantes = this.vidasJugador.filter(v => v.activa).length;
    if (vidasRestantes === 0) this.estado = "creditos";
    if (this.puntos >= 10) this.estado = "creditos";
  }

  dibujar() {
    if (this.estado === "inicio") this.mostrarInicio();
    else if (this.estado === "jugando") this.mostrarJuego();
    else if (this.estado === "creditos") this.mostrarCreditos();
  }

  mostrarInicio() {
    image(this.portada, 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    textSize(36);
    text("Morty Escape", width / 2, 120);

    // Botón Jugar
    fill(0, 150, 0);
    rect(this.botonJugar.x, this.botonJugar.y, this.botonJugar.w, this.botonJugar.h, 10);
    fill(255);
    textSize(20);
    text("Jugar", this.botonJugar.x + 80, this.botonJugar.y + 33);

    // Botón Créditos
    fill(0, 0, 150);
    rect(this.botonCreditos.x, this.botonCreditos.y, this.botonCreditos.w, this.botonCreditos.h, 10);
    fill(255);
    text("Créditos", this.botonCreditos.x + 80, this.botonCreditos.y + 33);
  }

  mostrarJuego() {
    background(0);
    let anchoImg = this.fondo.width;
    let x = -(this.desplazamientoFondo % anchoImg);
    image(this.fondo, x, 0, anchoImg, height);
    image(this.fondo, x + anchoImg, 0, anchoImg, height);

    this.jugador.dibujar();

    for (let d of this.disparos) if (!d.eliminado) d.dibujar();
    for (let e of this.enemigos) if (!e.eliminado) e.dibujar();
    for (let v of this.vidasJugador) v.dibujar();

    fill(255);
    textSize(20);
    text("Puntos: " + this.puntos, 30, 70);
  }

  mostrarCreditos() {
    image(this.fondoCreditos, 0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Créditos", width / 2, height / 2 - 60);
    textSize(20);
    text("Hecho por Luz Moral y Matilda Guida", width / 2, height / 2 - 10);
    text("Basado en Rick and Morty", width / 2, height / 2 + 20);
    textSize(16);
    text("Click para volver al inicio", width / 2, height - 40);
  }

  manejarClick(mx, my) {
    if (this.estado === "inicio") {
      // botón Jugar
      if (
        mx > this.botonJugar.x &&
        mx < this.botonJugar.x + this.botonJugar.w &&
        my > this.botonJugar.y &&
        my < this.botonJugar.y + this.botonJugar.h
      ) {
        this.iniciar();
        this.estado = "jugando";
      }

      // botón Créditos
      if (
        mx > this.botonCreditos.x &&
        mx < this.botonCreditos.x + this.botonCreditos.w &&
        my > this.botonCreditos.y &&
        my < this.botonCreditos.y + this.botonCreditos.h
      ) {
        this.estado = "creditos";
      }
    } else if (this.estado === "creditos") {
      this.estado = "inicio";
    }
  }

  quitarVida() {
    for (let i = this.vidasJugador.length - 1; i >= 0; i--) {
      if (this.vidasJugador[i].activa) {
        this.vidasJugador[i].activa = false;
        break;
      }
    }
  }
}
