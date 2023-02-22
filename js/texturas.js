function texturas_init(escala) {
  pg_tamanho = 1200 * escala;
  texturas_pacote = createGraphics(pg_tamanho, pg_tamanho);
  texturas = [];
  for (let i = 0; i < 4; i++) {
    texturas[i] = createGraphics(pg_tamanho/2, pg_tamanho/2);
    texturas[i].noStroke();
  }
}

function texturas_update() {

  let tempo = contador * ((pg_tamanho/2)/frame_loop);

  // Frente
  let a = texturas[0];
  textura_bolas(a, texturas_qtd[0], paleta[0], paleta[1], tempo);

  // Costa
  let b = texturas[1];
  textura_triangulo(b, texturas_qtd[1], paleta[1], paleta[2], tempo);

  // Meio externo
  let c = texturas[2];
  textura_circulo(c, texturas_qtd[2], paleta[2], paleta[3], tempo);

  // Meio interno
  let d = texturas[3];
  textura_listra_h(d, texturas_qtd[3], paleta[3], paleta[4], tempo);

  texturas_pacote.image(texturas[texturas_ordem[0]], 0, 0);
  texturas_pacote.image(texturas[texturas_ordem[1]], pg_tamanho/2, 0);
  texturas_pacote.image(texturas[texturas_ordem[2]], 0, pg_tamanho/2);
  texturas_pacote.image(texturas[texturas_ordem[3]], pg_tamanho/2, pg_tamanho/2);
  
}

function texturas_reset() {
  texturas_ordem = shuffle(texturas_ordem);
  // texturas_qtd = [3, 6, 5, 20];
  texturas_qtd[0] = floor(random(1, 6));
  texturas_qtd[1] = floor(random(1, 12));
  texturas_qtd[2] = floor(random(1, 8));
  texturas_qtd[3] = floor(random(5, 30));
  paleta = shuffle(paleta);
}

function textura_listra_h(c, qtd, cor_A, cor_B, t) {
  let listra_qtd = qtd;
  let listra_passo = c.height/listra_qtd;
  let listra_altura = listra_passo/2;
  let listra_y_offset = t % listra_passo;
  c.background(cor_A);
  for(let i = 0; i < listra_qtd; i++) {
    let y = i * listra_passo + listra_y_offset;
    c.fill(cor_B);
    c.rect(0, y, c.width, listra_altura);
  }
}

function textura_listra_v(c, qtd, cor_A, cor_B, t) {
  let listra_qtd = qtd;
  let listra_passo = c.height/listra_qtd;
  let listra_largura = listra_passo/2;
  let listra_x_offset = t % listra_passo;
  c.background(cor_A);
  for(let i = 0; i < listra_qtd; i++) {
    let x = i * listra_passo + listra_x_offset;
    c.fill(cor_B);
    c.rect(x, 0, listra_largura, c.height);
  }
}

function textura_circulo(c, qtd, cor_A, cor_B, t) {
  c.background(cor_A);
  let circulo_qtd = qtd;
  let circulo_passo = c.width/circulo_qtd;
  let circulo_espessura = circulo_passo/3;
  let circulo_offset = t % circulo_passo; 
  for (let i = 0; i < circulo_qtd * 1.5; i++) {
    let diametro = i * circulo_passo + circulo_offset;
    c.noFill();
    c.stroke(cor_B);
    c.strokeWeight(circulo_espessura);
    c.circle(c.width/2, c.height/2, diametro);
  }
}

function textura_triangulo(c, qtd, cor_A, cor_B, t) {
  let triangulo_qtd = qtd;
  let triangulo_passo = c.height/triangulo_qtd;
  let triangulo_altura = triangulo_passo;
  let triangulo_y_offset = t % triangulo_passo;
  c.background(cor_A);
  for(let i = -1; i < triangulo_qtd; i++) {
    let y = i * triangulo_passo + triangulo_y_offset;
    c.fill(cor_B);
    c.beginShape();
    c.vertex(0, y);
    c.vertex(c.width, y);
    c.vertex(c.width, y + triangulo_altura);
    c.endShape();
  }
}

function textura_bolas(c, qtd, cor_A, cor_B, t) {
  
  let bolas_qtd = 1;
  let bolas_passo = c.height/bolas_qtd;
  let bolas_diametro = bolas_passo;
  let bolas_x_offset = t % bolas_passo;
  c.background(cor_A);
  c.ellipseMode(CORNER);
  for(let j = 0; j < bolas_qtd; j++) {
    for(let i = -1; i < bolas_qtd; i++) {
      let y = j * bolas_passo;
      let x = i * bolas_passo + bolas_x_offset;
      c.fill(cor_B);
      c.circle(x, y, bolas_diametro);
    }
    
  }
}