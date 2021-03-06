let schools = [];

chrome.runtime.onInstalled.addListener(
  function() {
    // load the parses to storage when it is installed
    chrome.runtime.getPackageDirectoryEntry(function(root) {
      // console.log(root);
      root.getDirectory('parses', {}, function(dir) {
        // console.log(dir);
        let dirReader = dir.createReader();
        dirReader.readEntries(function(results) {
          // console.log(results);
          for(let school_dir of results) {
            // console.log(school_dir);
            let info;
            school_dir.getFile('info.json', {}, function(fe) {
              fe.file(function(file) {
                // console.log(file);
                let reader = new FileReader();
                reader.onload = (event) => {
                  // console.log(event.target.result);
                  info = JSON.parse(event.target.result);
                  // console.log(info);
                  schools.push(info);
                };
                reader.readAsText(file);
              });
            });
          }
        });
      });
    });
  }
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.msg == "initSchools"){
      if(schools.length > 0) {
        chrome.storage.local.set({'schools': schools});
        sendResponse(schools);
      } else {
        sendResponse(schools);
      }
    } else if (request.msg == "openPanelPage") {
      chrome.storage.local.set({
        'courses': request.courses,
        'error':  request.error
      }, function() {
        chrome.tabs.create({
          url: chrome.runtime.getURL('panel/panel.html'),
          active: true
        });
      });
    } else if(request.msg == "checkPopup") {
      chrome.storage.local.get(['school'], function(result) {
        if(typeof result.school == 'undefined') {
          // no chosen
          chrome.browserAction.setPopup({popup: `popup/popup.html`});
        } else {
          chrome.browserAction.setPopup({popup: `parses/${ result.school.folder_name }/popup.html`});
        }
      });
    }
 });