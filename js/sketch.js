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
let texturas_ordem;
let texturas_qtd;
let paleta= ["#ffff00","#00ffff","#ff00f1","#ee0000","#0000ff"];

let easycam;

let debug;
let play;
let gravando;
let contador;
let contador_gravacao;
let frame_loop;

let check_debug;
let botao_reset;
let botao_play;
let botao_gravar;
let botao_gravar_frame;
let entrada_frames_qtd;
let entrada_arquivo_prefixo;
let deslizante_desfoque;
let deslizante_frame;

function preload() {
  napinha_modelo = loadModel("../recursos/Napinha-Modelo-UV-Caos.obj");
  napinha_modelo_tampa = loadModel("../recursos/Napinha-Modelo-Tampa.obj");
}

function setup() {

  debug = true;
  play = true;
  gravando = false;
  frame_loop = 100;
  
  check_debug = createCheckbox("Modo debug", debug);
  check_debug.changed(debug_alterna);
  check_debug.parent("interface-container");

  botao_reset = createButton("Regenerar texturas");
  botao_reset.mousePressed(texturas_reset);
  botao_reset.parent("interface-container");

  deslizante_desfoque = createSlider(2, 16, 4);
  deslizante_desfoque.parent("interface-container");

  botao_play = createButton("Pause");
  botao_play.mousePressed(play_alterna);
  botao_play.parent("interface-container");
  
  deslizante_frame = createSlider(0, frame_loop, 0);
  deslizante_frame.parent("interface-container");
  
  entrada_arquivo_prefixo = createInput("Napinha-A");
  entrada_arquivo_prefixo.parent("interface-container");

  entrada_frames_qtd = createInput(frame_loop, "number");
  entrada_frames_qtd.parent("interface-container");

  botao_gravar = createButton("Gravar");
  botao_gravar.mousePressed(gravar);
  botao_gravar.parent("interface-container");

  texturas_ordem = [0, 1, 2, 3];
  texturas_qtd = [3, 6, 5, 20];

  texturas_reset();
  inicializar(0.3, 0, true);
  
}

function draw() {

  frame_loop = entrada_frames_qtd.value();

  pg_composicao.blendMode(BLEND);
  texturas_update();

  napinha(pg_base, true);
  napinha(pg_topo, false);

  fundo(pg_fundo);

  pg_composicao.drawingContext.filter = `blur(${deslizante_desfoque.value() * escala}px)`;
  pg_composicao.image(pg_fundo, width/2, height/2);
  pg_composicao.image(pg_base, width/2, height/2);
  pg_composicao.blendMode(MULTIPLY);
  pg_composicao.image(pg_topo, width/2, height/2);

  
  pg_composicao.filter(POSTERIZE, 2);

  image(pg_composicao, width/2, height/2);

  if(gravando && contador <= entrada_frames_qtd.value()) {
    arquivo_nome = `${entrada_arquivo_prefixo.value()}-${String(contador).padStart(4, '0')}`;
    saveCanvas(pg_composicao, arquivo_nome, 'png');
    contador_gravacao++;
  }
  
  if(play) {
    contador++;
  } else {
    contador = deslizante_frame.value();
  }

  if(contador_gravacao == entrada_frames_qtd.value() && gravando) {
    gravando = false;
    inicializar(0.3);
    frameRate(30);
  }

  if(debug) {  
    image(texturas_pacote, 50, 50, 100, 100);
    fill(0);
    textSize(70);
    textAlign(RIGHT);
    text(`fps: ${round(frameRate())}`, width, 60);
    text(`desfoque: ${deslizante_desfoque.value()}`, width, 120);
    if( gravando ) {
      text(`gravando: ${contador}`, width, 180);
    }
  }

}

function inicializar(_escala) {
  escala = _escala;
  contador = 0;

  texturas_init(escala);
  
  let canvas = createCanvas(1536 * escala, 1920 * escala);
  canvas.parent("tela-container");
  frameRate(30);
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
  pg_composicao.drawingContext.filter = `blur(${deslizante_desfoque.value() * escala}px)`;
  
  easycam = pg_base.createEasyCam();
  easycam = pg_topo.createEasyCam();
}

function debug_alterna() {
  if (check_debug.checked()) {
    debug = true;
  } else {
    debug = false;
  }
}

function play_alterna() {
  if ( play ) {
    play = false;
    botao_play.html("Play");
    deslizante_frame.value(contador%frame_loop);
    deslizante_frame.elt.max = frame_loop;
  } else {
    play = true;
    botao_play.html("Pause");
  }
}

function gravar() {
  inicializar(1);
  frameRate(10);
  contador_gravacao = 0;
  play = true;
  gravando = true;
}

function napinha(c, modo_textura) {
  c.clear();
  c.push();
  c.scale(1.2);
  c.rotateY(contador%frame_loop * TWO_PI/frame_loop * -1);
  c.rotateX(sin(contador%frame_loop / frame_loop/10) * 0.4 );
  if (modo_textura) {
    c.texture(texturas_pacote);
    c.model(napinha_modelo);
  } else {
    c.fill(255, 0, 0);
    c.model(napinha_modelo_tampa);
  }
  c.pop();
}

function fundo(c) {
  c.push();
  c.blendMode(BLEND);
  c.translate(c.width/2, c.height/2);
  c.image(texturas_pacote, 0, 0, width, height);
  c.rotate(HALF_PI);
  c.blendMode(DIFFERENCE);
  c.image(texturas_pacote, 0, 0, width, width);
  c.pop();
}