chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ active: true });
    console.log("TabOut extension installed and activated by default.");
    chrome.action.setBadgeBackgroundColor({ color: "#5B84C4" });
    chrome.action.setBadgeText({ text: " " });
});

// When the extension icon is clicked, toggle the active state
chrome.action.onClicked.addListener(() => {
    chrome.storage.sync.get("active", (data) => {
        let newActiveState = !data.active;
        chrome.storage.sync.set({ active: newActiveState });
        updateBadge(newActiveState);
    });
});

// Update the badge based on the active state
function updateBadge(active) {
    chrome.action.setBadgeText({ text: active ? " " : "x" });
    chrome.action.setBadgeBackgroundColor({
        color: active ? "#5B84C4" : "#FB9B50",
    });
}

// Listen for the keyboard command to simulate the execute button click
chrome.commands.onCommand.addListener((command) => {
    if (command === "simulate-execute-button-click") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: simulateExecuteButtonClick,
                });
            }
        });
    }
});

// Function to simulate clicking the execute button
function simulateExecuteButtonClick() {
    const button = document.getElementById("execute-button");
    console.log("Simulating execute button click.");
    if (button) {
        if (button.disabled) {
            // Optionally enable the button if it's disabled
            button.disabled = false;
        }
        button.click();
    } else {
        console.log("Execute button not found.");
    }
}
