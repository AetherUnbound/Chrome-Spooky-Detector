document.addEventListener('DOMContentLoaded', function() {
    try{
    var allElements = document.getElementsByTagName("*");
    var spookCounter = 0;
    var sound = document.getElementById("spook_sound");
    var alltext = -1;
    }
    catch(err) {
        console.log("issue with declaring");
    }
    
    sound.load();

    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {ask: "getText"}, function(response) {
            //if(response.ask == "getText"){
            //    alltext = response.data;
            //}
            console.log(response);
        });
    });

    function play_audio(set) {
        if(set == 'play'){
            sound.play();
        }
        if(set == 'stop'){
            sound.pause()
            sound.currentTime = 0;
        }
    }

    console.log("Beginning spook loop");
    if(alltext !== -1) {
        console.log(alltext);
        //for (var i=0, max=allElements.length; i < max; i++) {
        //    if(allElements[i].innerText.indexOf("spooky") !== -1) {
        //        spookCounter++;
        //        document.getElementById("spooks").innerText = spookCounter;
        //        play_audio('play');
        //    }
        //}
    }
    else
        console.log("Text from extension not received");
});


