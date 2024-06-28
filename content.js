//todo : fix get curser position to be compatible with all layouts and scroll positions

(function () {
    let TABOUT_ACTIVE = true;

    // Function to get the active state from storage and set TABOUT_ACTIVE
    function updateTabOutActiveState() {
        chrome.storage.sync.get("active", (data) => {
            TABOUT_ACTIVE = data.active;
        });
    }

    // Initial check to set TABOUT_ACTIVE
    updateTabOutActiveState();

    // Listen for storage changes to update TABOUT_ACTIVE state
    chrome.storage.onChanged.addListener((changes, namespace) => {
        console.log(changes, namespace);
        if (namespace === "sync" && changes.active) {
            TABOUT_ACTIVE = changes.active.newValue;
        }
    });

    // Listen for keydown events to check for tab key press
    document.addEventListener(
        "keydown",
        function (event) {
            if (!TABOUT_ACTIVE || event.key !== "Tab") {
                return;
            }

            // Get the curser position within the editor
            const activeElement = document.activeElement;
            if (activeElement) {
                const style = window.getComputedStyle(activeElement);
                const position = {
                    top: style.top,
                    left: style.left,
                };
                const nextChar = getCharacterAtPosition(
                    parseInt(position.top),
                    Math.round((parseInt(position.left) - 83) / 7.7) //get left start position by user?
                );

                const specialCharacters = [
                    "(",
                    ")",
                    "{",
                    "}",
                    "[",
                    "]",
                    '"',
                    "'",
                    ":",
                    "=",
                    ">",
                    "<",
                    ".",
                    "`",
                    ";",
                ];

                if (specialCharacters.includes(nextChar)) {
                    // Prevent default tab behavior
                    event.preventDefault();
                    event.stopPropagation();

                    simulateRightArrowKeyPress(activeElement);
                }
            }
        },
        true
    );

    // Function to get the character at a specific position in the editor
    function getCharacterAtPosition(line, cur) {
        const parentDiv = document.querySelector(
            "div.view-lines.monaco-mouse-cursor-text"
        );

        if (!parentDiv) {
            return null;
        }

        const targetDiv = Array.from(parentDiv.children).find((child) => {
            const style = child.getAttribute("style");
            return style && style.includes(`top:${line}px`);
        });

        if (!targetDiv) {
            return null;
        }

        const span = targetDiv.querySelector("span");
        let textContent = span.textContent || span.innerHTML;

        if (cur < textContent.length) {
            return textContent[cur];
        } else {
            return null;
        }
    }

    // Function to simulate right arrow key press
    function simulateRightArrowKeyPress(targetElement) {
        const rightArrowKeyDown = new KeyboardEvent("keydown", {
            key: "ArrowRight",
            keyCode: 39,
            which: 39,
            code: "ArrowRight",
            bubbles: true,
            cancelable: true,
        });
        const rightArrowKeyUp = new KeyboardEvent("keyup", {
            key: "ArrowRight",
            keyCode: 39,
            which: 39,
            code: "ArrowRight",
            bubbles: true,
            cancelable: true,
        });

        targetElement.dispatchEvent(rightArrowKeyDown);
        targetElement.dispatchEvent(rightArrowKeyUp);
    }
})();
