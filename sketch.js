/* Creation & Computation - Multiscreen

Stories and Rules：
- （ a user pick a costume, scan the QR code to open this APP, grants the access("adopt me") and turn on the speaker, and install their phone )
- ( they need to stand at certain marked location and find/wait for another user to stand at the related location )
- users' goal is to reach certain points within given time (e.g. 5 mins)
- [optional] they shake their phone to send out a pitch
- another user's phone recognize the pitch and start a "conversation"
- when the conversation ends, update the points
- [optional; test before decided] humans, who don't have the costume for their phone, should try to be taken photo by mimic the pitch of the phone
- users will be awarded or punished based on the human's behavior ( a riskier choice )
- By the end, if no one can reach the goal in time, who has the highest pointing win.
- (rewards: some decorations)


Reference
DEVICE Gyroscope by remarkability https://editor.p5js.org/remarkability/sketches/1D90zhu4a

*/

// settings

// let y=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // for test, but also cute
  console.log("Hello! My name is " + petName);

  // default settings
  noStroke();
  noFill();

}

function draw() {
  background(faceColour);
 
  // draw face
  // drawFace('initial');

  // for test
  drawFace("talking");
  // addPoints();
  countPoints();
  // checkPoints();
drawStatus(petStatus,points);


  // conversation face
  // if(isStarted()){
  // drawFace("talking");
  // }

 
}



/*
References:

*/
