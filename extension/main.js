var xhr = new XMLHttpRequest();
xhr.onload = function() {
  if (this.status == 200 && this.responseText != null) {
    console.log(JSON.parse(this.responseText));
  }
}

let checkId = 0;
chrome.runtime.onMessage.addListener(function(action, sender, sendResponse) {
  console.log(action);
  // console.log(sender);
  if (action.id != checkId++) {
    console.error("Action is mssing! check:" + checkId + " actionId:" + action.actionId);
    return;
  }
  xhr.open("POST", "http://10.200.47.120:3000", true);
  xhr.send(action);
});




