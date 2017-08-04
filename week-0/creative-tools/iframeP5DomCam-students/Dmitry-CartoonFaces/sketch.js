// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var canvas;
var cap;
var tracker;

var rAve;
var bAve;
var gAve;
var aAve;
var index = 0;
var w = 320, h = 202;
var n =0;
var xOff = 0;

function setup() {
  canvas = createCanvas(w, h);
  pixelDensity(1);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  
  //colorMode(HSB);
  
  tracker = new clm.tracker({searchWindow : 13, scoreThreshold : 0.3});
  tracker.init(pModel);
  tracker.setResponseMode("blend", "sobel");
  tracker.start(cap.elt);
  //noStroke();
}

function draw() {
  //image(cap, 0, 0, w, h);
  background(0,255,0, 40);
  var positions = tracker.getCurrentPosition(); 
  cap.loadPixels();
  
  //noFill();
  stroke(255);
//   if (n >= 255) {
//   	n = 0;
//   }
//    n=n+10;
//   push ();
  
//   fill(255,n,0);
//   var diam = 10;
//   for  (var x=(diam/2);x<w; x=x+diam){
//   	for  (var y=(diam/2);y<h; y=y+diam){
//   	ellipse(x, diam/2, diam, diam);
//   	ellipse(diam/2,y,diam,diam)
//   	ellipse((w-diam/2),y,diam,diam);
//   } 
// }
//   ellipse(50, 100, diam, diam);

//   pop();
  
  //console.log(cap.pixels);
  if(positions.length > 0) {
    beginShape();
    
    var mouseLX = Math.floor(positions[44][0]);
    var mouseLY = Math.floor(positions[44][1]);
    var mouseRX = Math.floor(positions[50][0]);
    var mouseRY = Math.floor(positions[50][1]);
     
    function myLine(l, r) {

    	var eyeLX = Math.floor(positions[l][0]);
    var eyeLY = Math.floor(positions[l][1]);
    var eyeRX = Math.floor(positions[r][0]);
    var eyeRY = Math.floor(positions[r][1]);
    line (eyeLX, eyeLY, eyeRX, eyeRY);
    }
     //myLine();
    //console.log(y2Int);
     function colore (l, r){
     	var rVals = 0;
        var gVals = 0;
        var bVals = 0;
        var aVals = 0;
     	var index = 0;
     	var x1Int = Math.floor(positions[l][0]);
    var y1Int = Math.floor(positions[l][1]);
    var x2Int = Math.floor(positions[r][0]);
    var y2Int = Math.floor(positions[r][1]);
    for (var j = y1Int; j <= y2Int; j++){
      for (var k = x1Int; k <= x2Int; k++){
      //console.log("x = " + k);
      //console.log("y = " + j);
      var pixVals = (j+k*w)*4;
      rVals= rVals + cap.pixels[pixVals];
      gVals = gVals + cap.pixels[pixVals+1];
      bVals = bVals + cap.pixels[pixVals+2];
      aVals = aVals + cap.pixels[pixVals+3];
      index++;
      }
    }
          rAve = rVals/index;
          gAve = gVals/index;
          bAve = bVals/index;
          aAve = aVals/index;
          fill(rAve, gAve, bAve, aAve);
         rVals = 0;
          bVals = 0;
         gVals = 0;
         aVals = 0;
         index = 0;
  

     }

    // for (var i=0; i<23; i++) {
    //   vertex(positions[i][0], positions[i][1]); //appear to be x/y min/max of each tag
    // }
    // vertex(positions[22][0], positions[22][1]);
    // vertex(positions[18][0], positions[18][1]);
    // vertex(positions[19][0], positions[19][1]);
    // vertex(positions[0][0], positions[0][1]);

   

    endShape();
  
  
    
    //console.log("rVals " + rVals + " index " + index + " rAve " + rAve);
    //console.log("rAve " + rAve + " gAve " + gAve + " bAve " + bAve);

      //  for (var i=0; i<positions.length; i++) {
      	translate((w/2-positions[62][0]),(h/2-positions[62][1]));    
      	    colore(1,35);
    //ellipse(50, 100, 40, 40);
    ellipse(positions[62][0],positions[62][1],(2*(positions[13][0]-positions[62][0])),(2*(positions[7][1]-positions[62][1]))  )
    // for (var i=0; i<23; i++) {
    //   vertex(positions[i][0], positions[i][1]); //appear to be x/y min/max of each tag
    // }
    // vertex(positions[22][0], positions[22][1]);
    // vertex(positions[18][0], positions[18][1]);
    // vertex(positions[19][0], positions[19][1]);
    // vertex(positions[0][0], positions[0][1]);
    // endShape();
    strokeWeight(4);
    stroke(10);

    //line(x1Int, y1Int, x2Int, y2Int);
   // line (mouseLX, mouseLY, mouseRX, mouseRY);
    //myLine(23,25);
    //myLine(30,28);
    myLine(18,15);
    myLine(19,22);
    colore(27,27);
    //fill(20,20,20);
    rect(positions[63][0],positions[63][1],(2*(positions[64][0]-positions[63][0])),(2*(positions[66][1]-positions[63][1]))  )
      rect(positions[68][0],positions[68][1],(2*(positions[67][0]-positions[68][0])),(2*(positions[69][1]-positions[68][1]))  )
       colore(62,43);
       ellipse(positions[62][0],positions[62][1],(2*(positions[39][0]-positions[62][0])),(2*(positions[37][1]-positions[62][1])))
        colore(56,52);
       rect(positions[61][0],positions[61][1],(1*(positions[59][0]-positions[61][0])),(1*(positions[56][1]-positions[61][1]))  )
      
      //translate (mouseX,mouseY);
      translate((w/2-positions[62][0]),(h/2-positions[62][1])); 
     colore(1,35);

    //ellipse(50, 100, 40, 40);
    ellipse(positions[62][0],positions[62][1],(2*(positions[13][0]-positions[62][0])),(2*(positions[7][1]-positions[62][1]))  )
    //   for (var i=0; i<23; i++) {
    //   vertex(positions[i][0], positions[i][1]); //appear to be x/y min/max of each tag
    // }
    // vertex(positions[22][0], positions[22][1]);
    // vertex(positions[18][0], positions[18][1]);
    // vertex(positions[19][0], positions[19][1]);
    // vertex(positions[0][0], positions[0][1]);
    // endShape();

    strokeWeight(4);
    stroke(10);

    //line(x1Int, y1Int, x2Int, y2Int);
   // line (mouseLX, mouseLY, mouseRX, mouseRY);
    //myLine(23,25);
    //myLine(30,28);
    myLine(18,15);
    myLine(19,22);
    colore(27,27);
    //fill(20,20,20);
    rect(positions[63][0],positions[63][1],(2*(positions[64][0]-positions[63][0])),(2*(positions[66][1]-positions[63][1]))  )
      rect(positions[68][0],positions[68][1],(2*(positions[67][0]-positions[68][0])),(2*(positions[69][1]-positions[68][1]))  )
       colore(62,43);
       ellipse(positions[62][0],positions[62][1],(2*(positions[39][0]-positions[62][0])),(2*(positions[37][1]-positions[62][1])))
        colore(56,52);
       rect(positions[61][0],positions[61][1],(1*(positions[59][0]-positions[61][0])),(1*(positions[56][1]-positions[61][1]))  )

    for (var i = 0; i < w; i+=50) {
      
      xOff = xOff + 0.001;
      var x = random(w);
      var y = random(h);
      //var xw = random(10);
      var c = random(4);
      fill(c+220, c+200);
      rect(i+i*c, x+c, c, c);
    }   


    //text(i, positions[i][0], positions[i][1]);
  //}
    }
    translate(0,0);
  
  
  //clear();
}

/*

  */
