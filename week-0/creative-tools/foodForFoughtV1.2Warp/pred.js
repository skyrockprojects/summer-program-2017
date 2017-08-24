// pred construct

function Pred(x, y) {
  // The setup ()
  this.position = createVector(x, y);
  this.r = Math.random() * 5 + 15;
  this.maxspeed = 3;    // Maximum seek
  this.maxburst = 3;    // Pursue speed burst
  this.maxforce = 0.2;  // Maximum steering force
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.targdists = []; // array of target distances
  
  this.flowMem = createVector(0, 0);
  this.deathstarve = 0;

  this.applyBehaviors = function(preds) { 
    var separateForce = this.separate(preds);
    var seekForce = this.seek(vegans); 
    var pursueForce = this.pursue(vegans); 
    var flowForce = this.flow(flow);

    separateForce.mult(1);
    seekForce.mult(1);
    pursueForce.mult(5);
    flowForce.mult(5);

    this.applyForce(separateForce); 
    this.applyForce(seekForce);
    this.applyForce(pursueForce);
    this.applyForce(flowForce);

    //"eat" vegan - grow pred - shrink vegan 
    if(vegans.length > 0){
      if(this.targdists[this.closesttarg] < vegans[this.closesttarg].r*0.5){
        this.r += 1;
        vegans[this.closesttarg].r -= 2;
        vegans[this.closesttarg].isattacked = true;
      } else{
        this.r -= 0.02; //SHRINKS each frame doesn't "eat"
        vegans[this.closesttarg].isattacked = false;
      }
    }
    if(vegans.length == 0){
      this.r -= 0.02;
    }   
    this.r = Math.max(0, Math.min(this.r, 75)); // TEACH: embedded function returns maximum number[] of minimum number[]
  }
  

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  this.separate = function(preds) { 
    var desiredseparation = this.r + 20;
    var sum = createVector();
    var count = 0;
    // For every agent in the system, check if it's too close
    for (var i = 0; i < preds.length; i++) {
      var dist = p5.Vector.dist(this.position, preds[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((dist > 0) && (dist < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, preds[i].position);
        diff.normalize();
        diff.div(dist);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.div(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.mult(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

   // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(vegans) {
    var steer = createVector(0, 0);
    
    //Teach: Make sure there are vegans to seek - otherwise causes crash if vegans all die
    if (vegans.length > 0){
      //create array of prey distances
      this.closesttarg = 0;
      for (var j = 0; j < vegans.length; j++){  
        this.targdists[j] = p5.Vector.dist(this.position, vegans[j].position)
        // find the lowest distance starting with [0] and swap and return
        
        if (this.targdists[j] < this.targdists[this.closesttarg]) {
          this.closesttarg = j; 
        } 
      }

      var desire = p5.Vector.sub(vegans[this.closesttarg].position, this.position);  // A vector pointing from the location to the target
      // Normalize desired and scale to maximum speed
      desire.normalize();
      desire.mult(this.maxspeed);
      // Steering = Desired minus velocity
      steer = p5.Vector.sub(desire, this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
      
    }
    return steer; // TEACH: place here so it doesn't break loop!
  }

  this.pursue = function(targets) { 
    var pursuedist = 120;
    var chase = createVector(0, 0);
    
    if (vegans.length > 0){
      if(this.targdists[this.closesttarg] < pursuedist){
        
        // Predict where the prey will run to: Target Position + Target Velocity * distance (scalar shrinks as we get closer, eliminates error of "chasing ghost")
        var predict = createVector(vegans[this.closesttarg].position.x + vegans[this.closesttarg].velocity.x * this.targdists[this.closesttarg], vegans[this.closesttarg].position.y + vegans[this.closesttarg].velocity.y * this.targdists[this.closesttarg]);

        var gopredict = p5.Vector.sub(predict, this.position);
        
        gopredict.limit(this.maxforce*5); // better here instead of normalizing due to variance of prediction locations
        //gopredict.mult(this.maxburst);
        chase.add(gopredict);
        
      } 
    }
    return chase;
  }
  
this.flow = function() {
    // What is the vector at that spot in the flow field?
    var desired = lookup(this.position.x, this.position.y);
    desired.normalize();
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);

    // Steering is desired minus velocity
    this.flowMem.add(desired);
    
    var steered = this.velocity.add(desired);
    steered.limit(this.maxforce);  // Limit to maximum steering force
  
    return steered;
  }

  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    //this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);

    this.flowMem.mult(0.9); //simulate lasting effect of the CV "hit"

    if (Math.abs(this.flowMem.x) && Math.abs(this.flowMem.y) <= 0.1 ) {
      this.flowMem.mult(0);
    }

    this.acceleration.add(this.flowMem);
    this.acceleration.mult(2); 
  }

  this.display = function() {
    strokeWeight(this.r*0.4)
    stroke(100,0,255, 80)
    fill(230, 10, 50, 250);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
    noStroke();
  }
 
  //wrap-around
  this.borders = function() { 
    if (this.position.x < -this.r) this.position.x = width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x > width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }

  this.isDead = function () { //Task: Have students add life time counter--
     //die
    if(this.r < 1){
      //preddeathstarve++;
      return true;    
    } else {
      return false;
    }
  }

  this.reproduce = function() {
       //reproduce
      if(this.r > 20){
        this.r = 15; //shrink after "birth" -- raise/lower for spawn control!
        return true;
      } else {
        return false;
      }
    }

  
}
