let juego;
let imagenesMorty = [];
let imgCorazonLleno,imgCorazonVacio;
let fondo;
let imgAlien;
function preload() {
  juego = new Juego(imagenesMorty, fondo, imgAlien, imgCorazonLleno, imgCorazonVacio);

  for (let i = 0; i < 8; i++) {
    imagenesMorty.push(loadImage("assets/morty/m" + (i + 1) + ".png"));
  }

   fondo = loadImage("assets/fondoJuego.jpg");
   imgAlien = loadImage("assets/alien.png");
   imgCorazonLleno = loadImage("assets/corazon_lleno.png");
   imgCorazonVacio = loadImage("assets/corazon_vacio.png");

   juego = new Juego(imagenesMorty, fondo, imgAlien, imgCorazonLleno, imgCorazonVacio);
}

function setup() {
  createCanvas(640, 480);
  juego.iniciar();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function keyPressed() {
  if (key === ' ') {
    juego.jugador.disparar();
  }
}
