function getText(){
    return document.body.innerText
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Before gettext");
        if(request.ask == "getText"){
            sendResponse({data: document.all[0].innerText, ask: "getText"});
        }
        else {
            sendResponse("nothing here");
            console.log("listener didn't receive gettext");
        }
        return true;
    }
);
