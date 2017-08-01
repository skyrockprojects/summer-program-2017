// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
//shiffman:https://p5js.org/examples/color-brightness.html
p5.disableFriendlyErrors = true;

var canvas
var cap;
var tracker;
var img;
var img2;
var w = 640, h = 480;
var sightX = 0;
var sightY = 0;
var previousPixels;
var blood = 0;

function preload() {
  img = loadImage("bond.png");
}

function setup() {
  canvas = createCanvas(w, h);
  pixelDensity(1);
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
  
  var positions = tracker.getCurrentPosition();
  if(positions.length > 0) {  
    cap.loadPixels();
    previousPixels = copyImage(cap.pixels, previousPixels);
    //console.log(previousPixels);
    img2 = image(img, 0, 0, w, h);
    loadPixels(); //image is on canvas
      for (var x = 0; x < cap.width; x++) {
        for (var y = 0; y < cap.height; y++ ) {
          // Calculate the 1D location from a 2D grid
          var loc = (x + y*cap.width)*4;
          // Get the R,G,B values from image
          var r,g,b;
          r = cap.pixels[loc];
          g = cap.pixels[loc+1];
          b = cap.pixels[loc+2];
          // Calculate distance for masking
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
  	sightX = positions[62][0];
  	sightY = positions[62][1];
    var bloody = blood <= 0 ? (0) : (blood -= 0.01);
  } else if(previousPixels) {
  	var bloody = blood >= 0.7? (blood += 0) : (blood += 0.01); //hsb alpha is 0-1?
  } 
  //console.log(blood);
  updatePixels(); // refers to canvas pixels(?) and connects with loadpixels();
  fill(353, 95, 733, blood);
  ellipse(sightX, sightY, 200, 200);
  strokeWeight(2);
  stroke(20);
  line(sightX-100, sightY, sightX-50, sightY);
  line(sightX, sightY-100, sightX, sightY-50);
  line(sightX+100, sightY, sightX+50, sightY);
  line(sightX, sightY+100, sightX, sightY+50);
}

function distSquared(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}

/*

  */
