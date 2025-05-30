function setup() {
  createCanvas(400, 400);
  background(0);

  translate(width / 2, height / 2);

  // Alien head
  fill(0, 255, 0);
  ellipse(0, 0, 120, 150); // Head

  // Neck
  fill(0, 255, 0);
  ellipse(0, 50, 80, 60); // Neck portion

  // Eyes
  fill(255);
  ellipse(-30, -40, 30, 40); // Left eye
  ellipse(30, -40, 30, 40);  // Right eye

  fill(0);
  ellipse(-30, -40, 10, 15); // Left pupil
  ellipse(30, -40, 10, 15);  // Right pupil

  // Mouth
  noFill();
  stroke(255);
  strokeWeight(3);
  arc(0, 10, 60, 40, 0, PI); // Mouth shape

  // Body
  fill(0, 255, 0);
  ellipse(0, 110, 100, 120); // Body part

  // Legs
  fill(0, 255, 0);
  rect(-40, 160, 20, 50); // Left leg
  rect(20, 160, 20, 50);  // Right leg

  // Feet
  fill(0);
  ellipse(-30, 210, 30, 15); // Left foot
  ellipse(30, 210, 30, 15);  // Right foot

  // Arms (simple lines as hands for now)
  stroke(0, 255, 0);
  strokeWeight(8);
  line(-60, 80, -100, 130); // Left arm
  line(60, 80, 100, 130);   // Right arm

  // Hands (simple circles)
  fill(0, 255, 0);
  noStroke();
  ellipse(-100, 130, 20, 20); // Left hand
  ellipse(100, 130, 20, 20);  // Right hand
}

function draw() {
 
}
   
 

