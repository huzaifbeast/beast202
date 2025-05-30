let games = [
  {name: "Minecraft", players: 300, color: [255, 100, 100]},
  {name: "GTA V", players: 185, color: [100, 255, 100]},
  {name: "Tetris", players: 170, color: [100, 100, 255]},
  {name: "Wii Sports", players: 83, color: [255, 255, 100]},
  {name: "PUBG", players: 75, color: [255, 100, 255]},
  {name: "Mario Kart 8", players: 62, color: [100, 255, 255]},
  {name: "Red Dead 2", players: 57, color: [255, 150, 100]},
  {name: "Overwatch", players: 50, color: [150, 255, 100]},
  {name: "Witcher 3", players: 50, color: [100, 150, 255]},
  {name: "Animal Crossing", players: 45, color: [255, 100, 150]}
];

let hovered = -1;

function setup() {
  createCanvas(900, 650);
}

function draw() {
  background(20, 25, 35);
  
  fill(255);
  textAlign(CENTER);
  textSize(28);
  text("MOST PLAYED GAMES", width/2, 50);
  
  textSize(14);
  fill(180);
  text("Players in Millions", width/2, 75);
  
  textSize(11);
  fill(100);
  text("Press 'S' to save screenshot", width/2, height - 15);
  
  drawGrid();
  drawBars();
  drawLabels();
}

function drawGrid() {
  stroke(60);
  strokeWeight(1);
  
  for (let i = 0; i <= 6; i++) {
    let x = 150 + i * 100;
    line(x, 100, x, 550);
    
    fill(120);
    textAlign(CENTER);
    textSize(12);
    text(i * 50, x, 570);
  }
  
  for (let i = 0; i < games.length; i++) {
    let y = 120 + i * 40;
    line(150, y + 35, 750, y + 35);
  }
}

function drawBars() {
  let maxPlayers = 300;
  
  for (let i = 0; i < games.length; i++) {
    let y = 120 + i * 40;
    let barWidth = map(games[i].players, 0, maxPlayers, 0, 600);
    
    if (hovered === i) {
      fill(games[i].color[0] + 50, games[i].color[1] + 50, games[i].color[2] + 50);
      strokeWeight(3);
      stroke(255);
    } else {
      fill(games[i].color[0], games[i].color[1], games[i].color[2]);
      strokeWeight(1);
      stroke(50);
    }
    
    rect(150, y, barWidth, 30, 4);
  }
  noStroke();
}

function drawLabels() {
  for (let i = 0; i < games.length; i++) {
    let y = 120 + i * 40;
    
    fill(255);
    textAlign(LEFT);
    textSize(14);
    text(games[i].name, 20, y + 20);
    
    textAlign(RIGHT);
    textSize(16);
    fill(games[i].color[0], games[i].color[1], games[i].color[2]);
    text(games[i].players + "M", 850, y + 20);
  }
}

function mouseMoved() {
  hovered = -1;
  
  for (let i = 0; i < games.length; i++) {
    let y = 120 + i * 40;
    if (mouseY >= y && mouseY <= y + 30 && mouseX >= 150) {
      hovered = i;
      break;
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    save('most-played-games-chart.png');
  }
}