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

            const activeElement = document.activeElement;
            const textarea = document.querySelector(
                ".inputarea.monaco-mouse-cursor-text"
            );
            if (!activeElement || activeElement !== textarea) {
                return;
            }
            // Get the curser position within the editor
            if (activeElement) {
                // get the position of the active element
                const style = window.getComputedStyle(activeElement);
                const position = {
                    top: style.top,
                    left: style.left,
                };

                // Get the start position of the editor
                const startposstr = document.querySelector(
                    ".monaco-scrollable-element.editor-scrollable"
                ).style.left;
                const startpos = parseInt(startposstr.replace(/[^0-9]/g, ""));

                // Get the width of a character in the editor
                const testElement = document.createElement("span");
                testElement.style.fontFamily = textarea.style.fontFamily;
                testElement.style.fontSize = textarea.style.fontSize;
                testElement.style.fontWeight = textarea.style.fontWeight;
                testElement.style.letterSpacing = textarea.style.letterSpacing;
                testElement.style.fontFeatureSettings =
                    textarea.style.fontFeatureSettings;
                testElement.style.fontVariationSettings =
                    textarea.style.fontVariationSettings;
                testElement.style.lineHeight = textarea.style.lineHeight;
                testElement.style.visibility = "hidden"; // Ensure it doesn't affect the page layout

                testElement.textContent = "M";
                document.body.appendChild(testElement);
                const charwidth = testElement.getBoundingClientRect().width;
                document.body.removeChild(testElement);

                // Get the amount the editor has been scrolled
                const scrolled = document.querySelector(
                    ".lines-content.monaco-editor-background"
                );
                const scrolledRightStr = scrolled.style.left;
                const scrolledDownStr = scrolled.style.top;
                const scrollRight = parseInt(
                    scrolledRightStr.replace(/[^0-9]/g, "")
                );
                const scrollDown = parseInt(
                    scrolledDownStr.replace(/[^0-9]/g, "")
                );

                // Get the character at the position to the right of the cursor
                const nextChar = getCharacterAtPosition(
                    parseInt(position.top) + scrollDown,
                    Math.round(
                        (parseInt(position.left) + scrollRight - startpos) /
                            charwidth
                    )
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
