//convoTimeLeft add to convoTimeLeft to make it talk

let convoTimeLeft = 0;
let convooscPlaying = false;
let toneChangeTime = 80;
let toneChangeTimer = 0;
let maxPitch = 2000;
let minPitch = 1000;
let convoosc;
function conversationSetup()
{
  convoosc = new p5.Oscillator('sine');
  convoosc.freq(1100); // Set frequency to 440 Hz (A4)
  // ConversationTimeVariation = random(0, ConversationTimeVariation)
}
function updateConversation()
{//run this in draw()
  if(convoTimeLeft > 0 && convooscPlaying == false)
    {
      convoosc.start()
      convooscPlaying = true
      toneChangeTime = ConversationMainSpeed + random(-ConversationSpeedVariation, ConversationSpeedVariation)
    }
  else if (convoTimeLeft > 0 && convooscPlaying == true)
    {
      convoTimeLeft -= deltaTime
      toneChangeTimer += deltaTime
      if(toneChangeTimer >= toneChangeTime)
        {
          toneChangeTimer -= toneChangeTimer
          convoosc.freq(ConversationMainPitch + random(-ConversationPitchVariation, ConversationPitchVariation))
        }
    }
  if(convoTimeLeft - ConversationTimeVariation <= 0)
    {
      convoosc.stop()
      convooscPlaying = false
    }

}
