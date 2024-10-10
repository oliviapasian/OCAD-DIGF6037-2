// for test only


//
function drawStatus(status, points){
    push();
    fill(50);
    switch (status){
        case "win":
            text("I am sooo HAPPY!", windowWidth/2, 60);
            break;
        case "sad":
            text("My heart was just broken.", windowWidth/2, 60);
            break;
        default:
            text(points, windowWidth/2, 60)
    }
    pop();
}