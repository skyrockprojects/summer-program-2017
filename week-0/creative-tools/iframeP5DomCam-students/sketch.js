var work0 = "/staticV2/index.html"
var work1 = "/FaceTrackScaryDaniel/index.html"
var work2 = "/Amy-project/index.html"
var work3 = "/Rubin/index.html"
var work4 = "/Dmitry-CartoonFaces/index.html"
var work5 = "/LuoXia/index.html"
var works = [work0, work1, work2, work3, work4, work5];

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
	for (var i = 0; i < frames.length; i++){
		frames[i].dup = i+1; //start at work 1
		//console.log(frames[i].dup);
	}
	//frames[2].src = works[2];
	//console.log(frames.length);

}

timer();

function timer() {
	intervalLen = getRandomInt(10000, 20000);
	intervalID = setInterval(myCallback, intervalLen);
}

function draw() {
	//console.log("hey");
}

function myCallback() {
  	randFrameFunc();
  	//console.log(intervalLen);
	frames[randFrame].src = works[0];
	setTimeout(function() {
		randSrcFunc();
    	frames[randFrame].src = works[randSrc];
    	frames[randFrame].dup = randSrc;
	}, 3000);
  	
}

function randFrameFunc() {
	randFrame = getRandomInt(0, 3);
}

function randSrcFunc() {
	var noDuplicate = getRandomInt(1, works.length-1);
	//console.log(noDuplicate);
	for (var i = 0; i < frames.length; i++){
			//console.log(noDuplicate + "vs" + frames[i].dup);

		if (frames[i].dup == noDuplicate) {
			//console.log("true");
			return randSrcFunc();
			}
	}
	randSrc = noDuplicate;
	return;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}






