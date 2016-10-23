window.onload = function() {
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


	//function play_audio(set) {
	//    if(set == 'play'){
	//	    if(sound.paused){
	//		    sound.play();
	//	    }
	//    }
	//    if(set == 'stop'){
	//	sound.pause()
	//	sound.currentTime = 0;
	//    }
	//}
	function playSound() {
		setTimeout(function() {
			sound.play();
		}, 150);
	}

	function stopSound() {
		setTimeout(function() {
			sound.pause();
			sound.currentTime = 0;
		}, 150);
	}

	//compliance with chrome's extension CSP
	document.getElementById("play").addEventListener('click', playSound);
	document.getElementById("stop").addEventListener('click', stopSound);

	chrome.extension.sendRequest({detail: "info"}, function handler(response) {
	    if (response == null) {
		console.log("Empty response");
		document.getElementById("spooks").innerHTML = "Empty response";
	    }
	    else if (response.detail == "active") {
		document.getElementById("spooks").innerHTML = response.count;
		console.log("good response");
		sound.play();
	    }
	    else
		console.log("something went wrong in request response");
	});
}
