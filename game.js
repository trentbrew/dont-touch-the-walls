var x, y, z;
var xpos, ypos;
var speed = 1;
a = 0;
trail = [];
let level;

function setup() 
{
  level = loadImage("./levels/level1.svg");
  console.log(level)

  if(windowWidth < 768) {
    new Image(level, 0, 0, windowWidth, windowHeight);
  }
  else {
    new Image(level, 0, 0, 335, 685);
  }

  rectMode(CENTER);
  // set canvas size
  createCanvas(windowWidth, windowHeight);


  // default values
  xpos = windowWidth/2;
  ypos = 50;
  x = 0;
  y = 0;
}

function draw() 
{
  // set background color to white
  background(level);
  //image(img, 0, 0);

  //console.log('speed: ' + speed);
  

  // add/subract xpos and ypos
  xpos = xpos - x;
  ypos = ypos + y;

  //current collision
  //console.log(get(xpos, ypos));
  console.log('x: ' + xpos + ' y: ' + ypos);


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
  fill('#bdbdbd');
  noStroke();
  text("Don't touch the walls!", 25, 25);
  text("x: " + x, 25, 75);
  text("y: " + y, 25, 100);
  text("z: " + z, 25, 125); 
}

// accelerometer Data
window.addEventListener('devicemotion', function(e) 
{

  //console.log('device moved');
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);

  if(x == 0 && y == 0) {
    //speed = 0;
  }
  else {
    //speed = 2;
  }
});