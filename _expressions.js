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

// settings


function drawFace(eyeSeed,eyeColour,eyeShadeColour,blinkPause){

    // settings
    let
    eyeSize = windowHeight*0.4+eyeSeed*5,
    margin = windowWidth*0.1 + eyeSize/2,
    leftEyeX = margin,
    leftEyeY = windowHeight*0.45,
    rightEyeX = windowWidth-margin,
    rightEyeY = leftEyeY;

    // draw eyes
  
    // drawEyeShade(leftEyeX, leftEyeY, eyeShadeColour, eyeSize);
    drawEye(leftEyeX, leftEyeY, eyeSize, blinkPause,45);    
    // drawEyeShade(rightEyeX, rightEyeY, eyeShadeColour, eyeSize);
    drawEye(rightEyeX, rightEyeY, eyeSize, blinkPause, -45);
  

    // draw mouth
    drawMouth();


    // left eye
    // this.x = windowWidth/2;
    // this.y = windowHeight/2;
    // this.blinkPause = random(200,300);
    // this.rightEye = new eye(windowWidth*95% - size/2, y ,this.blinkPause);
    // this.leftEye = new eye(windowWidth*5% + size/2, y,this.blinkPause);
    // this.draw = function(){
    //   this.rightEye.draw();
    //   this.rightEye.blink();
    //   this.leftEye.draw();
    //   this.leftEye.blink()
    // }

}

//
function drawEyeShade(x,y,colour,eyeSize){
  push();
  fill(colour);
  translate(x,y);
  ellipse(0, eyeSize*0.2, eyeSize*1.1, eyeSize*1.3);
  pop();
}

// draw mouth
function drawMouth(){

}

// draw eye
function drawEye(x,y,size,blinkPause, angle){
  push();
  translate(x,y);
  rotate(angle);
  drawEyeShade(0,0,eyeShadeColour, size);
  drawEyeBall(0,0,eyeColour, size, blinkPause);
  pop()
}

// draw eye; reference: https://editor.p5js.org/khamiltonuk/sketches/9LTXJPAoE
function drawEyeBall(x, y, colour, size, blinkPause){
  let ballSize = size * 0.8, eyeLineWidth = 4+1*eyeSeed;

  function eyeClip(){
    circle(0,0,size);
  }
  // eye bg
  push();
  fill(255);
  circle(x,y,size);
  pop();

  // eye ball
  push();
  fill(colour);
  circle(x,y,ballSize);
  circle();
  pop();

  // eye lids
  push();
  translate(x,y);
  clip(eyeClip);
  
  // eye lid - top  
  fill(faceColour);
  rect(-size/2-eyeLineWidth,-size/2-eyeLineWidth,size+eyeLineWidth*2,size*0.6);
    
  // eye lid - bottom
  fill(eyeShadeColour); 
  rect(-size/2-eyeLineWidth,0,size+eyeLineWidth*2,size*0.6);
  
  // fill(230);
  // eyeClip();

  pop();

    // eye lines
    push();
    stroke(colour);
    strokeWeight(eyeLineWidth);
    circle(x,y,size);
    pop();

}


function eye(x, y, size, blinkPause){
  this.x = x;
  this.y = y;
  this.size = size;
  this.d = size // diameter of circle
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
References:
- touch: https://editor.p5js.org/npuckett/sketches/Kn_WL5OCt
- eye movement: https://editor.p5js.org/khamiltonuk/sketches/9LTXJPAoE
*/
