chrome.extension.sendRequest({detail: "info"}, function handler(response) {
    if (response == null) {
        console.log("Empty response");
        document.getElementById("spooks").innerHTML = "Empty response";
    }
    else if (response.detail == "data") {
        document.getElementById("spooks").innerHTML = "test";
        console.log("good response");
    }
    else
        console.log("something went wrong in request response");
});
