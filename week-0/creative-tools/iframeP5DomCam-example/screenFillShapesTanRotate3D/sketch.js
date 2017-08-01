//credit https://codepen.io/sha99y8oy/pen/zrQQra

var w = 640;
var h = 480;
var boxScale = 60;

function setup() {
  createCanvas(w, h, WEBGL);
  //background(20, 15, 20);
}

function draw() {
  background(20, 15, 20);
  ambientLight(50,20,10, 100);
  for (var y = -3; y <= 3; y++) {
    for (var x = -6; x <= 6; x++) {
      for (var z = -4; z <= 4; z++) {
        push();
        translate(x*150, y*150, z*-150);
        ambientMaterial((x*33)%255, (y*3)%15, (z*33)%100, 60);
        var a = -atan2(mouseY-h/2, mouseY-w/2);
        var b = atan2(mouseX-h/2, mouseX-w/2);
        rotateX(a);
        rotateY(b);
    	box(map(Math.abs(mouseX-w/2), 0, w/2, -1, 1)*boxScale, map(Math.abs(mouseY-h/2), 0, h/2, -1, 1)*boxScale, -1*boxScale);
        pop();
        directionalLight(mouseX%50, 10, mouseY%50, 250, mouseX*0.1 + mouseX*1.1, mouseY*0.1 + mouseY*1.1, -sin(a / 2));
  
      }
  	}
  }
    
}