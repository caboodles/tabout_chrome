chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ active: true });
    console.log("TabOut extension installed and activated by default.");
    chrome.action.setBadgeBackgroundColor({ color: "#5B84C4" });
    chrome.action.setBadgeText({ text: " " });
});

// Toggle active state when the extension icon is clicked
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

// Listen for keyboard commands
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
    } else if (command === "simulate-submit-button-click") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: simulateSubmitButtonClick,
                });
            }
        });
    }
});

// Function to simulate clicking the execute button
function simulateExecuteButtonClick() {
    const button = document.getElementById("execute-button");
    if (button) {
        if (button.disabled) {
            button.disabled = false; // Enable if disabled
        }
        button.click();
    } else {
        console.log("Execute button not found.");
    }
}

// Function to simulate clicking the submit button
function simulateSubmitButtonClick() {
    const button = document.querySelector(
        'button[data-testid="submit-button"]'
    );
    if (button) {
        if (button.disabled) {
            button.disabled = false; // Enable if disabled
        }
        button.click();
    } else {
        console.log("Submit button not found.");
    }
}
