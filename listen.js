//   NOTE_CS6: 1109,
//   NOTE_FS6: 1480,
//   NOTE_C7: 2093,
/*
	pitch detector in p5.js
	Listens to the microphone, displays the loudest pitch
	waveform drawing routine comes from the p5.FFT example.
	created 15 Nov 2018
	by Tom Igoe
*/



//Settings

let sampleSize = 300;
let threshold = 50;
let keyFreq = [0,1,2]



let mic; // an object for the microphone input
let fft; // an object for the FFT frequency analyzer
// a list of standard pitches:
let spectrum
let envirnmentalAvg = []
let listenClosed = false;

let pitches = [1109, 1480, 2093];


function takeEnv(ftt_p)
{
   spectrum = fft.analyze();
  //print(envirnmentalAvg)
  for(let i = 0; i < pitches.length; i++)
    {
      envirnmentalAvg[i].push(ftt_p.getEnergy(pitches[i]))
      if (envirnmentalAvg[i].length >= sampleSize)
        {
          envirnmentalAvg[i].shift()
        }
      
    }
  
}

function getArrayAvg(targetArray) 
{
  let sum = 0;
  for (let i = 0; i < targetArray.length; i++) {
    sum += targetArray[i];
  }
  return sum / targetArray.length;
}

function listenSetup()
{
  
  
  mic = new p5.AudioIn()
  fft = new p5.FFT();
  mic.start();
  fft.setInput(mic);
  
  //initialize Env Array
  for(let i = 0; i < pitches.length; i++)
    {
      envirnmentalAvg[i] = []
    }
}

function listen()
{
  if(listenClosed == true)
    {
      return []
    }
  takeEnv(fft)
  let temp = []
  let tempValue = []
  let highest = 0;
  let highestTemp = 0;
  let result = []
  for( let i = 0; i < keyFreq.length; i++)
    {
      if(fft.getEnergy(pitches[keyFreq[i]]) - getArrayAvg(envirnmentalAvg[keyFreq[i]]) > threshold)
        {
          temp.push(pitches[keyFreq[i]])
          tempValue.push(fft.getEnergy(pitches[keyFreq[i]]) - getArrayAvg(envirnmentalAvg[keyFreq[i]]))
        }
    
    }
  
  for (let i = 0; i < temp.length; i ++)
    {
      if (tempValue[i] > highest)
        {
          highest = tempValue[i]
          highestTemp = temp[i]
        }
    }
  
  // if(highestTemp == selfTone)
  //   {
  //     highestTemp = 0
  //   }
  if (highestTemp != 0)
  {
    result.push(highestTemp)
  }
  return result
}
