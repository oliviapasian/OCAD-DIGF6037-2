

let osc; // Oscillator
let startTalkTime = 0
let talkDuration = 0
function talk(index, duration_l)
{
  let pets = []
  talkDuration = duration_l
  startTalkTime = millis()
  osc.start();  

}

function checkTalkTime()
{
  if( millis() - startTalkTime > talkDuration)
    {
      osc.stop();
    }
}
