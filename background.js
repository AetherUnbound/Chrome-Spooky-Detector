var activeTab = 0;

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
    console.log("Request " + request.deatil);
    sendResponse({detail: "active", active: activeTab});
});

//Listener for when the active tab is switched
chrome.tabs.onActivated.addListener(function(active) {
	activeTab = active.tabId;
	console.log("Tab ID " + activeTab);
	chrome.tabs.sendMessage(activeTab, {detail: "DOM"}, function(body) {
		console.log("Body \n" + body);
	});
});
