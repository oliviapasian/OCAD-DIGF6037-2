/* This file is for different expressions, including:

- reactions to shake: 
    - if(initiateConversation) waiting;
    - if(isFaint) faint for 5 seconds (a punishment for player);

- reactions to touch // stage2

- reactions to human pitch:
    - tooLow: look down, face colour changes;
    - tooHigh: look up, face colour changes;
    - isCorrectPitch: eyes turn to camera and split a picture

- "conversation" mode:
    - if (isStarted): open mouth, show random squares/dots
    - while(isStarted && frameCount<conversationLength) time goes, the squares/dots disappear one by one; in the meantime, the eyes move around
    - if (isEnd): when all the dots gone, close mouth

- random expressions:
    - neutral
    - look around
    - shock // stage2
    - happy // stage2

*/

function drawFace(size, colour, blinkPause){
    console.log("hello,"+petName);
    
    // left eye
    this.x = 50;
    this.y = 60;
    this.blinkPause = random(200,300);
    this.rightEye = new eye(this.x + 20, y ,this.blinkPause);
    this.leftEye = new eye(this.x- 20, y,this.blinkPause);
    this.draw = function(){
      this.rightEye.draw();
      this.rightEye.blink();
      this.leftEye.draw();
      this.leftEye.blink()
      
    }

}

// draw eye; reference: https://editor.p5js.org/khamiltonuk/sketches/9LTXJPAoE
function eye(x, y, size, blinkPause){ 
  this.x = x;
  this.y = y;
  this.d = 30 // diameter of circle
  this.topLidY = this.y
  this.dy = 1
  this.distance = 0,
  this.angle = 0
  this.blinkPause = 0 // duration till next bink
  this.topLidYOrigin = this.y // original position before animation
  this.bottomLidY = this.y - this.d
  this.blink = function() {
    
    // decrement blink pause duration
    if(this.blinkPause > 0){
      this.blinkPause -= 1
      // return function to exit function early
      return
    }
    
      
    if(this.topLidY >= this.topLidYOrigin + this.d /2 ){
      this.blinkPause = blinkPause
      this.dy = -this.dy
    }else if(this.topLidY < this.topLidYOrigin){
      this.dy = -this.dy
    }
    
    // animate eyelids
    this.topLidY += this.dy
    this.bottomLidY -= this.dy;
  },
  this.draw = function(){
    // eye ball
    noStroke()
    fill("white")
    circle(this.x,this.y, this.d)
    
    // pupil
    push();
    fill("black")
    // distance from mouse to eyeball center
    this.distance = constrain(int(dist(this.x,this.y,mouseX,mouseY)), 0, height)
    // map distance value from mouse position over eyeball radius
    this.eyePos = map(this.d /3 , 0,500,0,this.distance )
    this.angle = atan2(mouseY - this.y, mouseX - this.x);
    translate(this.x, this.y);
    rotate(this.angle);
    // circle( distance from eye center, offset from angle, circe diameter)
    circle(this.eyePos, 0, this.d / 3);
    pop();
  
    // eye lids
    fill(250)
    // stroke("red") // for debugging
    rect(this.x - this.d/2, this.topLidY,  this.d, this.d)
    rect(this.x - this.d/2, this.bottomLidY,  this.d, this.d)
   
    // eyeliner
    noFill()
    strokeWeight(3)
    stroke("black")
    circle(this.x,this.y, this.d)

}
}

/*
References
eye movement https://editor.p5js.org/khamiltonuk/sketches/9LTXJPAoE
*/
