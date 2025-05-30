let wheels = [];
let speedLines = [];
let exhaustTrails = [];
let neonGlow = 0;
let engineSound = 0;
let turboMode = false;
let wheelSpin = 0;
let carSpeed = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  
  for (let i = 0; i < 4; i++) {
    wheels.push({
      x: random(100, width - 100),
      y: random(100, height - 100),
      rotation: 0,
      speed: 0,
      size: random(60, 120),
      rimColor: random(360),
      spinning: false
    });
  }
}

function draw() {
  drawBackground();
  updateCarEffects();
  drawSpeedLines();
  drawExhaustTrails();
  drawWheels();
  drawNeonEffects();
  drawUI();
}

function drawBackground() {
  let bgColor = turboMode ? 0 : 240;
  background(bgColor, 80, 5, 20);
  
  stroke(bgColor + 60, 40, 20, 30);
  strokeWeight(2);
  for (let i = 0; i < 10; i++) {
    let y = (height / 10) * i;
    line(0, y, width, y);
  }
}

function updateCarEffects() {
  let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  carSpeed = lerp(carSpeed, mouseSpeed, 0.1);
  engineSound = map(carSpeed, 0, 50, 0, 100);
  neonGlow = (neonGlow + carSpeed * 0.1) % 360;
  wheelSpin += carSpeed * 0.2;
}

function drawSpeedLines() {
  if (carSpeed > 5) {
    for (let i = speedLines.length - 1; i >= 0; i--) {
      let speedLine = speedLines[i];
      
      stroke(180 + sin(speedLine.offset) * 60, 80, 90, speedLine.alpha);
      strokeWeight(speedLine.thickness);
      
      // p5.js compatible shadow effect
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = color(180, 80, 50);
      
      line(speedLine.x1, speedLine.y1, speedLine.x2, speedLine.y2);
      
      speedLine.x1 -= speedLine.speed;
      speedLine.x2 -= speedLine.speed;
      speedLine.alpha -= 2;
      
      if (speedLine.alpha <= 0 || speedLine.x2 < 0) {
        speedLines.splice(i, 1);
      }
    }
    drawingContext.shadowBlur = 0;
    
    if (frameCount % 3 === 0) {
      for (let i = 0; i < 3; i++) {
        speedLines.push({
          x1: width,
          y1: random(height),
          x2: width - random(50, 150),
          y2: random(height),
          speed: carSpeed * random(0.5, 1.5),
          alpha: 60,
          thickness: random(1, 4),
          offset: random(100)
        });
      }
    }
  }
}

function drawExhaustTrails() {
  for (let i = exhaustTrails.length - 1; i >= 0; i--) {
    let trail = exhaustTrails[i];
    
    let hue = turboMode ? 30 : 240;
    fill(hue, 70, 80, trail.alpha);
    noStroke();
    
    ellipse(trail.x, trail.y, trail.size);
    
    trail.x -= trail.speed;
    trail.y += random(-2, 2);
    trail.size *= 1.02;
    trail.alpha -= 3;
    
    if (trail.alpha <= 0) {
      exhaustTrails.splice(i, 1);
    }
  }
}

function drawWheels() {
  for (let wheel of wheels) {
    push();
    translate(wheel.x, wheel.y);
    
    if (wheel.spinning) {
      wheel.rotation += wheel.speed;
      wheel.speed *= 0.98;
      if (wheel.speed < 0.1) {
        wheel.spinning = false;
      }
    }
    
    rotate(wheel.rotation);
    
    // Shadow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(wheel.rimColor, 80, 50);
    
    // Tire
    fill(0, 0, 20);
    stroke(wheel.rimColor, 80, 90);
    strokeWeight(8);
    ellipse(0, 0, wheel.size);
    
    // Spokes
    stroke(wheel.rimColor, 60, 70);
    strokeWeight(4);
    for (let i = 0; i < 5; i++) {
      let angle = (TWO_PI / 5) * i;
      let x1 = cos(angle) * (wheel.size * 0.15);
      let y1 = sin(angle) * (wheel.size * 0.15);
      let x2 = cos(angle) * (wheel.size * 0.4);
      let y2 = sin(angle) * (wheel.size * 0.4);
      line(x1, y1, x2, y2);
    }
    
    // Center hub
    fill(wheel.rimColor, 90, 90);
    noStroke();
    ellipse(0, 0, wheel.size * 0.3);
    
    // Center dot
    fill(0, 0, 10);
    ellipse(0, 0, wheel.size * 0.15);
    
    drawingContext.shadowBlur = 0;
    pop();
  }
}

function drawNeonEffects() {
  if (turboMode) {
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = color(neonGlow, 100, 50);
    
    stroke(neonGlow, 100, 90, 60);
    strokeWeight(6);
    noFill();
    
    for (let i = 0; i < 3; i++) {
      let offset = i * 20;
      beginShape();
      for (let x = 0; x < width; x += 10) {
        let y = height/2 + sin(x * 0.01 + frameCount * 0.1 + offset) * 50;
        vertex(x, y);
      }
      endShape();
    }
    drawingContext.shadowBlur = 0;
  }
}

function drawUI() {
  fill(0, 0, 0, 70);
  noStroke();
  rect(10, 10, 250, 140, 8);
  
  fill(180, 80, 90);
  textAlign(LEFT);
  textSize(16);
  text("NEON RACING", 15, 30);
  
  textSize(12);
  fill(0, 0, 100);
  text("Move mouse: Generate speed", 15, 50);
  text("Click wheels: Spin them", 15, 65);
  text("SPACE: Turbo mode", 15, 80);
  text("E: Create exhaust", 15, 95);
  text("R: Reset wheels", 15, 110);
  text("S: Screenshot", 15, 125);
  
  // Speed bar
  let speedBar = map(carSpeed, 0, 50, 0, 100);
  fill(carSpeed > 30 ? 0 : 120, 80, 90);
  rect(15, 135, speedBar, 8);
  stroke(0, 0, 100);
  strokeWeight(1);
  noFill();
  rect(15, 135, 100, 8);
}

function mousePressed() {
  for (let wheel of wheels) {
    let d = dist(mouseX, mouseY, wheel.x, wheel.y);
    if (d < wheel.size/2) {
      wheel.spinning = true;
      wheel.speed = random(0.2, 0.8);
      wheel.rimColor = random(360);
      
      // Create exhaust particles when wheel is clicked
      for (let i = 0; i < 5; i++) {
        exhaustTrails.push({
          x: wheel.x + random(-20, 20),
          y: wheel.y + random(-20, 20),
          size: random(10, 25),
          speed: random(3, 8),
          alpha: 80
        });
      }
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    turboMode = !turboMode;
  }
  
  if (key === 'e' || key === 'E') {
    for (let i = 0; i < 10; i++) {
      exhaustTrails.push({
        x: mouseX + random(-30, 30),
        y: mouseY + random(-30, 30),
        size: random(15, 35),
        speed: random(4, 10),
        alpha: 90
      });
    }
  }
  
  if (key === 'r' || key === 'R') {
    for (let wheel of wheels) {
      wheel.x = random(100, width - 100);
      wheel.y = random(100, height - 100);
      wheel.rotation = 0;
      wheel.speed = 0;
      wheel.spinning = false;
      wheel.rimColor = random(360);
    }
    speedLines = [];
    exhaustTrails = [];
  }
  
  if (key === 's' || key === 'S') {
    save('neon-racing-' + millis() + '.png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}