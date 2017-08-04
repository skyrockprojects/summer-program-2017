// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var cap;
var tracker
var w = 360, h = 202;
var xOff = 0;

function setup() {
  cap = createCapture(VIDEO);
  createCanvas(w, h);
  cap.size(w, h);
  cap.hide();
  
  colorMode(HSB);
  
  tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("blend", "sobel");
  tracker.start(cap.elt);
}

function draw() {
  image(cap, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255);
//  beginShape();
//  for (var i=0; i<positions.length; i++) {
//    vertex(positions[i][0], positions[i][1]);
//  }
//  endShape();
  
  noStroke();
//  for (var i=0; i<positions.length; i++) {
//    fill(map(i, 0, positions.length, 0, 360), 50, 100);
//    ellipse(positions[i][0], positions[i][1], 4, 4);
//    text(i, positions[i][0], positions[i][1]);
//  }
  
//  if(positions.length > 0) {
//    var mouthLeft = createVector(positions[44][0], positions[44][1]);
//    var mouthRight = createVector(positions[50][0], positions[50][1]);
//    var smile = mouthLeft.dist(mouthRight);
//    // rect(20, 20, smile * 3, 20);
//  }

  if(positions.length > 50){
      drawSunGlasses(positions[19],positions[22],positions[18],positions[15],positions[47]);
  }
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

function drawSunGlasses(p1,p2,p3,p4,p5){
    var width = Math.abs(p1[0]-p2[0]);
    fill("black");
    ellipse((p1[0]+p2[0])/2,(p1[1]+p2[1])/2 + width/2.2,width*1.5,width);
    ellipse((p3[0]+p4[0])/2,(p3[1]+p4[1])/2 + width/2.2,width*1.5,width);
    stroke("black");
    strokeWeight(10);
    line((p1[0]+p2[0])/2, (p1[1]+p2[1])/2, (p3[0]+p4[0])/2, (p3[1]+p4[1])/2);
    
    rect((p1[0]+p2[0])/2 - width/2, (p1[1]+p2[1])/2 - width*3, width*3, width*2);
    ellipse((p1[0]+p2[0])/2 + width, (p1[1]+p2[1])/2 - width, width*6, width*1.5);
    
    strokeWeight(20);
    line(p5[0]-width/2,p5[1]-10,p5[0]+width/2,p5[1]-10)
    strokeWeight(1);
}
