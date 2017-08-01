// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var canvas;
var cap;
var tracker;
var smile;
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
  
  // A way to measure happiness?
  if(positions.length > 0) { 
    var mouthLeft = createVector(positions[44][0], positions[44][1]); // createVector makes an xy unit - easier for computing xy points together instead of individually
    var mouthRight = createVector(positions[50][0], positions[50][1]);
    smile = mouthLeft.dist(mouthRight); //distance between left and right side of mouth
    rect(20, 20, smile * 3, 20);
    text("Happiness", 20 + smile * 3, 20);
    textAlign(RIGHT);

    var serious = positions[33][1] - positions[22][1]; // createVector makes an xy unit - easier for computing xy points together instead of individually
    rect(20, 50, w-serious * 25, 20);
    text("Serious", 20 + w-serious * 25, 50);
    textAlign(RIGHT);

    var disappointed = positions[47][1] - positions[37][1]; // createVector makes an xy unit - easier for computing xy points together instead of individually
    rect(20, 80, w-disappointed * 25, 20);
    text("Disappointed", 20 + (w-disappointed * 25) - smile, 80);
    textAlign(RIGHT);

    var surprise = positions[33][1] - positions[22][1]; // createVector makes an xy unit - easier for computing xy points together instead of individually
    rect(20, 110, surprise * 10, 20);
    text("Surprise", 20 + surprise * 10, 110);
    textAlign(RIGHT);

  }
  //clear();
}

/*

  */
