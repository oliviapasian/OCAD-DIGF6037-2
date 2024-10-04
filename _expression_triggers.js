/* This file is for expression triggers, including:

- shake to start: 
    - one or a few shake: initiateConversation ;
    - too many shake: isFaint;

- reactions to touch // stage2

- "conversation" mode:
    - if () (isStarted): open mouth, show random squares/dots
    - while(isStarted && frameCount<conversationLength) time goes, the squares/dots disappear one by one; in the meantime, the eyes move around
    - if (isEnd): when all the dots gone, close mouth

- take picture:
if (isCorrectPitch) {
    take picture
    store(??) // not sure about this
    return picturePath
}

*/