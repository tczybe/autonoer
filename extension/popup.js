let recordStart = document.getElementById("recordStart");
let recordStop = document.getElementById("recordStop");

recordStart.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: "record_start.js"}
    );
  });
}

recordStop.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: "record_stop.js"}
    );
  });
}