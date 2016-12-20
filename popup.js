window.onload = function() {
	
	chrome.extension.sendRequest({detail: "info"}, function handler(response) {
	    if (response == null) {
		console.log("Empty response");
		document.getElementById("santas").innerHTML = "Empty response";
	    }
	    else if (response.detail == "active") {
		santaCount = response.count;
		console.log("Response count" + santaCount);
		document.getElementById("santas").innerHTML = santaCount;
		if(santaCount == 0) {
			document.getElementById("santa_stuff").style.display ='none';
			//document.getElementById("title").style.paddingTop = '75px';
		}
		else {
			document.getElementById("santa_stuff").style.visibility='block';
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

	document.getElementById("snow").addEventListener('click', function() {
		chrome.extension.sendMessage({action: "toggleSnow"});
	});
}
