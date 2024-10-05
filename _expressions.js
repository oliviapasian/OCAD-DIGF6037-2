/* This file is for different expressions, including:

- initial

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


function drawFace(expression) {
  // settings  


  // draw eyes
  drawEye(leftEyeX, leftEyeY, eyeSize, 45,expression);
  drawEye(rightEyeX, rightEyeY, eyeSize, -45,expression);

  // draw mouth
  drawMouth(expression);
};


// draw eye
function drawEye(x, y, size, angle) {
  push();
  translate(x, y);
  rotate(angle);
  drawEyeShade(0, 0, eyeShadeColour, size);
  drawEyeBall(0, 0, eyeColour, size);
  pop()
}

function drawEyeShade(x, y, colour, eyeSize) {
  push();
  fill(colour);
  translate(x, y);
  ellipse(0, eyeSize * 0.2, eyeSize * 1.1, eyeSize * 1.3);
  pop();
}

// draw eye
function drawEyeBall(x, y, colour, size) {
  // let ballSize = size * 0.8, eyeLineWidth = 4 + 1 * eyeSeed;

  push();
  translate(x, y);

  // eye bg
  fill(255);
  circle(0, 0, size);

  // eye ball  
  fill(colour);
  circle(0, 0, ballSize);
  pop();

  //eye lids blinking
  push();
  // mask the lids
  clip(eyeClip);
  // eye lid - top

  // counting down the pause
  if (blinkTimer > 0) {
    blinkTimer--;
  }

  // if count to 0, start to blink
  if (blinkTimer == 0) {

    // set the position
    eyeLidTopPosY += blinkSpeed * direction;
    eyeLidBottomPosY -= blinkSpeed * direction;

    // if closed, change the movement direction
    if (eyeLidTopPosY >= eyeLidTopClosePosY) {
      direction = -direction;
    }

    // draw the eye lids
    fill(faceColour);
    rect(-eyeLidWidth / 2, eyeLidTopPosY, eyeLidWidth, eyeLidHeight);
    fill(eyeShadeColour);
    rect(-eyeLidWidth / 2, eyeLidBottomPosY, eyeLidWidth, eyeLidHeight);

    // if the lids are back to open position, reset the lids, pause and direction 
    if (eyeLidTopPosY <= eyeLidTopOpenPosY) {
      blinkTimer = blinkPause;
      eyeLidTopPosY = eyeLidTopOpenPosY;
      eyeLidBottomPosY = eyeLidBottomOpenPosY;
      direction = -direction;
    }
  }
  pop();

  // eye lines
  push();
  stroke(colour);
  strokeWeight(eyeLineWidth);
  circle(x, y, size);
  pop();

  // define the mask 
  function eyeClip() {
    fill(100);
    circle(0, 0, size);
  }

}

// draw mouth
function drawMouth(expression) {
  push();
  strokeWeight(mouthThickness);
  stroke(eyeColour);
  fill(faceColour.map(a=>constrain(a-50,128,255)));

  switch (expression){
  case "initial":
    ellipse(windowWidth / 2, windowHeight * 0.75, mouthWidth-mouthHeight*1, mouthInitialHeight);

  case "talking":
  if (mouthTimer > 0) {
    mouthTimer--;
    ellipse(windowWidth / 2, windowHeight * 0.75, mouthWidth-mouthHeight*1, mouthHeight);
  } 
  
  if (mouthTimer == 0) {
    mouthHeight = round(random(10, 60));
    mouthTimer = constrain(mouthPause - round(random(1, 30)), 5, 60); 
    console.log(mouthTimer);
  }
  ellipse(windowWidth / 2, windowHeight * 0.75, mouthWidth-mouthHeight*1, mouthHeight);
  break;

  }
  pop()
}



/*
References:
- touch: https://editor.p5js.org/npuckett/sketches/Kn_WL5OCt
- eye movement: https://editor.p5js.org/khamiltonuk/sketches/9LTXJPAoE
*/
