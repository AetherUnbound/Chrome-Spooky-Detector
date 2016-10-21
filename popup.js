chrome.extension.sendRequest({detail: "info"}, function handler(response) {
    if (response == null) {
        console.log("Empty response");
        document.getElementById("spooks").innerHTML = "Empty response";
    }
    else if (response.detail == "active") {
        document.getElementById("spooks").innerHTML = response.active;
        console.log("good response");
    }
    else
        console.log("something went wrong in request response");
});
