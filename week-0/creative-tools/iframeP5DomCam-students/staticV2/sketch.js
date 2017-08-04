var canvas;
var w = 360, h = 202;
var xOff = 0;
var yOff = 0.5;
var tracker;

function setup() {
  //var contX = document.getElementById("frame0");
  //console.log(contX);
  canvas =createCanvas(w, h);
  tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("cycle", "lbp");
  tracker.start(canvas.elt); // NOTE: This is a HACK to create padding caused by clmntracker - remove if not part of clmntracker installation
  background(255);
  //frameRate(2);
}
function draw() {
  var sc = random(1);
  if(sc > 0.1){
    for (var i = 0; i < width; i+=10) {
      var shift = noise(xOff)*width;
      xOff = xOff + 0.001;
      var x = random(w);
      var y = random(h);
      var xw = random(10);
      var c = random(50);
      strokeWeight(0);
      stroke(xw-100);
      fill(c+200, c+150);
      rect(i, x, c*0.33, xw);
      for (var j = 0; j < height; j+=25){
      	push();
        fill(c%25+205, x%25+205, 255);
        rect(2*x-shift, j, c, c);
        pop();
      }
   }
 } /*else{
    
    for (var i = 0; i < height; i+=10) {
      var shift = noise(yOff)*width;
      yOff = yOff + 0.001;
      var x = random(w);
      var y = random(h);
      var xw = random(10);
      var c = random(10);
      strokeWeight(0);
      stroke(xw-100);
      //fill(c%200+55, c%10+15);
      rect(x, i, xw, c);
      /*for (var j = 0; j < width; j+=25){
        push();
        fill(c%25+225, x%25+225, 255, c%50+205);
        //rect(j, 2*x-shift, xw, xw);
        pop();
      }
  }
  }*/
  
}