let pg_topo;
let pg_base;
let pg_fundo;
let pg_composicao;
let pg_tamanho;
let escala;
let napinha_modelo;
let napinha_modelo_tampa;
let texturas_pacote;
let texturas;
let easycam;

let debug;
let play;
let paleta= ["#ffff00","#00ffff","#ff00f1","#ee0000","#0000ff"];

function preload() {
  napinha_modelo = loadModel("../recursos/Napinha-Modelo-UV-Caos.obj");
  napinha_modelo_tampa = loadModel("../recursos/Napinha-Modelo-Tampa.obj");
}

function setup() {
  escala = 0.2;
  debug = true;
  pg_tamanho = 1200 * escala;
  
  createCanvas(1536 * escala, 1920 * escala);
  background(255);
  imageMode(CENTER);
    
  pg_base = createGraphics(pg_tamanho, pg_tamanho, WEBGL);
  pg_base.setAttributes({ alpha: true });
  pg_base.noStroke();

  pg_topo = createGraphics(pg_tamanho, pg_tamanho, WEBGL);
  pg_topo.setAttributes({ alpha: true });
  pg_topo.noStroke();
  
  pg_fundo = createGraphics(width, height);
  pg_fundo.imageMode(CENTER);
  pg_fundo.background(0);

  pg_composicao = createGraphics(width, height);
  pg_composicao.imageMode(CENTER);
  pg_composicao.background(0);

  paleta = shuffle(paleta);
  texturas_init();
  
  easycam = pg_base.createEasyCam();
  easycam = pg_topo.createEasyCam();
}

function draw() {

  pg_composicao.blendMode(BLEND);
  texturas_update();

  napinha(pg_base, true);
  napinha(pg_topo, false);

  pg_fundo.drawingContext.filter = 'grayscale('+str(100)+'%)';
  // pg_fundo.drawingContext.filter = 'hue-rotate('+str(map(mouseX, 0, width, 0, 100))+'deg)';
  pg_fundo.push();
  pg_fundo.scale(-1, 1);
  let tamanho = width * 3;
  pg_fundo.image(pg_base, -width/2, width/2, tamanho, tamanho);
  pg_fundo.pop();
  
  pg_composicao.image(pg_fundo, width/2, height/2);
  pg_composicao.image(pg_base, width/2, height/2);
  pg_composicao.blendMode(MULTIPLY);
  pg_composicao.image(pg_topo, width/2, height/2);

  pg_composicao.drawingContext.filter = 'blur('+str(4 * escala)+'px)';
  pg_composicao.filter(POSTERIZE, 2);

  image(pg_composicao, width/2, height/2);

  if(debug) {  
    image(texturas_pacote, 50, 50, 100, 100);
  }
}



function napinha(c, modo_textura) {
  c.clear();
  c.push();
  c.scale(1.2);
  c.rotateY(frameCount * 0.01 * -1);
  c.rotateX(sin(frameCount * 0.02) * 0.4 );
  // c.rotateZ(frameCount * 0.01);
  if (modo_textura) {
    c.texture(texturas_pacote);
    c.model(napinha_modelo);
  } else {
    c.fill(255, 0, 0);
    c.model(napinha_modelo_tampa);
  }
  c.pop();
}