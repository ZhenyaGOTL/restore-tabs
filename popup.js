const restore = document.getElementById("restore");
restore.addEventListener("click",() => {
        chrome.storage.local.get(["tabs"]).then((result) => {
            if (result.tabs.length!=0){
                chrome.tabs.query({}, function (tabs) {
                    tabs.forEach((e)=>{
                        chrome.tabs.remove(e.id)
                    })
                })
                result.tabs.forEach((e)=>{
                    chrome.tabs.create({
                        url: e
                    })
                })
            }
            chrome.storage.local.set({'tabs':result.tabs})
        });
})