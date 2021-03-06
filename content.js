window.onload = function() {

	function calculateSpooks() {
		var text = String(document.body.innerText);
		return (text.match(/spook/ig) || []).length;
	}

	var port = chrome.runtime.connect({name: "DOM_retrieval"});

	console.log("Port initialized");
	port.postMessage({text: "Connecting"});
	port.onMessage.addListener(function(msg) {
	    if (msg.text == "Listening") {
		console.log("Connected");
		port.postMessage({text: "Confirmed"});
	    }
	    else
		console.log("Something went wrong, content");
	});

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		console.log(sender.tab ? "Message from somewhere else" : "Message from extension");
		if (request.detail == "DOM") {
			sendResponse(document.body.innerText);
		}
		else if (request.detail == "count") {
			spookCount = calculateSpooks();
			console.log(spookCount);
			sendResponse(spookCount);
		}
		else{
			console.log("Request detail mismatch");
		}
	});
	
}
