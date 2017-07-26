// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
//shiffman:https://p5js.org/examples/color-brightness.html
p5.disableFriendlyErrors = true;

var canvas
var cap;
var tracker;
var img;
var w = 640, h = 480;

function preload() {
  img = loadImage("bond.png");
}

function setup() {
  canvas = createCanvas(w, h);
  pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  loadPixels();
  
  colorMode(HSB);
  
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(cap.elt);
  noStroke();

}

function draw() {
  
  //filter(THRESHOLD, 1);
  //background(51);
  cap.loadPixels();
  image(img, 0, 0, w, h);
  loadPixels(); //image is on canvas
  var positions = tracker.getCurrentPosition();
  if(positions.length > 0) {  
    //image(cap, 0, 0, w, h);
      for (var x = 0; x < cap.width; x++) {
        for (var y = 0; y < cap.height; y++ ) {
          // Calculate the 1D location from a 2D grid
          var loc = (x + y*cap.width)*4;
          // Get the R,G,B values from image
          var r,g,b;
          r = cap.pixels[loc];
          g = cap.pixels[loc+1];
          b = cap.pixels[loc+2];
          // Calculate an amount to change brightness based on proximity to the mouse
          var maxdist = 100;
          var d = distSquared(x, y, positions[62][0], positions[62][1]); // set squared distance (e.g. 10000 for 100) faster performance
          if (d >= maxdist*maxdist){
            r = pixels[loc];
            g = pixels[loc+1];
            b = pixels[loc+2];
          }
          var pixloc = (y*width + x)*4;
          pixels[pixloc] = r;
          pixels[pixloc+1] = g;
          pixels[pixloc+2] = b;
          pixels[pixloc+3] = 255;
      }
    }
  } 
  updatePixels(); // refers to canvas pixels(?) and connects with loadpixels();
}

function distSquared(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}

/*

  */
