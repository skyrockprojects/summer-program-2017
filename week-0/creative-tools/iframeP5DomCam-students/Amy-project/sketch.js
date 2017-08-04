// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
//shiffman:https://p5js.org/examples/color-brightness.html
p5.disableFriendlyErrors = true;

var canvas;
var cap;
var tracker;
var img;
var img2;
var img3;
var xOff = 0;

var w = 360, h = 202;

function preload() {
  img = loadImage("Africa-finish.png");
  img2 = loadImage("silver-1.png");
  img3 = loadImage("silver-2.png");
  //mySound = loadSound('coinsound.mp3');
 
}

function setup() {
  canvas = createCanvas(w, h);
  //pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  //loadPixels();
  
  colorMode(HSB);
  
  tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("cycle", "lbp");
  tracker.start(cap.elt);
  noStroke();


}



function draw() {
  var showImg = image(img, 0, 0, w, h);

  var positions = tracker.getCurrentPosition();
  if(positions.length>0){

  var noseTop = createVector(positions[62][0], positions[62][1]);
  var noseBot = createVector(positions[37][0], positions[37][1]);
  var silver = noseTop.dist(noseBot);
  //console.log(silver)

    cap.loadPixels();
    var showImg = image(img, 0, 0, w, h);
    var showImg2 = image(img2, positions[62][0]-100, positions[62][1]-100, 200, 200);
    //console.log(img2);
    loadPixels(); //image is on canvas
      for (var x = 0; x < cap.width; x++) {
        for (var y = 0; y < cap.height; y++) {
          // Calculate the 1D location from a 2D grid
          var loc = (x + y*cap.width)*4;
          // Get the R,G,B values from image
          var r,g,b;
          r = cap.pixels[loc];
          g = cap.pixels[loc+1];
          b = cap.pixels[loc+2];
          // Calculate distance for masking
          var maxdist = 60;
          var d = distSquared(x, y, positions[62][0], positions[62][1]); // set squared distance (e.g. 10000 for 100) faster performance
          if (d >= maxdist*maxdist){
            r = pixels[loc];
            g = pixels[loc+1];
            b = pixels[loc+2];
          }
          //var pixloc = (y*width + x)*4;
          pixels[loc] = r;
          pixels[loc+1] = g;
          pixels[loc+2] = b;
          pixels[loc+3] = 255;
      }
    }

  } 
  updatePixels(); // refers to and connects with loadpixels();
  if(silver>9){
    //var showImg = image(img, 0, 0, w, h);
    var showImg3 = image(img3, positions[62][0]-100, positions[62][1]-100, 200, 200);
    // var showImg3 = image(img3, 0, 0, 200, 200);
    //console.log(silver);

    /*mySound.setVolume(0.01);
    mySound.play();
    mySound.fade(0.5, 0.5)*/
 
               }
    /*else {
     mySound.stop();
    
         }*/
  
for (var i = 0; i < w; i+=50) {
      xOff = xOff + 0.001;
      var x = random(w);
      var y = random(h);
      //var xw = random(10);
      var c = random(4);
      fill(c+80, c+20);
      rect(i+i*c, x+c, c, c);
    }
    }

function distSquared(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}

/*

  */
