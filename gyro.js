//must include functions: gyroscopeSetup, requestAccess()
//must include variables: permissionGranted, prevRotX, prevRotY, prevRotZ, rotDX, rotDY, rotDZ, totalRot

// function setup() {
//   gyroscopeSetup()
// }

//Start copy from here**********************************************************

let permissionGranted = false;
let prevRotX
let prevRotY
let prevRotZ
let rotDX
let rotDY
let rotDZ
let totalRot
let isStable = false
let allowPermission;

function gyroscopeSetup()
{
    // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        allowPermission = select('.sensorAccessButton');
        allowPermission.mousePressed(requestAccess);
        // button.center();
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    // textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
        allowPermission.remove();
        document.getElementById("infoPanel").style.display = "none";
        } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);
  
  this.remove();
  
}

function updateGyroscopeData()
{
  totalRot = abs((rotationY - prevRotY)*100) + 
      abs((rotationX - prevRotX)*100) +
      abs((rotationZ - prevRotZ)*100)
  
  prevRotY = rotationY
  prevRotX = rotationX
  prevRotZ = rotationZ
  
  if (totalRot >= 8)
    {
      isStable = false
    }
  else
    {
      isStable = true
    }
  
}
//End copy here****************************************************************
// function draw()
// {
//   updateGyroscopeData()
// }

