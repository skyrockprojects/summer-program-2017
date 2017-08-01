var w = 640;
var h = 480;

function setup() {
  createCanvas(w, h);
  rectMode(CENTER);
  //background(20, 15, 20);
}

function draw() {
  background(20, 15, 20);
  strokeWeight(6);
  stroke(200, 150, 50);
  for(var i = 0; i < width; i+=50){
  	for(var j = 0; j< height; j+=50){
      push();
      translate(i, j);
      var a = atan2(mouseY-h/2, mouseX-w/2);
      rotate(a);
  	 	fill(50, 150, 200);
  	 	rect(0, 0, 40, 10);
      pop();
  	}
  }
    
}