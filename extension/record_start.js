
let eleId = 1000;

function addIds() {
  eleId = 1000;
  setTimeout(function() {
    document.body.childNodes.forEach(dfs);
  }, 500);
}

function dfs(element) {
  if (element.nodeType == 1) {
    element.setAttribute("auto", eleId++);
  }
  element.childNodes.forEach(dfs);
}
document.body.childNodes.forEach(dfs);
document.body.addEventListener('click', addIds);


let actionId = 0;

function sendAction(event) {
  const action = {};
  console.log(event);
  if (event.target.attributes.auto) {
    action.id = actionId++;
    action.auto = event.target.attributes.auto.nodeValue;
    action.name = event.target.nodeName;
    action.value = event.target.value;
    action.type = event.type;
    if (event.type === 'input') {
      action.data = event.data;
      action.inputType = event.inputType;
    }
    chrome.runtime.sendMessage(action);
  }
}

document.body.addEventListener('click', sendAction);
document.body.addEventListener('input', sendAction);
