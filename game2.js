var x, y, z;
var xpos, ypos;
var speed = 1;
a = 0;
trail = [];
let levels = [];
let currentLevel = 0;
let mousePositions = [];
const MAX_POS = 15;
var splashColor = '#bdbdbd';
var outerDiam = 0;

function setup() {
  levels.push(loadImage("./levels/invisible.png"));
  levels.push(loadImage("./levels/invisible2.png"));
  levels.push(loadImage("./levels/lvl2-2.png"));
  levels.push(loadImage("./levels/lvl3.png"));
  levels.push(loadImage("./levels/lvl3-2.png"));
  levels.push(loadImage("./levels/lvl4.png"));
  levels.push(loadImage("./levels/lvl4-2.png"));
  levels.push(loadImage("./levels/lvl4-3.png"));
  levels.push(loadImage("./levels/lvl5.png"));
  levels.push(loadImage("./levels/lvl5-2.png"));
  levels.push(loadImage("./levels/lvl5-3.png"));
  levels.push(loadImage("./levels/lvl6.png"));
  levels.push(loadImage("./levels/lvl6-2.png"));
  levels.push(loadImage("./levels/lvl6-3.png"));
  levels.push(loadImage("./levels/win.png"));
  console.log(levels)

  new Image(levels[currentLevel], 0, 0, windowWidth, windowHeight);

  rectMode(CENTER);
  // set canvas size
  createCanvas(windowWidth, windowHeight);

  // default values
  xpos = windowWidth/2;
  ypos = 30;
  x = 0;
  y = 0;
} 

function draw() {
  // set background color to white
  background('#e0e0e0');

  //splash animation
  for(var i = 0; i < 1; i+=1) {
    var diam = outerDiam - 30 * i;    
    if (diam > 0) {
      var fade = map(diam, 0, width, 0, 255);
      noStroke();
      fill(splashColor);
      ellipse(xpos, ypos, diam);
    }
  }
  
  outerDiam = outerDiam + 16;
  
  if(outerDiam > windowHeight * 1.2) {
      console.log('done');
  }
  else {
    console.log(outerDiam);
  }

  image(levels[currentLevel], 0, 0, windowWidth, windowHeight);

  // add/subract xpos and ypos
  xpos = xpos - x;
  ypos = ypos + y;

  if((get(xpos, ypos)[1] == 175) || (get(xpos, ypos)[0] == 255) || (get(xpos, ypos)[2] == 225) || (get(xpos, ypos)[2] == 0)) {
    console.log('dead');
    xpos = windowWidth/2;
    ypos = 30;
  }
  if((get(xpos, ypos)[2] == 161) /*green*/) {
    console.log('win');
    xpos = windowWidth/2;
    ypos = 30;
    currentLevel++;
  }
  //blue
  if((get(xpos, ypos)[2] == 249)) {
    splashColor = "#01CDFE";
    redraw();
    if(outerDiam > windowHeight * 1.2) {
      currentLevel++;
    }

  }
  //purple
  if((get(xpos, ypos)[2] == 250)) {
    splashColor = "B967FF";
    redraw();
    if(outerDiam > windowHeight * 1.2) {
      currentLevel++;
    }
  }

  // draw ellipse
  ellipse(xpos, ypos, 15, 15);
  fill(0);

  //draw trails

  //how you're drawing your pose
  ellipse(xpos, ypos, 15, 15);
  fill(0);

  mousePositions.push({x: xpos, y: ypos});
  if (mousePositions.length > MAX_POS) {
  	 mousePositions.shift();
  }
  for (let i = 0; i < mousePositions.length; i +=1) {
  	ellipse(mousePositions[i].x, mousePositions[i].y, i, i);
  }

}

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
});