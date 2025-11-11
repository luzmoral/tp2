///alumanas luz moral y matilda guida
let jugador;
let disparos = [];
let enemigos = [];
let imagenFondo;

let spritesMorty =[
"assets/morty/m1.png",
"assets/morty/m2.png",
"assets/morty/m3.png",
"assets/morty/m4.png",
"assets/morty/m5.png",
"assets/morty/m6.png",
"assets/morty/m7.png",
"assets/morty/m8.png"
];

let imagenesMorty = []; 
let frameActual = 0; 
let desplazamientoFondo = 0;  
let velocidadFondo = 2;  

let juegoActivo = true;
let inicioEnemigos = false;
let mostrarMensaje = false;

let limiteAvance = 500; // hasta dónde puede avanzar el jugador
let tiempoMensaje = 0; 

function preload() {
  imagenFondo = loadImage("assets/fondoJuego.jpeg");
   
   for (let i = 0; i < spritesMorty.length; i++) {
    imagenesMorty.push(loadImage(spritesMorty[i]));
  }

}

function setup() {
  createCanvas(640, 480);
  jugador = new Jugador();
}

function draw() {
  background(0);
  mostrarFondo();

if (keyIsDown(LEFT_ARROW)) {
  jugador.mover(-1);
}

if (keyIsDown(RIGHT_ARROW)) {
  if (juegoActivo) {
    if (jugador.x < width / 2) {
      jugador.mover(1); // 🔹 se mueve y anima
    } else {
      // 🔹 se queda quieto pero sigue animando mientras el fondo se mueve
      desplazamientoFondo += velocidadFondo;
      jugador.mover(0, true); // <- "true" fuerza la animación sin moverse

      if (desplazamientoFondo >= limiteAvance) {
        juegoActivo = false;
        mostrarMensaje = true;
        tiempoMensaje = millis();
      }
    }
  } else {
    jugador.mover(1);
  }
}
  // --- Mostrar mensaje antes de la batalla ---
  if (mostrarMensaje) {
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("¡Prepárate para la batalla!", width / 2, height / 2);
  }

  // --- Pasados 3 segundos, aparecen los enemigos ---
  if (mostrarMensaje && millis() - tiempoMensaje > 3000) {
    mostrarMensaje = false;
    inicioEnemigos = true;
  }

  
  // --- Generar enemigos desde los costados ---
  if (inicioEnemigos && random(1) < 0.02) {
    enemigos.push(new Enemigo());
  }
  
  // --- Mostrar jugador ---
  jugador.mostrar();

  // --- Actualizar disparos ---
  for (let d of disparos) {
    d.actualizar();
    d.mostrar();
  }

  // --- Actualizar enemigos ---
  for (let e of enemigos) {
    e.actualizar();
    e.mostrar();
  }

  // --- Detectar colisiones ---
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

// --- Fondo desplazable ---
function mostrarFondo() {
  let anchoImg = imagenFondo.width;
  let x = -(desplazamientoFondo % anchoImg);

  image(imagenFondo, x, 0, anchoImg, height);
  image(imagenFondo, x + anchoImg, 0, anchoImg, height);
}

// --- Disparo ---
function keyPressed() {
  if (key === ' ') {
    jugador.disparar();
  }
}
