//src: http://creative-coding.decontextualize.com/video/

var w = 360, h = 202;
var cap;
var increment=0;
var xOff = 0;
//var tracker;

function setup() {
  createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  /*tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("cycle", "lbp");
  tracker.start(cap.elt); // NOTE: This is a HACK to create padding caused by clmntracker - remove if not part of clmntracker installation
*/
}
function draw() {
  
   cap.loadPixels(); 
  for (var y = 0; y < h; y += 18){
    for (var x = 0; x < w; x += 18){
      var pixVals = ((y*w)+x)*4; 
      stroke((cap.pixels[pixVals+2]+increment)%25, (cap.pixels[pixVals+1]+increment)%15, (cap.pixels[pixVals]+increment)%10) ; 
      fill((cap.pixels[pixVals]+increment)%255 , cap.pixels[pixVals+1], cap.pixels[pixVals+2]); 
      ellipse(x, y, 18, 18)
      rect(x%y, y%x, 18, 18)

  	}
  }
  
  noStroke();
  for (var i = 0; i < w; i+=50) {
      xOff = xOff + 0.001;
      var x = random(w);
      var y = random(h);
      //var xw = random(10);
      var c = random(4);
      fill(c+200, c+230);
      rect(i+i*c, x+c, c, c);
    }
  increment +=1; 
}