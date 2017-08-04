//src: http://creative-coding.decontextualize.com/video/

var w = 360;
var h = 202;
var cap;
var tracker;
var increment = 0;
var xOff = 0;

function setup() {
  createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();

  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(cap.elt);
  noStroke();

}
function draw() {
  var positions = tracker.getCurrentPosition();

  if(positions.length > 0) { 
    var eyebrowUp = createVector(positions[20][0], positions[20][1]); // createVector makes an xy unit - easier for computing xy points together instead of individually
    var eyebrowDown = createVector(positions[24][0], positions[24][1]);
    var eye = (eyebrowUp.dist(eyebrowDown)) * 150;

    var mouthLeft = createVector(positions[23][0], positions[23][1]); // createVector makes an xy unit - easier for computing xy points together instead of individually
    var mouthRight = createVector(positions[25][0], positions[25][1]);
    var mouth = mouthLeft.dist(mouthRight);

    var eyemouth = eye / mouth
    console.log(eyemouth)
    }
  cap.loadPixels();// loads the pixels to get the color attributes of each XY position
  for (var y = 0; y < h; y += 8) {
    for (var x = 0; x < w; x += 8) {
      var pixVals = ((y*w)+x)*4; 
      fill(cap.pixels[pixVals], cap.pixels[pixVals]+1, cap.pixels[pixVals]+2);//SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
       // filling each pixel with rgb values 
      rect(x, y, 8, 8);
      }
    }  
  if(eyemouth > 80){
       var pupilLeft = createVector(positions[27][0], positions[27][1]); // createVector makes an xy unit - easier for computing xy points together instead of individually
       var pupilRight = createVector(positions[32][0], positions[32][1]);
      
       noFill()
       stroke(255, 255, 0)
       ellipse(positions[27][0], positions[27][1], increment%400, increment%400)
       ellipse(positions[32][0], positions[32][1], increment%400, increment%400)

       noStroke();
       increment += 10;
       }else{
        increment += 0;
       }
   
  for (var i = 0; i < w; i+=50) {
      
      xOff = xOff + 0.001;
      var x = random(w);
      var y = random(h);
      //var xw = random(10);
      var c = random(4);
      fill(c+220, c+200);
      rect(i+i*c, x+c, c, c);
    } 
  
}
