class Juego {
  constructor(imagenesMorty, fondo, imgCorazonLleno, imgCorazonVacio) {
    this.imagenesMorty = imagenesMorty;
    this.fondo = fondo;
    this.imgCorazonLleno = imgCorazonLleno;
    this.imgCorazonVacio = imgCorazonVacio;

    this.jugador = null;
    this.disparos = [];
    this.enemigos = [];
    this.vidasJugador = [];
    this.puntos = 0;

    this.desplazamientoFondo = 0;
    this.velocidadFondo = 2;
    this.fondoMaximo = 1200;

    this.estado = "jugando"; // "jugando", "ganaste", "perdiste"

    this.aviso = false;
    this.tiempoAviso = 0;
    this.duracionAviso = 10;
  }

  iniciar() {
    this.jugador = new Jugador(this.imagenesMorty);
    this.disparos = [];
    this.enemigos = [];
    this.vidasJugador = [];
    this.puntos = 0;
    this.desplazamientoFondo = 0;
    this.estado = "jugando";

    for (let i = 0; i < 3; i++) {
      this.vidasJugador.push(
        new Vida(20 + i * 50, 20, this.imgCorazonLleno, this.imgCorazonVacio)
      );
    }
  }

  actualizar() {
    if (this.estado !== "jugando") return;

    // --- Movimiento del jugador ---
    if (keyIsDown(LEFT_ARROW)) {
      this.jugador.mover(-1);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      if (this.desplazamientoFondo < this.fondoMaximo) {
        if (this.jugador.x < width / 2) {
          this.jugador.mover(1);
        } else {
          this.desplazamientoFondo += this.velocidadFondo;
          this.jugador.actualizar();
        }
      } else {
        // 🚨 El jugador llegó al límite derecho
        this.jugador.mover(1);
      }
    }

    this.jugador.actualizar();

    for (let i = 0; i < this.disparos.length; i++) {
      let disparo = this.disparos[i];

      if (!disparo.eliminado) {
        disparo.actualizar();

        // Colisiones con enemigos
        for (let j = 0; j < this.enemigos.length; j++) {
          let enemigo = this.enemigos[j];

          if (!enemigo.eliminado) {
            if (dist(disparo.x, disparo.y, enemigo.x, enemigo.y) < 30) {
              enemigo.eliminado = true;
              disparo.eliminado = true;
              this.puntos += 1;
            }
          }
        }
      }

      // Marcar disparos fuera de pantalla
      if (disparo.x > width || disparo.x < 0) {
        disparo.eliminado = true;
      }
    }

    // --- Enemigos ---
    if (this.desplazamientoFondo >= this.fondoMaximo) {
      if (this.enemigos.length < 5 && random(1) < 0.02) {
        this.enemigos.push(
          new Enemigo(width + 50, random(100, height - 100))
        );
      }

      for (let i = 0; i < this.enemigos.length; i++) {
        let e = this.enemigos[i];

        if (!e.eliminado) {
          e.actualizar();

          if (dist(this.jugador.x, this.jugador.y, e.x, e.y) < 40) {
            this.quitarVida();
            e.reiniciar();
          }
        }
      }
    }

    // --- Verificar estado ---
    let vidasActivas = 0;
    for (let i = 0; i < this.vidasJugador.length; i++) {
      if (this.vidasJugador[i].activa) vidasActivas++;
    }

    if (vidasActivas === 0) {
      this.estado = "perdiste";
    } else if (this.puntos >= 10) {
      this.estado = "ganaste";
    }
  }

  dibujar() {
    background(0);

    // Fondo
    let anchoImg = this.fondo.width;
    let x = -(this.desplazamientoFondo % anchoImg);
    image(this.fondo, x, 0, anchoImg, height);
    image(this.fondo, x + anchoImg, 0, anchoImg, height);

    // Entidades
    this.jugador.dibujar();

    for (let i = 0; i < this.disparos.length; i++) {
      if (!this.disparos[i].eliminado) {
        this.disparos[i].dibujar();
      }
    }

    for (let i = 0; i < this.enemigos.length; i++) {
      if (!this.enemigos[i].eliminado) {
        this.enemigos[i].dibujar();
      }
    }

    for (let i = 0; i < this.vidasJugador.length; i++) {
      this.vidasJugador[i].dibujar();
    }

    push();
    fill(255);
    textSize(20);
    text("Puntos: " + this.puntos, 30, 70);
    pop();

    // --- Estado final ---
    if (this.estado !== "jugando") {
      textSize(40);
      textAlign(CENTER);
      text(
        this.estado === "perdiste" ? "¡PERDISTE!" : "¡GANASTE!",
        width / 2,
        height / 2
      );
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
