let time = 0;

function setup() {
  createCanvas(1000, 1000);
  textFont('Georgia');
  textStyle(BOLD);
}

function draw() {
  for (let y = 0; y < height; y++) {
    let color1 = map(y, 0, height, 0, 255);
    stroke(color1, 100, 200);
    line(0, y, width, y);
  }
  
  textSize(80);
  textAlign(CENTER);
  
  let bounce1 = sin(time) * 10;
  let bounce2 = cos(time) * 10;
  
  drawCustomLetter("BEAST", width/2.5, 150 + bounce1, color(255, 0, 100));
  drawCustomLetter("EAGLE", width/2.5, 250 + bounce2, color(0, 255, 150));
  
  fill(255, 255, 0, 100);
  noStroke();
  circle(150 + sin(time * 2) * 20, 100, 50);
  circle(650 + cos(time * 2) * 20, 100, 50);
  circle(150 + cos(time * 1.5) * 15, 300, 50);
  circle(650 + sin(time * 1.5) * 15, 300, 50);
  
  circle(100 + sin(time * 1.8) * 25, 450, 40);
  circle(800 + cos(time * 1.3) * 30, 400, 60);
  circle(250 + sin(time * 2.2) * 15, 600, 35);
  circle(750 + cos(time * 1.7) * 20, 650, 55);
  
  circle(50 + sin(time * 1.1) * 10, 750, 45);
  circle(900 + cos(time * 2.5) * 35, 800, 50);
  circle(350 + sin(time * 1.9) * 20, 850, 40);
  circle(550 + cos(time * 1.4) * 25, 900, 65);
  
  circle(80 + sin(time * 2.3) * 18, 500, 38);
  circle(920 + cos(time * 1.6) * 22, 550, 42);
  circle(450 + sin(time) * 30, 50, 55);
  circle(200 + cos(time * 2.1) * 28, 950, 48);
  
  circle(850 + sin(time * 1.8) * 15, 250, 35);
  circle(50 + cos(time * 2.8) * 20, 200, 60);
  circle(600 + sin(time * 1.2) * 25, 700, 40);
  circle(300 + cos(time * 2.4) * 12, 380, 50);
  
  time += 0.03;
}

function drawCustomLetter(word, x, y, outlineColor) {
  fill(0, 0, 0, 0);
  stroke(outlineColor);
  strokeWeight(6);
  text(word, x, y);
  
  stroke(255, 255, 255, 150);
  strokeWeight(2);
  text(word, x-1, y-1);
}