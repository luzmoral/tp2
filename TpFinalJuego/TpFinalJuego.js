let jugador;
let disparos = [];
let enemigos = [];
let imagenFondo, imagenJugador, imagenEnemigo;
let sonidoDisparo, sonidoFondo;

let desplazamientoFondo = 0;  
let velocidadFondo = 2;  

let juegoActivo = true;
let inicioEnemigos = false;
let mostrarMensaje = false;

let limiteAvance = 1500; // 🔹 hasta dónde puede avanzar el jugador
let tiempoMensaje = 0; 

function preload() {
  imagenFondo = loadImage("assets/fondoJuego.jpeg");
  // imagenJugador = loadImage("assets/cientifico.png");
  // imagenEnemigo = loadImage("assets/robot.png");
  // sonidoDisparo = loadSound("assets/laser.wav");
  sonidoFondo = loadSound("assets/musica.mp3");
}

function setup() {
  createCanvas(640, 480);
  jugador = new Jugador();
  // sonidoFondo.loop(); // Reproduce la música en bucle si querés
}

function draw() {
  mostrarFondo()

 if (keyIsDown(LEFT_ARROW)) {
    jugador.mover(-1);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    // Solo mover fondo si no llegó al límite
    if (desplazamientoFondo < limiteAvance && juegoActivo) {
      jugador.mover(1);
      desplazamientoFondo += velocidadFondo;
    } 
    // Si llegó al límite, mostrar mensaje y preparar batalla
    else if (!inicioEnemigos) {
      juegoActivo = false; 
      mostrarMensaje = true;
      if (tiempoMensaje === 0) tiempoMensaje = millis(); // guarda el momento
    }
  
  if (mostrarMensaje){
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("¡Prepárate para la batalla!", width / 2, height / 2);
  }
    // Pasados 3 segundos, aparecen los enemigos
    if (millis() - tiempoMensaje > 3000) {
      inicioEnemigos = true;
      mostrarMensaje = false;
    }
  }
// 🔹 Generar enemigos una vez activada la batalla
  if (inicioEnemigos && random(1) < 0.02) {
    enemigos.push(new Enemigo());
  }
  // Mostrar jugador
  jugador.mostrar();

  // Actualizar disparos
  for (let d of disparos) {
    d.actualizar();
    d.mostrar();
  }

  // Actualizar enemigos
  for (let e of enemigos) {
    e.actualizar();
    e.mostrar();
  }

  // Detectar colisiones entre disparos y enemigos
  for (let i = enemigos.length - 1; i >= 0; i--) {
    for (let j = disparos.length - 1; j >= 0; j--) {
      let distancia = dist(enemigos[i].x, enemigos[i].y, disparos[j].x, disparos[j].y);
      if (distancia < 30) {
        enemigos.splice(i, 1);
        disparos.splice(j, 1);
        break;
      }
    }
  }
}

function mostrarFondo() {
   let anchoImg = imagenFondo.width;
  let x = -(desplazamientoFondo % anchoImg);

  image(imagenFondo, x, 0, anchoImg, height);
  image(imagenFondo, x + anchoImg, 0, anchoImg, height);

  

}

// Disparar al presionar espacio
function keyPressed() {
  if (key === ' ') {
    jugador.disparar();
  }
}
