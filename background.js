window.onload = function() {
	var activeTab = 0;
	var spookCount = 0;
	var stoppedTabs = {};

	try{
		var allElements = document.getElementsByTagName("*");
		var sound = document.getElementById("spook_sound");
	}
	catch(err) {
		console.log("issue with declaring");
	}

	function playSound() {
		if(stoppedTabs[activeTab] === undefined)
			sound.play();
		else
			pauseSound();
	}

	function pauseSound() {
		sound.pause();
	}

	function stopSound() {
		stoppedTabs[activeTab] = 1;
		sound.pause();
		sound.currentTime = 0;
	}

	function setVolume(count) {
		volume = 0;
		if (count < 25)
			volume = count/25;
		else 
			volume = 1;
		sound.volume = volume
		console.log("Volume: " + volume);
	}

	function getSpooks(activeTab, play = true) {
		chrome.tabs.sendMessage(activeTab, {detail: "count"}, function sendResponse(count) {
			if(count != null) {
				console.log("Number of spooks on page: " + count + ", " + play);
				spookCount = count;
				if(play){
					if (spookCount > 0) {
						setVolume(spookCount);
						playSound();
					}
					else
						pauseSound();
				}
			}
			else {
				console.log("Unregistered tab, pausing");
				pauseSound();
				spookCount = 0;
			}
		});
	}

	//Listener for the connection call from the content script
	chrome.runtime.onConnect.addListener(function(port) {
	    console.log("Port name: " + port.name);
	    port.onMessage.addListener(function(msg) {
		if (msg.text == "Connecting") {
		    console.log("Opening connection received");
		    port.postMessage({text: "Listening"});
		}
		else if (msg.text == "Confirmed") {
		    console.log("Connection confirmed, good to go!");
		}
		else
		    console.log("Something went wrong, background");
	    });
	});

	//Listener for when popup.js requests something
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		console.log("Sender " + sender);
		console.log("Request " + request.detail);
		getSpooks(activeTab, false);
		console.log("Sent body " + spookCount);
		sendResponse({detail: "active", active: activeTab, count: spookCount});
	});

	//Listener for when the active tab is switched
	chrome.tabs.onActivated.addListener(function(active) {
		activeTab = active.tabId;
		console.log("Tab ID " + activeTab);
		getSpooks(activeTab);

	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		getSpooks(tabId);
	});


	chrome.extension.onMessage.addListener( function(request, sender) {
		if(request.action == "play") {
			playSound();
		}
		else if (request.action == "stop") {
			stopSound();
		}
		else if (request.action == "pause") {
			pauseSound();
		}
		else
			console.log("Unrecognized action");
	});

}
