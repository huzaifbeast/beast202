var rows = 15;
var cols = 15;
var distanceX = 40;
var distanceY = 40;
var palette = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"];

function setup() {
  createCanvas(600, 600);
  mousePressed();
}

function mousePressed() {
  background(20, 25, 35);
  rectMode(CENTER);
  noStroke();
  
  for (var r = 1; r < rows; r++) {
    for (var c = 1; c < cols; c++) {
      
      var randomColor = random(palette);
      fill(randomColor);
      
      var size = random(10, 35);
      var rotation = random(0, 360);
      
      var shape = floor(random(0, 5));
      
      push();
      translate(c * distanceX, r * distanceY);
      rotate(radians(rotation));
      
      if (shape == 0) {
        ellipse(0, 0, size, size);
      }
      else if (shape == 1) {
        rect(0, 0, size, size);
      }
      else if (shape == 2) {
        triangle(-size/2, size/2, size/2, size/2, 0, -size/2);
      }
      else if (shape == 3) {
        beginShape();
        for (var i = 0; i < 6; i++) {
          var angle = map(i, 0, 6, 0, TWO_PI);
          var x = cos(angle) * size/2;
          var y = sin(angle) * size/2;
          vertex(x, y);
        }
        endShape(CLOSE);
      }
      else {
        for (var i = 0; i < 8; i++) {
          rotate(PI/4);
          ellipse(size/4, 0, size/6, size/3);
        }
      }
      
      pop();
      
      if (random(100) < 15) {
        fill(255, 255, 255, 150);
        ellipse(c * distanceX + random(-15, 15), r * distanceY + random(-15, 15), random(3, 8));
      }
    }
  }
}