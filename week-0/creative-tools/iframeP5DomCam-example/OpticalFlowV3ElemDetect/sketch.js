//credits: https://kylemcdonald.github.io/cv-examples/
var canvas;
var cap;
var previousPixels;
var img;
var flow;
var w = 640, h = 480;
var step = 8;
var thresh = 5;
var flowZone = [];


function setup() {
  canvas = createCanvas(w, h);
  cap = createCapture(VIDEO);
  cap.size(w, h);
  cap.hide();
  flow = new FlowCalculator(step);
}

function draw() {
  cap.loadPixels();
  if(cap.pixels.length > 0) {
    if(previousPixels) {

      // cheap way to ignore duplicate frames
      if(same(previousPixels, cap.pixels, 4, width)) {
        return;
      }
      
      flow.calculate(previousPixels, cap.pixels, w, h);
    }
    
    previousPixels = copyImage(cap.pixels, previousPixels);
    img = image(cap, 0, 0, width, height); // simply comment this out to hide image but still calculate - also can be used for effects
    
    if(flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
      
      strokeWeight(2);
      flow.flow.zones.forEach((zone) => {
        stroke(map(zone.u, -step, +step, 0, 255), map(zone.v, -step, +step, 0, 255), 128);
        line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);
        if (zone.x + zone.u > zone.x+thresh || zone.x + zone.u < zone.x-thresh ||
          zone.y + zone.v > zone.y+thresh || zone.y + zone.v < zone.y-thresh) {
          //console.log("zone.x= " + zone.x + " + zone.u= " +zone.u + " zone.y= " + zone.y + " + zone.v= " +zone.v);
          flowZone.push(zone); //place here to only fill array when there's movement over the threshold
        }
      })
    }

    var x = mouseX;
    var y = mouseY;
    var pos = lookup(x, y);

    function lookup(lookupX, lookupY){
      console.log(flowZone.length);
      if (flowZone.length > 0) {

        for (var i = 0; i < flowZone.length; i++){
          // hard-coded the step value (8*2)+1
          if ((flowZone[i].x <= lookupX && flowZone[i].x+flowZone[i].u > lookupX && Math.abs(flowZone[i].y - lookupY) <= 17) || (flowZone[i].x >= lookupX && flowZone[i].x+flowZone[i].u < lookupX && Math.abs(flowZone[i].y - lookupY) <= 17) || (flowZone[i].y <= lookupY && flowZone[i].y+flowZone[i].v > lookupY && Math.abs(flowZone[i].x - lookupX) <= 17) || (flowZone[i].y >= lookupY && flowZone[i].y+flowZone[i].v < lookupY && Math.abs(flowZone[i].x - lookupX) <= 17)) {
            console.log(lookupX + " " + lookupY + " " + flowZone[i].x + " " + flowZone[i].y);
          }
        }
      }
    }  

    flowZone.length = 0;

    noFill();
    stroke(255);
  }
}