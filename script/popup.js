const btn = document.getElementById("toggleBtn");
const statusText = document.getElementById("statusText");

chrome.storage.local.get("isAdsBlockEnabled", (data) => {
    const isEnabled = data.isAdsBlockEnabled !== false; 
    updateButton(isEnabled);
});

btn.addEventListener("click", () => {
    chrome.storage.local.get("isAdsBlockEnabled", (data) => {
        const newState = !(data.isAdsBlockEnabled !== false);
        chrome.storage.local.set({ isAdsBlockEnabled: newState });
        updateButton(newState);

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if(tabs[0]) {
                if (newState) {
                    chrome.tabs.sendMessage(tabs[0].id, { command: "start" });
                } else {
                    chrome.tabs.reload(tabs[0].id);
                }
            }
        });
    });
});

function updateButton(status) {
    if (status) {
        statusText.innerText = "ON";
        statusText.className = "text-on";
        
        btn.innerText = "Turn OFF (ปิดการทำงาน)";
        btn.className = "btn-disable";
        
    } else {
        statusText.innerText = "OFF";
        statusText.className = "text-off";
        
        btn.innerText = "Turn ON (เปิดการทำงาน)";
        btn.className = "btn-enable";
    }
}