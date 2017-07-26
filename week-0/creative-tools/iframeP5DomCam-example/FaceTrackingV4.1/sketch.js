// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var canvas
var cap;
var tracker;
//var img;
var w = 640, h = 480;

function setup() {
  canvas = createCanvas(w, h);
  pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  
  colorMode(HSB);
  
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(cap.elt);
  noStroke();
  loadPixels();  

}

function draw() {
  image(cap, 0, 0, w, h);
  //filter(THRESHOLD, 1);
  //background(51);
  cap.loadPixels();
  var positions = tracker.getCurrentPosition();
  if(positions.length > 0) {  
    for (var x = 0; x < cap.width; x++) {
      for (var y = 0; y < cap.height; y++ ) {
        // Calculate the 1D location from a 2D grid
        var loc = (x + y*cap.width)*4;
        // Get the R,G,B values from image
        var r,g,b;
        r = cap.pixels[loc];
        // Calculate an amount to change brightness based on proximity to the mouse
        var maxdist = 100;
        var d = dist(x, y, positions[62][0], positions[62][1]);
        var adjustbrightness = 255*(maxdist-d)/maxdist;
        r += adjustbrightness;
        // Constrain RGB to make sure they are within 0-255 color range
        r = constrain(r, 0, 255);
        // Make a new color and set pixel in the window
        //color c = color(r, g, b);
        var pixloc = (y*width + x)*4;
        pixels[pixloc] = r;
        pixels[pixloc+1] = r;
        pixels[pixloc+2] = r;
        pixels[pixloc+3] = 255;
      }
    }
  }  
  updatePixels(); // connects with loadpixels();
}


/*

  */
