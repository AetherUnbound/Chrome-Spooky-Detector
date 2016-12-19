window.onload = function() {
	
	chrome.extension.sendRequest({detail: "info"}, function handler(response) {
	    if (response == null) {
		console.log("Empty response");
		document.getElementById("pumpkins").innerHTML = "Empty response";
	    }
	    else if (response.detail == "active") {
		gourdCount = response.count;
		console.log("Response count" + gourdCount);
		document.getElementById("pumpkins").innerHTML = gourdCount;
		if(gourdCount == 0) {
			document.getElementById("frighty_stuff").style.display ='none';
			//document.getElementById("title").style.paddingTop = '75px';
		}
		else {
			document.getElementById("frighty_stuff").style.visibility='block';
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

	document.getElementById("increase").addEventListener('click', function() {
		document.getElementById("frighty_stuff").style.animationDuration = "0.5s";
		document.getElementById("david").style.animationDuration = "0.5s";
	});
}
