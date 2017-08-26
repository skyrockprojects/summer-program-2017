// Credits 
// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

p5.disableFriendlyErrors = true; // disable error check for performance

// Global variable arrays
// Note: Curious that array attributes aren't stored globally (e.g. vegans.length returns 0 at this level)
// Using this variable to decide whether to draw all the stuff
var ltightness = 75; // lower is tighter centrally but knots at extremes | Can be offset at other points for further shaping
var lx=0;
var ly=0;
var rtightness = 75; 
var rx=0;
var ry=0;
var ttightness = 75; 
var tx=0;
var ty=0;
var btightness = 75; 
var bx=0;
var by=0;

var canvas;
var cap;
var previousPixels;
var flow;
//var w = windowWidth, h = windowHeight;
var step = 8;
var thresh = 5;
var flowZone = [];
var plants = [];
var vegans = [];
var preds = [];
//var vegdeatheaten = 0;
//var vegdeathstarve = 0;
//var preddeathstarve = 0;

/*var slider1;
var slider2;
var slider3;
var slider4;
var slider5;
var slider6;
var slider7;
var sliderslope;*/

function setup() {  
  canvas = createCanvas(windowWidth, windowHeight);
  //canvas.parent("canvas");
  rx = windowWidth;
  by = windowHeight;
  rectMode(CENTER);

  cap = createCapture(VIDEO);
  cap.size(windowWidth, windowHeight);
  cap.hide();
  //cap.parent("video");
  //smooth();
  //background(25);
  //blendMode(DIFFERENCE); 

  /*h1 = createElement('h3', "").parent('vegPop'); //creates an html element that we can update below (size, string/value)
  h2 = createElement('h3', "").parent('vegDeathEaten');
  h3 = createElement('h3', "").parent('vegDeathStarve');
  h4 = createElement('h3', "").parent('predPop');
  h5 = createElement('h3', "").parent('predDeathStarve');  */

  //insert plants, vegans and preds
  flow = new FlowCalculator(step);
  
  for (var i = 0; i < 12; i++) {
    plants.push(new Plant(Math.random() * width, Math.random() * height));
  };

  for (i = 0; i < 50; i++) {
    vegans.push(new Vegan(Math.random() * width, Math.random() * height));
  }
  for (i = 0; i < 5; i++) {
    preds.push(new Pred(Math.random() * width, Math.random() * height));
  };
  reset();
}

function draw() {
  //background(0, 10, 0, 100); // control "trails"
  //tint(200, 20, 250); // control "trails"
  // Make a new flow field with "resolution" of 'step'
  cap.loadPixels();
  if(cap.pixels.length > 0) {
    if(previousPixels) {

      // cheap way to ignore duplicate frames
      if(same(previousPixels, cap.pixels, 4, width)) {
        return;
      }
      
      flow.calculate(previousPixels, cap.pixels, windowWidth, windowHeight);
    }
    
    previousPixels = copyImage(cap.pixels, previousPixels);
    //image(cap, 0, 0); // simply comment this out to hide image but still calculate - also can be used for effects
    
    if(flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
      
      //strokeWeight(2);
      background(0, 10, 0); // no flicker if drawn here
      flow.flow.zones.forEach((zone) => {
        var pixVals = ((zone.y*windowWidth)+zone.x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
        //strokeWeight((zone.u+zone.v)*0.1);
        //stroke(cap.pixels[pixVals+2], cap.pixels[pixVals], cap.pixels[pixVals+1]);
        fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2]);
        rect(zone.x, zone.y, zone.u, zone.v);
        
        if (zone.x + zone.u > zone.x+thresh || zone.x + zone.u < zone.x-thresh ||
          zone.y + zone.v > zone.y+thresh || zone.y + zone.v < zone.y-thresh) {
          //console.log("zone.x= " + zone.x + " + zone.u= " +zone.u + " zone.y= " + zone.y + " + zone.v= " +zone.v);
          flowZone.push(zone); //place here to only fill array when there's movement over the threshold
        }
      })
    }
  noStroke();
  
  //background(0, 10, 0); // no flicker if drawn here

  for (var i = 0; i < plants.length; i++) {
    plants[i].display();
  }

  var lyAve = 0;
  var ryAve = 0;
  for (i = 0; i < vegans.length; i++) {
    vegans[i].applyBehaviors(vegans); // new function that combines forces/behaviors
    vegans[i].update();
    vegans[i].borders();
    vegans[i].display();
    lyAve = lyAve + vegans[i].position.y;
    ryAve = ryAve + vegans[i].position.y;
    if (vegans[i].reproduce()) {
      vegans.push(new Vegan(vegans[i].position.x, vegans[i].position.y));
      vegans.length = vegans.length < 100 ? vegans.length : 100;
    }
    if (vegans[i].isDead()) { // NOTE: place after all funcs in case value is 0
      //vegans.splice(vegans[i], 1); TEACH: the difference between this and the right expression
      vegans.splice(i, 1); 
      //input1 = createDiv("the Vegan Population is " + vegans.length).parent('vegPop');
    }

  }
  ly = lyAve/vegans.length;
  ry = ryAve/vegans.length;

  var txAve = 0;
  var bxAve = 0;
  for (i = 0; i < preds.length; i++) {
    preds[i].applyBehaviors(preds); // new function that combines forces/behaviors
    preds[i].update();
    preds[i].borders();
    preds[i].display(); 
    txAve = txAve + preds[i].position.x;
    bxAve = bxAve + preds[i].position.x;
    if (preds[i].reproduce()) {
      preds.push(new Pred(preds[i].position.x, preds[i].position.y));
      preds.length = preds.length < 50 ? preds.length : 50;
    }
    if (preds[i].isDead()) { // NOTE: place after all funcs in case value is 0
      preds.splice(i, 1);
    }
  }
  tx = txAve/preds.length;
  bx = bxAve/preds.length;
  }
  fill(10, 10, 10);
  
  leftWarp(lx,ly,ltightness);
  topWarp(tx,ty,ttightness);
  rightWarp(rx,ry,rtightness);
  bottomWarp(bx,by,btightness);
  // console.log(left.warp);
  

  if (keyIsDown(76)) { // "l" for left{
    lx = mouseX;
    ly = mouseY;
    if (keyIsDown(UP_ARROW))
    ltightness+=5;

    if (keyIsDown(DOWN_ARROW))
    ltightness-=5;
  }


  if (keyIsDown(84)) { // "t" for top
    tx = mouseX;
    ty = mouseY;
    if (keyIsDown(UP_ARROW))
    ttightness+=5;

    if (keyIsDown(DOWN_ARROW))
    ttightness-=5;
  }

  if (keyIsDown(82)){ // "r" for right
    rx = mouseX;
    ry = mouseY;
    if (keyIsDown(UP_ARROW))
    rtightness+=5;

    if (keyIsDown(DOWN_ARROW))
    rtightness-=5; 
  }

  if (keyIsDown(66)){ // "b" for bottom
    bx = mouseX;
    by = mouseY;
    if (keyIsDown(UP_ARROW))
    btightness+=5;

    if (keyIsDown(DOWN_ARROW))
    btightness-=5;
  }
  /*h1.html("the Vegan Population is " + vegans.length);
  h2.html("the Vegan Death Count by being eaten is " + vegdeatheaten);
  h3.html("the Vegan Death Count by starvation is " + vegdeathstarve);
  h4.html("the Predator Population is " + preds.length);
  h5.html("the Predator Death Count by starvation is " + preddeathstarve);*/
 
  //console.log(cap.width);
//  blend(cap, 0, 0, w, h, 0, 0, w, h, DODGE); // bizarre aspect problem (1815)

  flowZone.length = 0; // must be reset each loop or it will accumulate
}

function lookup(lookupX, lookupY){
      //console.log(flowZone.length);
      if (flowZone.length > 0) {

        for (var i = 0; i < flowZone.length; i++){
          // hard-coded the step value (8*2)+1
          if ((flowZone[i].x <= lookupX && flowZone[i].x+flowZone[i].u > lookupX && Math.abs(flowZone[i].y - lookupY) <= 17) || (flowZone[i].x >= lookupX && flowZone[i].x+flowZone[i].u < lookupX && Math.abs(flowZone[i].y - lookupY) <= 17) || (flowZone[i].y <= lookupY && flowZone[i].y+flowZone[i].v > lookupY && Math.abs(flowZone[i].x - lookupX) <= 17) || (flowZone[i].y >= lookupY && flowZone[i].y+flowZone[i].v < lookupY && Math.abs(flowZone[i].x - lookupX) <= 17)) {
            //console.log(lookupX + " " + lookupY + " " + flowZone[i].x + " " + flowZone[i].y);
            //console.log(flowZone[i].u + " " + flowZone[i].v);
            var opForce = createVector(flowZone[i].u, flowZone[i].v);
            return opForce;
          } 
        }
        return createVector(0, 0);
      }
      else {
        return createVector(0, 0);
      }
    }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function leftWarp(x,y,tightness) {
  beginShape();
  //fill(255);
  curveVertex(0, 0);
  curveVertex(0, 0);
  curveVertex(lx, ly*(ly/windowHeight));
  curveVertex(lx, ly+ltightness);
  curveVertex(0, windowHeight);
  curveVertex(0, windowHeight);
  endShape();
  return;
}

function topWarp(x,y,tightness) {
  beginShape();
  //fill(255);
  curveVertex(0, 0);
  curveVertex(0, 0);
  curveVertex(tx*(tx/windowWidth), ty);
  curveVertex(tx+ttightness, ty);
  curveVertex(windowWidth, 0);
  curveVertex(windowWidth, 0);
  endShape();
  return;
}

function rightWarp(x,y,tightness) {
  beginShape();
  //fill(255);
  curveVertex(windowWidth, 0);
  curveVertex(windowWidth, 0);
  curveVertex(rx, ry*(ry/windowHeight));
  curveVertex(rx, ry+rtightness);
  curveVertex(windowWidth, windowHeight);
  curveVertex(windowWidth, windowHeight);
  endShape();
  return;
}

function bottomWarp(x,y,tightness) {
  beginShape();
  //fill(255);
  curveVertex(0, windowHeight);
  curveVertex(0, windowHeight);
  curveVertex(bx*(bx/windowWidth), by);
  curveVertex(bx+btightness, by);
  curveVertex(windowWidth, windowHeight);
  curveVertex(windowWidth, windowHeight);
  endShape();
  return;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function reset() {
    setTimeout(function() {
    flowZone = [];
    plants = [];
    vegans = [];
    preds = [];
    setup();
  }, 300000);
}



/*function mouseDragged() {
  vegans.push(new Vegan(mouseX,mouseY));
}*/

