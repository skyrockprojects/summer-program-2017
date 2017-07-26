var w = 640;
var h = 480;
var tanRotate = 0;

function setup() {
  createCanvas(w, h);
  background(20, 15, 20);
}

function draw() {
  background(20, 15, 20, 20);
  for(var i = 0; i <= width+50; i+=50){
  	for(var j = 0; j<= height+50; j+=50){
    	strokeWeight((i+j)%20);
  	 	stroke(j+(mouseX+mouseY)*0.1%55, 150, 100, mouseX%50);
  	 	line(mouseX, mouseY, i, j);
      push();
      tanRotate = atan2(mouseY-j, mouseX-i);
      //console.log(tanRotate);
      translate(i, j);
      rotate(tanRotate);
      strokeWeight((mouseX+mouseY)%40);
      stroke((i+j)%255, 112, (w+h-(mouseX+mouseY))*0.5%255, mouseX%50);
  	 	fill((mouseX+mouseY)*0.5%255, i%255, 255, mouseY%50);
  	 	rect(0, 0, 40, 20);
      pop();
  	}
  }
    
}