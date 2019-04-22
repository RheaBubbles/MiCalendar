// check the school is chosen
chrome.storage.local.get(['school'], function(result) {
  let btn = document.getElementById("btn");
  if(typeof result.school == 'undefined') {
    // no chosen
    btn.onclick = (element) => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('options/options.html'),
        active: true
      });
    };
  } else {
    btn.onclick = (element) => {
      chrome.tabs.executeScript({
        file: `parses/${result.school.folder_name}/parse.js`
      });
    };
  }
});