window.onload = function() {
	
	chrome.extension.sendRequest({detail: "info"}, function handler(response) {
	    if (response == null) {
		console.log("Empty response");
		document.getElementById("spooks").innerHTML = "Empty response";
	    }
	    else if (response.detail == "active") {
		spookCount = response.count;
		document.getElementById("spooks").innerHTML = spookCount;
		if(spookCount == 0) {
			document.getElementById("spooky_stuff").style.display ='none';
			//document.getElementById("title").style.paddingTop = '75px';
		}
		else {
			document.getElementById("spooky_stuff").style.visibility='block';
			//document.getElementById("title").style.paddingTop = '25px';
		}
		console.log("good response");
	    }
	    else
		console.log("something went wrong in request response");
	});

	document.getElementById("play").addEventListener('click', function() {
		chrome.extension.sendMessage({action: "play"});
	});

	document.getElementById("stop").addEventListener('click', function() {
		chrome.extension.sendMessage({action: "stop"});
	});

	document.getElementById("pause").addEventListener('click', function() {
		chrome.extension.sendMessage({action: "pause"});
	});
}
