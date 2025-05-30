let carX = 100;
let carY = 200;
let carSpeed = 3;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(220);
  
  // Draw road
  fill(100);
  rect(0, 220, width, 80);
  
  // Road markings
  fill(255, 255, 0);
  for (let x = 0; x < width; x += 60) {
    rect(x, 260, 30, 5);
  }
  
  // Draw car
  drawCar();
  
  // Move car with arrow keys
  if (keyIsDown(RIGHT_ARROW)) {
    carX += carSpeed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    carX -= carSpeed;
  }
  
  // Keep car on screen
  if (carX > width + 50) {
    carX = -50;
  }
  if (carX < -50) {
    carX = width + 50;
  }
}

function drawCar() {
  // Save current drawing style
  push();
  
  // Car body (main rectangle)
  fill(200, 0, 0); // Dark red color
  rect(carX, carY, 80, 30, 5); // Wider body with rounded corners
  
  // Car roof
  fill(200, 0, 0);
  rect(carX + 15, carY - 20, 50, 20, 3);
  
  // Windows
  fill(135, 206, 250); // Light sky blue for windows
  rect(carX + 20, carY - 15, 15, 15, 2); // Left window
  rect(carX + 45, carY - 15, 15, 15, 2); // Right window
  
  // Windshield divider
  fill(50);
  rect(carX + 35, carY - 20, 2, 20);
  
  // Headlights
  fill(255, 255, 200); // Light yellow for headlights
  ellipse(carX + 5, carY + 10, 10, 8); // Front left
  ellipse(carX + 75, carY + 10, 10, 8); // Front right
  
  // Taillights
  fill(255, 50, 50);
  rect(carX, carY + 5, 5, 8); // Rear left
  rect(carX + 75, carY + 5, 5, 8); // Rear right
  
  // Wheels
  fill(40); // Dark gray for tires
  ellipse(carX + 20, carY + 30, 25, 20); // Left wheel
  ellipse(carX + 60, carY + 30, 25, 20); // Right wheel
  
  // Wheel hubs
  fill(150); // Light gray for hubs
  ellipse(carX + 20, carY + 30, 12, 12);
  ellipse(carX + 60, carY + 30, 12, 12);
  
  // Restore original drawing style
  pop();
}