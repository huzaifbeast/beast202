let trail = [];
let colors = [];

function setup() {
  createCanvas(800, 600);
  background(10, 10, 20);
}

function draw() {
  background(10, 10, 20, 60);
  
  if (mouseX > 0 && mouseY > 0) {
    trail.push({x: mouseX, y: mouseY});
    colors.push({r: random(100, 255), g: random(150, 255), b: random(200, 255)});
  }
  
  if (trail.length > 40) {
    trail.shift();
    colors.shift();
  }
  
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 30, 200);
    let size = map(i, 0, trail.length, 8, 35);
    
    fill(colors[i].r, colors[i].g, colors[i].b, alpha);
    noStroke();
    circle(trail[i].x, trail[i].y, size);
    
    if (i > 0) {
      stroke(255, 255, 255, alpha * 0.4);
      strokeWeight(1.5);
      line(trail[i-1].x, trail[i-1].y, trail[i].x, trail[i].y);
    }
  }
}

function mousePressed() {
  background(10, 10, 20);
  trail = [];
  colors = [];
  
}
function keyPressed() {
  if (key === 's' || key === 'S') {
    save(' mouse trails .png');
  }
}