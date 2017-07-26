
var w = 640;
var h = 480;
var xOff = 0;
var yOff = 0.5;

function setup() {
  createCanvas(w, h);
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
      rect(i, x, c, xw);
      for (var j = 0; j < height; j+=25){
      	push();
        fill(c%25+205, x%25+205, 255);
        rect(2*x-shift, j, c, c);
        pop();
      }
   }
 } else{
    
    for (var i = 0; i < height; i+=10) {
      var shift = noise(yOff)*width;
      yOff = yOff + 0.001;
      var x = random(w);
      var y = random(h);
      var xw = random(10);
      var c = random(50);
      strokeWeight(0);
      stroke(xw-100);
      fill(c%200+55, c%10+15);
      rect(x, i, xw, c);
      for (var j = 0; j < width; j+=25){
        push();
        fill(c%25+225, x%25+225, 255, c%50+205);
        rect(j, 2*x-shift, xw, xw);
        pop();
      }
  }
  }
  
}