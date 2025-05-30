let fft;
let amplitude;
let song;
let isPlaying = false;

function preload() {
  song = loadSound('soundjapanese.mp3 ');
}

function setup() {
  createCanvas(800, 600);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 5, 15);
  
  if (isPlaying && song.isPlaying()) {
    let spectrum = fft.analyze();
    let level = amplitude.getLevel();
    
    drawFrequencyBars(spectrum);
    drawAmplitudeCircle(level);
    drawWaveform();
    drawParticleSystem(spectrum, level);
    drawPulsingBackground(level);
  } else {
    fill(0, 0, 100);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Click to play music and see visualization', width/2, height/2);
  }
}

function drawFrequencyBars(spectrum) {
  let barWidth = width / spectrum.length * 3;
  
  for (let i = 0; i < spectrum.length; i++) {
    let barHeight = map(spectrum[i], 0, 255, 0, height/1.5);
    let hue = map(i, 0, spectrum.length, 180, 360);
    let brightness = map(spectrum[i], 0, 255, 30, 100);
    
    fill(hue, 80, brightness, 70);
    noStroke();
    
    rect(i * barWidth, height - barHeight, barWidth, barHeight);
    
    fill(hue, 60, brightness + 20, 40);
    rect(i * barWidth, height - barHeight * 0.7, barWidth, barHeight * 0.7);
  }
}

function drawAmplitudeCircle(level) {
  let size = map(level, 0, 1, 100, 400);
  let hue = map(level, 0, 1, 260, 20);
  
  push();
  translate(width/2, height/2);
  
  for (let ring = 3; ring > 0; ring--) {
    let ringSize = size * (ring * 0.3);
    fill(hue + ring * 30, 100 - ring * 20, 100 - ring * 10, 30);
    noStroke();
    ellipse(0, 0, ringSize, ringSize);
  }
  
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.03 + i * TWO_PI/12;
    let x = cos(angle) * size/2;
    let y = sin(angle) * size/2;
    let particleSize = map(level, 0, 1, 5, 20);
    
    fill(hue + 80, 90, 100, 80);
    ellipse(x, y, particleSize, particleSize);
  }
  pop();
}

function drawWaveform() {
  let waveform = fft.waveform();
  
  stroke(200, 100, 90, 90);
  strokeWeight(3);
  noFill();
  
  beginShape();
  for (let i = 0; i < waveform.length; i += 2) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height/3, 2*height/3);
    vertex(x, y);
  }
  endShape();
  
  stroke(40, 100, 100, 60);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < waveform.length; i += 4) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height/4, 3*height/4);
    vertex(x, y + sin(frameCount * 0.02 + x * 0.01) * 20);
  }
  endShape();
}

function drawParticleSystem(spectrum, level) {
  let numParticles = map(level, 0, 1, 20, 100);
  
  for (let i = 0; i < numParticles; i++) {
    let x = random(width);
    let y = random(height);
    let size = map(spectrum[floor(i * spectrum.length / numParticles)], 0, 255, 2, 15);
    let hue = map(i, 0, numParticles, 0, 360);
    
    fill(hue, 70, 90, 50);
    noStroke();
    ellipse(x, y, size, size);
  }
}

function drawPulsingBackground(level) {
  let pulseSize = map(level, 0, 1, 0, 200);
  
  for (let i = 0; i < 5; i++) {
    let size = pulseSize + i * 100;
    let alpha = map(i, 0, 5, 30, 5);
    
    fill(300, 50, 20, alpha);
    noStroke();
    ellipse(width/2, height/2, size, size);
  }
}

function mousePressed() {
  if (song.isLoaded()) {
    if (isPlaying) {
      song.pause();
      isPlaying = false;
    } else {
      song.play();
      fft.setInput(song);
      amplitude.setInput(song);
      isPlaying = true;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    mousePressed();
  }
}