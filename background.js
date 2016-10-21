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
        else if (msg.text == "Popup") {
            console.log("Connection to popup confirmed");
        }
        else
            console.log("Something went wrong, background");
    });
});

chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
    console.log("Sender " + sender);
    console.log("Request " + request.deatil);
    sendResponse({detail: "data"});
});


