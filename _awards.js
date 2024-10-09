/* This file is for awarding system, including:

- an array to store points 

- conversation among phones: 
    - recognize pitch: start timer, + initial points;
    - end pitch: stop timer, calculate time, + points based on length

- conversation with human:
    - recognize pitch: take a picture, + a big bonus points (to be discussed)
    - too loud: - points ( a punishment for owner to drive them away from human)
    - too many times of errors: refuse to listen for 30 seconds

- calculate the points every time the array updates, if reach certain points, win

*/

// for test 
// function sentPitch(){
//     return true
// }
// function receivedPitch(){
//     return true
// }
// function tellPitch(){
//     return "E5"
// }

// 
function addPoints(){
    if ( sentPitch() && receivedPitch() && tellPitch() ){
        let pitch = tellPitch();
        if (pitch == pitches[petID] && isHuman()){
          pointRecordForHuman += rewardForHuman;
        }else if (pitches.includes(pitch)){
            if( !isStarted()){ 
            pointRecordForPets += rewardForNewPet; 
        }else{
            pointRecordForPets += rewardForConversation; 
        }       
        }  
        return true
        }
        
}

// 
function countPoints(){
    pointRecordForPets.forEach((p)=>points+=p);
    points+=pointRecordForHuman;      
}

//
function checkPoints(){
    let status;
if(points>=goal){
    status = "win";
}else if (points<0){
    status = "sad";
}else{
    status = "counting"
}
}
