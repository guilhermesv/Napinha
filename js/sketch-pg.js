let pg;
let pg_tamanho;
let escala;
let texturas_pacote;
let texturas;
let debug;

function preload() {
  napinha = loadModel("../recursos/Napinha-Modelo.obj");
}

function setup() {
  escala = 0.5;
  debug = true;
  pg_tamanho = 600;
  
  createCanvas(1536 * escala, 1920 * escala);
  background(255, 0, 0);
  imageMode(CENTER);
    
  pg = createGraphics(pg_tamanho, pg_tamanho, WEBGL);
  pg.setAttributes({ alpha: true });
  pg.noStroke();

  texturas_pacote = createGraphics(pg_tamanho, pg_tamanho);

  texturas = [];
  texturas[0] = createGraphics(pg_tamanho/2, pg_tamanho/2);
  texturas[1] = createGraphics(pg_tamanho/2, pg_tamanho/2);
  texturas[2] = createGraphics(pg_tamanho/2, pg_tamanho/2);
  texturas[3] = createGraphics(pg_tamanho/2, pg_tamanho/2);
  
  texturas[0].background(0, 0, 0);
  
  texturas[1].background(255, 0, 0);

  

  for(let i = 0; i < 10; i++)  {
    texturas[2].noFill();
    texturas[2].stroke(0);
    texturas[2].strokeWeight(10);
    texturas[2].circle(texturas[0].width/2, texturas[0].height/2, i * 50);
  };

  texturas[3].background(127, 0, 255);
  for(let i = 0; i < 10; i++)  {
    texturas[3].noFill();
    texturas[3].stroke(255);
    texturas[3].strokeWeight(10);
    texturas[3].circle(texturas[0].width/2, texturas[0].height/2, i * 50);
  };

  texturas_pacote.image(texturas[0], 0, 0);
  texturas_pacote.image(texturas[1], pg_tamanho/2, 0);
  texturas_pacote.image(texturas[2], 0, pg_tamanho/2);
  texturas_pacote.image(texturas[3], pg_tamanho/2, pg_tamanho/2);
}

function draw() {

  texturas[2].background(0, 255, 0);
  for(let i = 0; i < 10; i++)  {
    texturas[2].noFill();
    texturas[2].stroke(0);
    texturas[2].strokeWeight(10);
    texturas[2].circle(frameCount%100, texturas[0].height/2, i * 50);
  };

  texturas_pacote.image(texturas[0], 0, 0);
  texturas_pacote.image(texturas[1], pg_tamanho/2, 0);
  texturas_pacote.image(texturas[2], 0, pg_tamanho/2);
  texturas_pacote.image(texturas[3], pg_tamanho/2, pg_tamanho/2);
  
  pg.clear();
  pg.push();
  pg.scale(1.1);
  // pg.rotateX(frameCount * 0.01);
  pg.rotateY(frameCount * 0.01 * -1);
  // pg.rotateZ(frameCount * 0.01);
  pg.texture(texturas_pacote);
  pg.model(napinha);
  pg.pop();

  image(pg, width/2, height/2, 2000, 2000);
  filter(THRESHOLD, 0.3);

  if(debug) {
    image(pg, width/2, height/2);
    image(texturas_pacote, 50, 50, 100, 100);
  }

}