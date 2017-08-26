// plant construct

function Plant(x, y) {
  // All the usual stuff
  this.position = createVector(x, y);
  this.r = Math.random() * 10 + 15;


this.display = function() {
    if (this.r <=5) {
      this.position = createVector(Math.random() * width, Math.random() * height);
    }
    this.r += 0.5; //TEACH: += for increment like ++
    this.r = Math.max(0, Math.min(this.r, 200)); // TEACH: embedded function returns maximum number[] of minimum number[]
    var pixVals = (Math.trunc((this.position.y*windowWidth)+this.position.x))*4;
    //strokeWeight(this.r/150 * this.r);
    //stroke(0,255,191, 150); 
    push();
    translate(this.position.x, this.position.y);
    fill(0,255,191,100);
    ellipse(0, 0, this.r, this.r); //TEACHING: place random(#) for ellipse to show how draw works
    fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2], 80);        
    rect(0, 0, this.r, this.r);
    pop();
    noStroke();
  } 
 
}
