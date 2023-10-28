var count = 0
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    if (!removeInfo.isWindowClosing){
    chrome.tabs.query({}, function (tabs) {
        if (tabs.length>0){
        var tabsArray = [];
        tabs.forEach((e)=>{
            tabsArray.push(e.url)
        })
        chrome.storage.local.set({ tabs: tabsArray });
        }else{
            count = 0 
        }
    })
    }else{
        count = 0
    }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (count!=0){
    chrome.tabs.query({}, function (tabs) {
        if (tabs.length>0){
        var tabsArray = [];
        tabs.forEach((e)=>{
            tabsArray.push(e.url)
        })
        chrome.storage.local.set({ tabs: tabsArray });
        }
    })
    }
})

chrome.tabs.onCreated.addListener((tabId, selectInfo) => {
    if (count!=0){
    chrome.tabs.query({}, function (tabs) {
        if (tabs.length>1){
            count++
        }
        if (tabs.length>0){
        var tabsArray = [];
        tabs.forEach((e)=>{
            tabsArray.push(e.url)
        })
        tabsArray.slice(0, -1);
        chrome.storage.local.set({ tabs: tabsArray });
        }
    })
    }else{
        chrome.tabs.query({}, function (tabs) {
            if (tabs.length>1){
                count=1
            }
        })
    }
})