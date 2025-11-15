class Juego {
  constructor(imagenesMorty, fondo, imgAlien, imgCorazonLleno, imgCorazonVacio, portada, fondoCreditos) {
    //propiedades de la clase
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

    this.estado = "inicio"; //  "inicio", "jugando", "creditos","ganaste","perdiste"
    
    // botones
    this.botonJugar = { x: 240, y: 300, w: 160, h: 50 };
    this.botonCreditos = { x: 240, y: 370, w: 160, h: 50 };
    this.tiempoTutorial = 0;
    
    //advertencia
    this.mostrarAdvertencia = false;
    this.tiempoAdvertencia = 0;   // 
    this.duracionAdvertencia =2000 ;
    this.advertenciaMostrada = false;

    this.brillo = 0;
    this.brilloV = 0.1;
  }

  iniciar() {
    this.jugador = new Jugador(this.imagenesMorty, this);
    this.disparos = [];
    this.enemigos = [];
    this.vidasJugador = [];
    this.puntos = 0;
    this.desplazamientoFondo = 0;
    this.tiempoTutorial = millis();
    this.tiempoAdvertencia = millis(); 
    for (let i = 0; i < 3; i++) {
      this.vidasJugador.push(new Vida(20 + i * 50, 20));
    }
  }

  actualizar() {
    if (this.estado !== "jugando") return;
//mover
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
    for (let i = 0; i < this.disparos.length; i++) {
      let d = this.disparos[i];
      if (!d.eliminado) {
        d.actualizar();

        for (let j = 0; j < this.enemigos.length; j++) {
          let e = this.enemigos[j];
          if (!e.eliminado && dist(d.x, d.y, e.x, e.y) < 30) {
            e.eliminado = true;
            d.eliminado = true;
            this.puntos++;
          }
        }
      }
    }

    this.disparos = this.disparos.filter(d => !d.eliminado);

    // crear enemigos (activar aparición y advertencia cuando se llega al final)
    if (this.desplazamientoFondo >= this.fondoMaximo) {
      if (this.desplazamientoFondo >= this.fondoMaximo && !this.advertenciaMostrada) {
          this.mostrarAdvertencia = true;
          this.tiempoAdvertencia = millis();
          this.advertenciaMostrada = true;
}
      if (random(1) < 0.03) {
        this.enemigos.push(new Enemigo(width + random(50, 200), random(100, height - 100)));
      }
    }

    // actualizar enemigos
    for (let i = 0; i < this.enemigos.length; i++) {
      let enemigo = this.enemigos[i];

      if (!enemigo.eliminado) {
        enemigo.actualizar();

        // colisión con jugador
        if (dist(this.jugador.x, this.jugador.y, enemigo.x, enemigo.y) < 40) {
          this.quitarVida();
          enemigo.reiniciar();
        }
      }
    }

    // comprueba vidas, para mostrar corazones
    let vidasRestantes = 0;
    for (let i = 0; i < this.vidasJugador.length; i++) {
      if (this.vidasJugador[i].activa) {
        vidasRestantes++;
      }
    }

    if (vidasRestantes === 0) {
      this.estado = "perdiste";
    }

    if (this.puntos >= 11) {
      this.estado = "ganaste";
    }
  } 

  dibujar() {
    if (this.estado === "inicio") this.mostrarInicio();
    else if (this.estado === "jugando") this.mostrarJuego();
    else if (this.estado === "ganaste") this.mostrarGanaste();
    else if (this.estado === "perdiste") this.mostrarPerdiste();
    else if (this.estado === "creditos") this.mostrarCreditos();
  }
//estados
  mostrarGanaste() {
    fill(255);
    textAlign(CENTER);
    textSize(60);

    text("¡GANASTE!", width / 2, height / 2 - 40);
    textSize(24);
    text("Mataste a todos los enemigos", width / 2, height / 2 + 10);
    text("Creditos", width / 2, height / 2 + 60);
  }

  mostrarPerdiste() {
    fill(255);
    textAlign(CENTER);
    textSize(60);

    text("PERDISTE", width / 2, height / 2 - 40);
    textSize(24);
    text("Te quedaste sin vidas", width / 2, height / 2 + 10);
    text("Creditos", width / 2, height / 2 + 60);
  }

  mostrarInicio() {
    push();
    image(this.portada, 0, 0, width, height);
    textAlign(CENTER);
    stroke(0, 200, 0);
    strokeWeight(7);
    fill(58, 124, 148);
    textSize(36);
    textFont(fuente, 90);
    text("Morty Escape", width / 2, 240);
    pop();

    push(); // Botón Jugar
    fill(0, 200, 0);
    rect(this.botonJugar.x, this.botonJugar.y, this.botonJugar.w, this.botonJugar.h, 10);
    fill(255);
    textSize(20);
    text("Jugar", this.botonJugar.x + 60, this.botonJugar.y + 33);
    pop();

    push();
    // Botón Créditos
    fill(58, 124, 148);
    rect(this.botonCreditos.x, this.botonCreditos.y, this.botonCreditos.w, this.botonCreditos.h, 10);
    fill(255);
    textSize(20);
    text("Créditos", this.botonCreditos.x + 45, this.botonCreditos.y + 33);
    pop();
  }

  mostrarJuego() {
    background(0);

    let anchoImg = this.fondo.width;
    let x = -(this.desplazamientoFondo % anchoImg);
    image(this.fondo, x, 0, anchoImg, height);
    image(this.fondo, x + anchoImg, 0, anchoImg, height);

    
    if (this.mostrarAdvertencia) {
      let tiempoPasado = millis() - this.tiempoAdvertencia;

      // parpadeo con brillo
      this.brillo = map(sin(frameCount * this.brilloV), -1, 1, 50, 255);
      this.advertenciaPantalla(this.brillo);

      // apagar después de 2 segundos
      if (tiempoPasado > this.duracionAdvertencia) {
        this.mostrarAdvertencia = false;
      }
    }
    

    
    if (millis() - this.tiempoTutorial < 5000) {
      this.tutorial();
    }

    
    //personaje,disparos,los enemigos y las vidas
    this.jugador.dibujar();

  for (let i = 0; i < this.disparos.length; i++) { 
  let d = this.disparos[i]; if (!d.eliminado) { d.dibujar(); 
  } 
} 
   for (let i = 0; i < this.enemigos.length; i++) { 
let e = this.enemigos[i]; 
   
   if (!e.eliminado) { e.dibujar(); 
  } 
} 

 for (let i = 0; i < this.vidasJugador.length; i++) { 

let v = this.vidasJugador[i]; v.dibujar(); }
    fill(255);
    textSize(20);
    text("Puntos: " + this.puntos, 60, 70);
  }

  mostrarCreditos() {
    image(this.fondoCreditos, 0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Créditos", width / 2, height / 2 - 120);
    textSize(20);
    text("Hecho por Luz Moral y Matilda Guida", width / 2, height / 2 - 70);
    text("Basado en Rick and Morty", width / 2, height / 2 - 45);

    text("Click para volver al inicio", width / 2, height - 40);
  }

  tutorial() {
    push();
    rectMode(CENTER);
    stroke(58, 124, 180);
    fill(58, 124, 148, 160);
    rect(width / 2, height - 260, 500, 170, 10);
    pop();
    textAlign(CENTER);
    textSize(30);
    text("¿Como se juega?", width / 2, height / 2 - 50);
    textSize(20);
    text("Con la barra espaciadora disparas a los enemigos,\n con la flecha izquierda te moves para atras\ny con la derecha te moves para adelante", width / 2, height / 2 - 20);
    textSize(16);
  }

  advertenciaPantalla(brillo) {
    textAlign(CENTER);
    fill(255, brillo);
    textSize(30);
    text("¡CUIDADO!", width / 2, height / 2 - 50);

    textSize(20);
    text("LOS ENEMIGOS ESTÁN LLEGANDO", width / 2, height / 2 - 20);
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
    } else if (this.estado === "ganaste" || this.estado === "perdiste") {
      this.estado = "creditos";
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
