var work0 = "/staticV2/index.html"
var work1 = "/FaceTrackingV4.1/index.html"
var work2 = "/FaceTrackingV4.2VidAlphaMask/index.html"
var work3 = "/FaceTrackingV4.3Bond/index.html"
var work4 = "/FaceTrackingV4.2VidAlphaMaskV3/index.html"
var work5 = "/FaceTrackingV4.3BondV2/index.html"
var work6 = "/FaceTrackingV4.2VidAlphaMaskV2/index.html"
var work7 = "/FaceTrackingV3.1/index.html"
var works = [work0, work1, work2, work3, work4, work5, work6, work7];

var frame0, frame1, frame2, frame3;
var frames = [frame0, frame1, frame2, frame3];

var intervalID;
var intervalLen = 5000;
var randFrame;
var randSrc;


function setup() {
	//createCanvas(640, 480); //width and height of my canvas
	frames[0] = document.getElementById("frame0");
	frames[1] = document.getElementById("frame1");
	frames[2] = document.getElementById("frame2");
	frames[3] = document.getElementById("frame3");
	//frames[2].src = works[2];
	//console.log(frames[0]);

}

timer();

function timer() {
	intervalID = setInterval(myCallback, intervalLen);
}

function draw() {
	//console.log("hey");
}

function myCallback() {
  	randFrameFunc();
  	randSrcFunc();
  	intervalLen = getRandomInt(1000, 5000);
  	//console.log(intervalLen);
	frames[randFrame].src = works[0];
	setTimeout(function() {
    	frames[randFrame].src = works[randSrc];
	}, 2000);
  	
}

function randFrameFunc() {
	randFrame = getRandomInt(0, 3);
}

function randSrcFunc() {
	randSrc = getRandomInt(1, 7);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}






