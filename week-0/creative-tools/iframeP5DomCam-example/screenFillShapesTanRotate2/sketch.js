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
  	 	stroke(200+(mouseX+mouseY)%55, 150, 100, mouseX%50);
  	 	line(mouseX, mouseY, i, j);
      push();
      tanRotate = atan2(mouseY-j, mouseX-i);
      translate(i, j);
      rotate(tanRotate);
      strokeWeight((mouseX+mouseY)%20);
      stroke(219, 112, (mouseX+mouseY)%255, mouseX%50+20);
  	 	fill((mouseX+mouseY)%255, 191, 255, mouseY%50+150);
  	 	rect(0, 0, (mouseX+i)%50, (mouseY+j)%50);
      pop();
  	}
  }
    
}