console.log("background running");
chrome.tabs.onActivated.addListener(function(tab){
    let message = {msg:"fetchWords"};
    chrome.tabs.sendMessage(tab.tabId, message);


    // chrome.tabs.get(tab.tabId, current_tab_info => {
    //     console.log("yo");
    //     console.log(current_tab_info.url);
    //     // let message = {msg:"fetchWords"};
    //     // chrome.tabs.sendMessage(tab.tabId, message);
    // })
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request.msg);
    console.log(sender);
    if(request.msg == "incog"){
        chrome.windows.create({"url": sender.url, "incognito": true});
    }
});
