
let jugador;
let disparos = [];
let enemigos = [];
let imagenesMorty = [];
let fondo;

let puntos = 0;
let vidas = 3;

let desplazamientoFondo = 0;
let velocidadFondo = 2;
let fondoMaximo = 1200; 

function preload() {
  for (let i = 0; i < 8; i++) {
    imagenesMorty.push(loadImage("assets/morty/m" + (i + 1) + ".png"));
  }
  fondo = loadImage("assets/fondoJuego.jpg");
}


function setup() {
  createCanvas(640, 480);
  jugador = new Jugador();
}


function draw() {
  background(0);

  // --- Fondo desplazable ---
  let anchoImg = fondo.width;
  let x = -(desplazamientoFondo % anchoImg);
  image(fondo, x, 0, anchoImg, height);
  image(fondo, x + anchoImg, 0, anchoImg, height);

  // --- Movimiento del jugador y fondo ---
  if (keyIsDown(LEFT_ARROW)) {
    if (jugador.x > 50) {
      jugador.mover(-1);
    } else if (desplazamientoFondo > 0) {
      desplazamientoFondo -= velocidadFondo;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (jugador.x < width / 2) {
      jugador.mover(1);
    } else if (desplazamientoFondo < fondoMaximo) {
      desplazamientoFondo += velocidadFondo;
    }
  }

  jugador.actualizar();
  jugador.dibujar();

  // --- Disparos ---
  for (let i = disparos.length - 1; i >= 0; i--) {
    disparos[i].dibujar();
    disparos[i].actualizar();

    // Colisión disparo-enemigo
    for (let j = enemigos.length - 1; j >= 0; j--) {
      if (dist(disparos[i].x, disparos[i].y, enemigos[j].x, enemigos[j].y) < 30) {
        enemigos.splice(j, 1);
        disparos.splice(i, 1);
        puntos++;
        break;
      }
    }
  }

  // --- Enemigos (solo aparecen después de llegar al límite) ---
  if (desplazamientoFondo >= fondoMaximo) {
    if (enemigos.length < 5 && random(1) < 0.02) {
      enemigos.push(new Enemigo(width + 50, random(100, height - 100)));
    }

    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].dibujar();
      enemigos[i].actualizar();

      // Colisión enemigo-jugador
      if (dist(jugador.x, jugador.y, enemigos[i].x, enemigos[i].y) < 40) {
        vidas--;
        enemigos[i].reiniciar();
      }
    }
  }


  fill(255);
  textSize(20);
  text("Vidas: " + vidas, 20, 30);
  text("Puntos: " + puntos, 20, 60);

  // Fin del juego
  if (vidas <= 0) {
    textSize(40);
    textAlign(CENTER);
    text("¡PERDISTE!", width / 2, height / 2);
    noLoop();
  } else if (puntos >= 10) {
    textSize(40);
    textAlign(CENTER);
    text("¡GANASTE!", width / 2, height / 2);
    noLoop();
  }
}
 
 function keyPressed() {
  if (key === ' ') {
    jugador.disparar();
  }
}
