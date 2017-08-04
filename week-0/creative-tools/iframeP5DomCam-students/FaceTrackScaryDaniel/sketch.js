p5.disableFriendlyErrors = true;

var canvas;
var cap;
var tracker;
var img;
var img2;
var img3;
var w = 360, h = 202;
//var sound;
var ramp = 0.9;
var xOff = 0;



function preload() {
  img = loadImage("Bikini.png");
  img3= loadImage("scary.png");
  //sound= loadSound("zomb.wav");
}


function setup() {
	canvas = createCanvas(w, h);
  	//pixelDensity(1);
  	cap = createCapture(VIDEO);
  	cap.size(w, h);
  	cap.hide();

  	//colorMode(HSB);
  
  	tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
    tracker.init(pModel);
    tracker.setResponseMode("cycle", "lbp");
  	tracker.start(cap.elt);

  	//noStroke();
}

function draw() {
  	image(img,0,0,w,h);

    var positions = tracker.getCurrentPosition();
	   //cap.loadPixels();

  	if(positions.length > 0) {
  	var eyeL= createVector(positions[25][0], positions[25][1])
  	var eyeR= createVector(positions[30][0], positions[30][1])
  	var dist= eyeL.dist(eyeR);
    //console.log(dist);
	
		if(dist>40){
		
          image(img3,0,0,w,h);
      		//sound.setVolume(0.8);
      		//sound.play();
          //console.log("here");
		}

		else{//show sexy pics
			cap.loadPixels();
      image(img,0,0,w,h);
			//loadPixels();

			
  image(img, 0, 0, w, h);
  loadPixels(); //image is on canvas
  var positions = tracker.getCurrentPosition();
  if(positions.length > 0) {  
    //image(cap, 0, 0, w, h);
      for (var x = 0; x < cap.width; x++) {
        for (var y = 0; y < cap.height; y++ ) {
          // Calculate the 1D location from a 2D grid
          var loc = (x + y*cap.width)*4;
          // Get the R,G,B values from image
          // Calculate an amount to change brightness based on proximity to the mouse
          var maxdist = 90;
          var d = distSquared(x, y, positions[62][0], positions[62][1]); // set squared distance (e.g. 10000 for 100) faster performance
          var center = Math.sqrt(d); // get center - rgb intensity will diffuse for sometimes interesting results
 		      var fade = Math.max(0, (maxdist*2 - Math.sqrt(d)*ramp)/maxdist*ramp); // "*2" is to start fade after maxdist; "ramp" generally 1 or less; and d an increasing value
            r = center > maxdist ? ((1-fade)*(pixels[loc])+(fade*cap.pixels[loc])) : (cap.pixels[loc]);
            g = center > maxdist ? ((1-fade)*(pixels[loc+1])+(fade*cap.pixels[loc+1])) : (cap.pixels[loc+1]);
            b = center > maxdist ? ((1-fade)*(pixels[loc+2])+(fade*cap.pixels[loc+2])) : (cap.pixels[loc+2]);
          //var pixloc = (y*width + x)*4;
          pixels[loc] = r;
          pixels[loc+1] = g;
          pixels[loc+2] = b;
          pixels[loc+3] = 255;
      }
    }
  } 
  updatePixels();

		//updatePixels();		
			
			stroke("Red");
			textSize(40);
			
			text("唉喔~ 靠近一點嗎",w/2,h/2);
  			text("Come a bit closer ;)",w/2,h/2+100);
			textAlign(CENTER);
		}
  
   

	}

 noStroke();
    
  for (var i = 0; i < w; i+=50) {
      xOff = xOff + 0.001;
      var x = random(w);
      var y = random(h);
      //var xw = random(10);
      var c = random(4);
      fill(c+200, c+200);
      rect(i+i*c, x+c, c, c);
    }  	

}
function distSquared(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
}