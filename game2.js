var x, y, z;
var xpos, ypos;
var speed = 1;
a = 0;
trail = [];
let levels = [];
let currentLevel = 0;
let mousePositions = [];
const MAX_POS = 15;
var splashColor = '#e0e0e0';
var outerDiam = 0;
var blueHit = false;
var purpleHit = false;

function setup() {
  levels.push(loadImage("./levels/invisible.png"));
  levels.push(loadImage("./levels/invisible2.png"));
  levels.push(loadImage("./levels/invisible3.png"));
  levels.push(loadImage("./levels/invisible4.png"));
  levels.push(loadImage("./levels/invisible4-2.png"));
  levels.push(loadImage("./levels/invisible5.png"));
  levels.push(loadImage("./levels/invisible5-2.png"));
  levels.push(loadImage("./levels/invisible6.png"));
  levels.push(loadImage("./levels/invisible6-2.png"));

  //console.log(levels)

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
      //console.log('done');
  }
  else {
    //console.log(outerDiam);
  }

  image(levels[currentLevel], 0, 0, windowWidth, windowHeight);

  // add/subract xpos and ypos
  xpos = xpos - x;
  ypos = ypos + y;

  //death cases

  //
  if((get(xpos, ypos)[0] == 255) /*white*/ || (get(xpos, ypos)[2] == 0) /*black*/) {
    //console.log('dead');
    xpos = windowWidth/2;
    ypos = 30;
  }

  if((get(xpos, ypos)[1] == 102) /*purple gate*/) {
    if(purpleHit == false) {
      //console.log('dead');
      xpos = windowWidth/2;
      ypos = 30;
    }
  }

  if((get(xpos, ypos)[2] == 248) /*blue gate*/) {
    if(blueHit == false) {
      //console.log('dead');
      xpos = windowWidth/2;
      ypos = 30;
    }
  }

  if((get(xpos, ypos)[2] == 161) /*green*/) {
    //console.log('win');
    xpos = windowWidth/2;
    ypos = 30;
    currentLevel++;
    blueHit = false;
    purpleHit = false;
    splashColor = '#e0e0e0';
  }

  //purple switch

  if((get(xpos, ypos)[1] == 103)) {
    purpleHit = true;
    splash("#B866FE");
  }

  //blue switch

  if((get(xpos, ypos)[2] == 249)) {
    blueHit = true;
    splash("#00C8F8");
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

//for debugging
function mouseClicked() {
  console.log('win');
  xpos = windowWidth/2;
  ypos = 30;
  currentLevel++;
  blueHit = false;
  purpleHit = false;
}

function splash(color) {
  outerDiam = 0;
  splashColor = color;
}