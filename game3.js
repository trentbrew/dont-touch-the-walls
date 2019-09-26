var x, y, z;
var xpos, ypos;
trail = [];
let levels = [];
let currentLevel = 0;
let player;
let timer;

function setup() {
  //aggregating level images
  levels.push(loadImage("./levels/level1.png"));
  levels.push(loadImage("./levels/level2.png"));
  levels.push(loadImage("./levels/level3.png"));
  levels.push(loadImage("./levels/level4.png"));
  new Image(levels[currentLevel], 0, 0, windowWidth, windowHeight);

  rectMode(CENTER);

  // set canvas size
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  player = new Ball();

  //dynamic level background
  background(levels[currentLevel]);

  // add/subract xpos and ypos
  player.xpos = player.xpos - x;
  player.ypos = player.ypos + y;

  //device query for iPhones
  /*if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    background(0,0,0);
    console.log('not on apple device');
    xpos = xpos + x;
    ypos = ypos - y;
  }*/

  //current collision
  console.log(get(player.xpos, player.ypos)[1]);

  //win/loss cases
  if((get(player.xpos, player.ypos)[1] == 224)) {
    console.log('dead');
    player.xpos = windowWidth/2;
    player.ypos = 30;
  }
  if((get(player.xpos, player.ypos)[1] == 209) || (get(player.xpos, player.ypos)[1] == 0)) {
    console.log('win');
    player.xpos = windowWidth/2;
    player.ypos = 30;
    currentLevel++;
  }

  player.drawBall;

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

//Ball object
class Ball {
    constructor() {
        this.initialx = windowWidth / 2;
        this.initialy = 30;
        this.xpos = 0;
        this.ypos = 0;
        this.size = 25;
    }

    drawBall() {
        fill('#C06C84');
        ellipse(this.xpos, this.ypos, this.size);
    }
}

//Timer object
class Timer {

}

class AnimationControler {
  constructor() {

  }

  next() {

  }

  ripple() {}

  smear() {}

  shrink() {}

  grow() {}
}