chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ active: true });
    console.log("TabOut extension installed and activated by default.");
    chrome.action.setBadgeBackgroundColor({ color: "#5B84C4" });
    chrome.action.setBadgeText({ text: " " });
});

// when the extension is clicked, toggle the active state
chrome.action.onClicked.addListener(() => {
    chrome.storage.sync.get("active", (data) => {
        let newActiveState = !data.active;
        chrome.storage.sync.set({ active: newActiveState });
        updateBadge(newActiveState);
    });
});

// update the badge based on the active state
function updateBadge(active) {
    chrome.action.setBadgeText({ text: active ? " " : "x" });
    chrome.action.setBadgeBackgroundColor({
        color: active ? "#5B84C4" : "#FB9B50",
    });
}
