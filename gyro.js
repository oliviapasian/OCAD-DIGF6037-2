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

let button;

function gyroscopeSetup()
{
    // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time

        button = createButton("Hi! My name is Milo. I love being social and going on walks! I want to make friends but I need help moving around. Can you help me?");
        button.style("font-size", "20px");
        button.style('font-family', "'dunbar-tall', sans-serif");
        button.style('white-space', 'normal');
        button.style('width', '100px');
        button.style("opacity", "50%");
        button.style("border", "none");
        button.style("background-color", "white");
        button.position(0,0);
        button.size(windowWidth,windowHeight);
        button.mousePressed( requestAccess );
    
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        console.log("yes");
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
  }
}


function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
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


// let permissionGranted = false;
// let prevRotX
// let prevRotY
// let prevRotZ
// let rotDX
// let rotDY
// let rotDZ
// let totalRot
// let isStable = false

// let button;

// function gyroscopeSetup()
// {
//     // DeviceOrientationEvent, DeviceMotionEvent
//   if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
//     // ios 13 device
    
//     DeviceOrientationEvent.requestPermission()
//       .catch(() => {
//         // show permission dialog only the first time

//         button = createButton("Hi! My name is Milo. I love being social and going on walks! I want to make friends but I need help moving around. Can you help me?");
//         button.style("font-size", "20px");
//         button.style('font-family', "'dunbar-tall', sans-serif");
//         button.style('white-space', 'normal');
//         button.style('width', '100px');
//         button.style("opacity", "50%");
//         button.style("border", "none");
//         button.style("background-color", "white");
//         button.position(0,0);
//         button.size(windowWidth,windowHeight);
//         button.mousePressed( requestAccess );
    
//         throw error;
//       })
//       .then(() => {
//         // on any subsequent visits
//         permissionGranted = true;
//       })
//   } else {
//     // non ios 13 device
//     button = createButton("Hi! My name is Milo. I love being social and going on walks! I want to make friends but I need help moving around. Can you help me?");
//     button.style("font-size", "20px");
//     button.style('font-family', "'dunbar-tall', sans-serif");
//     button.style('white-space', 'normal');
//     button.style('width', '100px');
//     button.style("opacity", "50%");
//     button.style("border", "none");
//     button.style("background-color", "white");
//     button.position(0,0);
//     button.size(windowWidth,windowHeight);
//     button.mousePressed( requestAccess );   
    
//     // permissionGranted = true;
//   }
// }


// function requestAccess() {
//   DeviceOrientationEvent.requestPermission()
//     .then(response => {
//       if (response == 'granted') {
//         permissionGranted = true;
//       } else {
//         permissionGranted = false;
//       }
//     })
//   .catch(console.error);
  
//   this.remove();
// }

// function updateGyroscopeData()
// {
//   totalRot = abs((rotationY - prevRotY)*100) + 
//       abs((rotationX - prevRotX)*100) +
//       abs((rotationZ - prevRotZ)*100)
  
//   prevRotY = rotationY
//   prevRotX = rotationX
//   prevRotZ = rotationZ
  
//   if (totalRot >= 8)
//     {
//       isStable = false
//     }
//   else
//     {
//       isStable = true
//     }
  
// }
// //End copy here****************************************************************
// // function draw()
// // {
// //   updateGyroscopeData()
// // }