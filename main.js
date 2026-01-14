function startBlocking() {
    removeAds();

    const observer = new MutationObserver((mutations) => {
        removeAds();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log("Ads Blocker Started");
}

chrome.storage.local.get("isAdsBlockEnabled", (data) => {
    if (data.isAdsBlockEnabled !== false) {
        startBlocking();
    } else {
        console.log("Ads Blocker is Disabled by User");
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
        startBlocking();
    }
});