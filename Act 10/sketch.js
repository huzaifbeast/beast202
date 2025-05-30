let particles = [];
let bubbles = [];
let ripples = [];
let sparkles = [];
let time = 0;
let isRaining = false;
let rainDrops = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: random(width),                                
            y: random(height),
            size: random(2, 8),
            speed: random(0.5, 2),
            opacity: random(100, 255),
            hue: random(180, 220)
        });
    }

    for (let i = 0; i < 50; i++) {
        sparkles.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            speed: random(0.3, 1),
            alpha: random(100, 255)
        });
    }
}

function draw() {
    drawGradientBackground();

    drawParticles();
    drawRipples();
    drawBubbles();
    drawSparkles();

    if (isRaining) {
        drawRain();
    }

    drawUniversityText();

    time++;

    ripples = ripples.filter(r => r.life > 0);
    bubbles = bubbles.filter(b => b.y > -50);
    rainDrops = rainDrops.filter(r => r.y < height + 20);
}

function drawGradientBackground() {
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let wave = sin(time * 0.01 + i * 0.01) * 0.1;
        let c = lerpColor(color(0, 100, 255, 90), color(200, 0, 255, 90), inter + wave);
        stroke(c);
        line(0, i, width, i);
    }
}

function drawParticles() {
    for (let p of particles) {
        push();
        colorMode(HSB);
        fill(p.hue, 60, 90, p.opacity);
        noStroke();
        let pulseSize = p.size + sin(time * 0.05 + p.x * 0.01) * 2;
        ellipse(p.x, p.y, pulseSize);

        p.x += sin(time * 0.02 + p.y * 0.01) * p.speed;
        p.y += cos(time * 0.015 + p.x * 0.008) * p.speed * 0.5;

        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.y < -10) p.y = height + 10;
        pop();
    }
}

function drawRipples() {
    for (let ripple of ripples) {
        push();
        stroke(255, ripple.life);
        strokeWeight(2);
        noFill();
        ellipse(ripple.x, ripple.y, ripple.size);
        ripple.size += 3;
        ripple.life -= 3;
        pop();
    }
}

function drawBubbles() {
    for (let bubble of bubbles) {
        push();
        colorMode(HSB);
        fill(200, 30, 95, 150);
        stroke(200, 50, 100, 200);
        strokeWeight(1);
        ellipse(bubble.x, bubble.y, bubble.size);

        fill(255, 255, 255, 100);
        noStroke();
        ellipse(bubble.x - bubble.size * 0.2, bubble.y - bubble.size * 0.2, bubble.size * 0.3);

        bubble.y -= bubble.speed;
        bubble.x += sin(bubble.y * 0.01) * 2;
        bubble.size += 0.1;
        pop();
    }
}

function drawSparkles() {
    for (let s of sparkles) {
        push();
        noStroke();
        fill(255, s.alpha);
        ellipse(s.x, s.y, s.size);
        s.y += s.speed;
        s.alpha = 100 + sin(time * 0.1 + s.y) * 155;
        if (s.y > height) {
            s.y = 0;
            s.x = random(width);
        }
        pop();
    }
}

function drawRain() {
    if (frameCount % 2 === 0) {
        rainDrops.push({
            x: random(width),
            y: -10,
            speed: random(5, 12),
            length: random(10, 25)
        });
    }

    for (let drop of rainDrops) {
        push();
        stroke(200, 220, 255, 150);
        strokeWeight(2);
        line(drop.x, drop.y, drop.x, drop.y + drop.length);
        drop.y += drop.speed;

        if (drop.y > height - 20) {
            createRipple(drop.x, height - 20);
        }
        pop();
    }
}

function drawUniversityText() {
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);

    for (let i = 0; i < 5; i++) {
        fill(255, 255, 255, 40 - i * 8);
        textSize(width * 0.08);
        text("BATH SPA", width / 2 + i, height / 2 - 60 + i);
        text("UNIVERSITY", width / 2 + i, height / 2 + 20 + i);
    }

    fill(255);
    textSize(width * 0.08);
    text("BATH SPA", width / 2, height / 2 - 60);
    text("UNIVERSITY", width / 2, height / 2 + 20);

    stroke(255, 150);
    noFill();
    let circleSize = 300 + sin(time * 0.03) * 20;
    ellipse(width / 2, height / 2 - 20, circleSize);

    for (let i = 0; i < 8; i++) {
        let angle = time * 0.02 + i * PI / 4;
        let sparkleX = width / 2 + cos(angle) * (150 + sin(time * 0.05) * 30);
        let sparkleY = height / 2 - 20 + sin(angle) * (80 + cos(time * 0.04) * 20);
        fill(255, 255, 255, 150 + sin(time * 0.1 + i) * 100);
        noStroke();
        ellipse(sparkleX, sparkleY, 4 + sin(time * 0.08 + i) * 2);
    }

    textSize(width * 0.018);
    fill(255, 200);
    text("Press SPACE for rain 🌧", width / 2, height - 40);
    pop();
}

function mouseMoved() {
    if (frameCount % 5 === 0) {
        createRipple(mouseX, mouseY);
    }
}

function mousePressed() {
    for (let i = 0; i < 5; i++) {
        bubbles.push({
            x: mouseX + random(-20, 20),
            y: mouseY + random(-10, 10),
            size: random(10, 30),
            speed: random(1, 3)
        });
    }

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createRipple(mouseX, mouseY);
        }, i * 100);
    }
}

function keyPressed() {
    if (key === ' ') {
        isRaining = true;
    }
}

function keyReleased() {
    if (key === ' ') {
        isRaining = false;
        rainDrops = [];
    }
}

function touchStarted() {
    for (let i = 0; i < touches.length; i++) {
        let tx = touches[i].x;
        let ty = touches[i].y;
        for (let j = 0; j < 3; j++) {
            bubbles.push({
                x: tx + random(-15, 15),
                y: ty + random(-10, 10),
                size: random(8, 25),
                speed: random(1, 2.5)
            });
        }
        createRipple(tx, ty);
    }
    return false;
}

function touchMoved() {
    for (let i = 0; i < touches.length; i++) {
        createRipple(touches[i].x, touches[i].y);
    }
    return false;
}

function createRipple(x, y) {
    ripples.push({
        x: x,
        y: y,
        size: 0,
        life: 100
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}