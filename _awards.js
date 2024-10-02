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