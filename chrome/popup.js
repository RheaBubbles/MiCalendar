let btn = document.getElementById("btn");

btn.onclick = (element) => {
  chrome.tabs.executeScript({
    file: 'contentScript.js'
  });

  // chrome.tabs.create({
  //   url: chrome.runtime.getURL('panel.html'),
  //   active: true
  // });
  // get info from page

  // deal with these info

  // open the page
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, "runContentScript", function(response) {
  //     // console.log(response.farewell);
  //   });
  // });
}