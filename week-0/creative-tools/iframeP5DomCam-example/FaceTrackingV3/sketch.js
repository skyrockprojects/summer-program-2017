// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var canvas;
var cap;
var tracker;
var w = 640, h = 480;

function setup() {
  canvas = createCanvas(w, h);
  pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  
  colorMode(HSB);
  
  tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("cycle", "lbp");
  tracker.start(cap.elt);
  noStroke();
}

function draw() {
  //image(cap, 0, 0, w, h);
  background(51);
  cap.loadPixels();
  var positions = tracker.getCurrentPosition();

  //noFill();
  stroke(255);
  beginShape();
  if(positions.length > 0) {
    for (var i=0; i<23; i++) {
      vertex(positions[i][0], positions[i][1]); //appear to be x/y min/max of each tag
    }
      vertex(positions[22][0], positions[22][1]);
      vertex(positions[18][0], positions[18][1]);
      vertex(positions[19][0], positions[19][1]);
      vertex(positions[0][0], positions[0][1]);
    }
  endShape();
  
  for (var i=0; i<positions.length; i++) {
    fill(map(i, 0, positions.length, 0, 360), 50, 100);
    ellipse(positions[i][0], positions[i][1], 4, 4);
    text(i, positions[i][0], positions[i][1]);
  }
  //clear();
}

/*

  */
