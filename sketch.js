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


let selfTone = 1109;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // for test, but also cute
  console.log("Hello! My name is " + petName);

  // default settings
  noStroke();
  noFill();
  gyroscopeSetup();

  listenSetup();
  
  osc = new p5.Oscillator('sine');
  osc.freq(selfTone);
  
  CDToBeep = random(1000,5000)
  patient = random()
  osc.start()
}
let CDToBeep
let permissionGrant = false;
let lastStableTime = 0;
let inStableCooldown = false;

let secondsUntilListen = 1000;

let matchingMode = false;
let matched = false;
let soundPlayed = false;

let timeEnteredMatchingMode = 0;



let lastUnstableTime = 0;
let stableTimeBeforeListen = 1000;
let selfIdentified = false;
let identifiedCounter = false;
let identifiedFrequency;
let identifiedTime = 0;

//personality traits
let patient = 0;

let pairingSuccess = false;

let matchedPet = []

let talkStartTime = 0;
let talkTime = 1000;

let surrounding ;
function draw() {
  background(255);
  updateGyroscopeData()
  checkTalkTime()
  fill(0)
  stroke(8)
  text("Stable:" + str(isStable), 0, 50)
  text("Paired:" + str(pairingSuccess), 0, 100)
  text("TalkStartTime：" + str(talkStartTime), 0, 150)
  text("Identified Countr：" + str(identifiedCounter), 0, 200)
  text("Identified self: " + str(selfIdentified), 0, 250)
  text("Counter Frequency：" + str(matchedPet), 0, 300)
  
  if (isStable == false && pairingSuccess == false)
    //Not paired and not stable // for when moving, the conversation ended successfully
    {
      lastUnstableTime = millis()
    }
  if (isStable == true && pairingSuccess == false)
    //pairing sequence
    {
      if(identifiedCounter == false && millis() - lastUnstableTime > stableTimeBeforeListen)
        {
          identifiedFrequency = listen()
          if(identifiedFrequency.length != 0)
          {
            for (let i = 0; i < identifiedFrequency.length; i++)
              {
                matchedPet.push(identifiedFrequency[i])
              }
            identifiedCounter = true;
            identifiedTime = millis()

          }
        }
      
      if(millis() - lastUnstableTime > stableTimeBeforeListen + CDToBeep && selfIdentified == false && identifiedCounter == false)
        // if is stable for 1 seconds + a random time between 1 - 3 seconds
        {
          if(talkStartTime == 0)
            {
              talk(1,talkTime)
            }
          talkStartTime = millis()
          
          selfIdentified = true;
        }
      else if(millis() - lastUnstableTime > identifiedTime + 1000 && selfIdentified == false && identifiedCounter == true)
        {
          if(talkStartTime == 0)
            {
              talk(1,talkTime)
            }
          talkStartTime = millis()
          
          selfIdentified = true;
          
        }
      if(selfIdentified == true && identifiedCounter == true)
        {
          pairingSuccess = true
          //NOW we run code for seudo talk
        }
    }
  
  if (isStable == true && pairingSuccess == true)
    //paired up and talk // For when talking in stationary position
    {
      
    }
  if (isStable == false && pairingSuccess == true)
    //when moved away in the middle of conversation, be MAD!!!!!
    {
      
    }
}
