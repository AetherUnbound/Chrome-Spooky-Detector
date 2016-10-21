function getText(){
    return document.body.textContent;
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

