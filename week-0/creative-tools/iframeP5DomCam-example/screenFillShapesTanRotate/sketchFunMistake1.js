var w = 640;
var h = 480;
var tanRotate = 0;

function setup() {
  createCanvas(w, h);
  background(20, 15, 20);
}

function draw() {
  background(20, 15, 20, 20);
  for(var i = 0; i < width; i+=50){
  	for(var j = 0; j< height; j+=50){
    	strokeWeight((i+j)%20);
  	 	stroke(200, 150, 50);
  	 	line(w/2, h/2, i, j);
      tanRotate = atan2(mouseY-j, mouseX-i);
      rotate(tanRotate);
  	 	fill(50, 150, 200);
  	 	rect(i, j, (mouseX+i)%50, (mouseY+j)%50);
  	}
  }
    
}