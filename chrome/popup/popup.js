// check the school is chosen
chrome.storage.local.get(['school'], function(result) {
  let btn = document.getElementById("btn");
  btn.onclick = (element) => {
    chrome.tabs.executeScript({
      file: 'parses/hit/parse.js'
    });
  }
  // if(typeof result.school == "undefined") {
  //   // if not chose, just show you-should-choose-firstly page
  // } else {
  //   // if is chosen, get the message and change the popup
  //   btn.onclick = (element) => {
  //     chrome.tabs.executeScript({
  //       file: 'parses/hit/parse.js'
  //     });
  //     // chrome.tabs.create({
  //     //   url: chrome.runtime.getURL('panel/panel.html'),
  //     //   active: true
  //     // });
  //     // get info from page
    
  //     // deal with these info
    
  //     // open the page
  //     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     //   chrome.tabs.sendMessage(tabs[0].id, "runContentScript", function(response) {
  //     //     // console.log(response.farewell);
  //     //   });
  //     // });
  //   }
  // }
});





