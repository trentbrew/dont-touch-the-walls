var x, y, z;
var xpos, ypos;
var speed = 1;
a = 0;
trail = [];
let levels = [];
let currentLevel = 0;

function setup() {
  levels.push(loadImage("./levels/level1.png"));
  levels.push(loadImage("./levels/level2.png"));
  levels.push(loadImage("./levels/level3.png"));
  levels.push(loadImage("./levels/level4.png"));
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
  background(levels[currentLevel]);
  //image(img, 0, 0);

  //console.log('speed: ' + speed);
  

  // add/subract xpos and ypos
  xpos = xpos - x;
  ypos = ypos + y;

  /*if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    background(0,0,0);
    console.log('not on apple device');
    xpos = xpos + x;
    ypos = ypos - y;
  }*/

  //current collision
  console.log(get(xpos, ypos)[1]);
  //console.log('x: ' + xpos + ' y: ' + ypos);

  if((get(xpos, ypos)[1] == 224)) {
    console.log('dead');
    xpos = windowWidth/2;
    ypos = 50;
  }
  if(get(xpos, ypos)[1] == 209) {
    console.log('win');
    background(0,255,0);
  }


  // wrap ellipse if over bounds
  if(xpos > windowWidth) { 
    xpos = windowWidth; 
    x=-x 
  }
  if(xpos < 0) { 
    xpos = 0; 
    x=-x
  }
  if(ypos > windowHeight) { 
    ypos = windowHeight; 
    y=-y 
  }
  if(ypos < 0) { 
    ypos = 0; 
    y=-y 
  }

  // draw ellipse
  fill('#C06C84');
  ellipse(xpos, ypos, 25, 25);
  // music
  

  
  // display variables
  fill('#000000');
  noStroke();
  text("x: " + x, 25, 75);
  text("y: " + y, 25, 100);
  text("z: " + z, 25, 125); 
}

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
});