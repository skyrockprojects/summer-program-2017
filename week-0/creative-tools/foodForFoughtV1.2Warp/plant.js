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
    strokeWeight(this.r/200 * this.r*0.75);
    stroke(127, 155, 225, 80) 
    fill(0,255,191, 200);    
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r); //TEACHING: place random(#) for ellipse to show how draw works
    pop();
    noStroke();
  } 
 
}
