# TabOut for Codetree

**TabOut for Codetree** is a Chrome extension that enhances the coding experience in Codetree's online editor by allowing you to:

- **Tab Out of Specific Characters**: Easily move out of brackets, quotes, and other paired characters using the Tab key, similar to the functionality provided by the Visual Studio Code extension created by Albert Romkes.
- **Simulate Button Clicks with Keyboard Shortcuts**: Quickly execute code or submit your work by simulating clicks on the "Execute" and "Submit" buttons using customizable keyboard shortcuts.

Simply click the extension icon to toggle the TabOut feature on or off.

## Features

- **TabOut Functionality**: Press the Tab key to move out of paired characters like `()`, `{}`, `[]`, `"`, `'`, etc.
- **Keyboard Shortcuts**:
  - **Execute Code**: Press `Ctrl+Shift+X` (or `Command+Shift+X` on macOS) to simulate clicking the "Execute" button.
  - **Submit Code**: Press `Ctrl+Shift+F` (or `Command+Shift+F` on macOS) to simulate clicking the "Submit" button.
- **Toggle Extension**: Click the extension icon to enable or disable the TabOut functionality. An indicator on the icon shows the current state.

## Installation

### Install via Chrome Web Store (Recommended)

1. **Visit the Extension Page**:

   - [TabOut for Codetree on Chrome Web Store](https://chrome.google.com/webstore/detail/taboutforcodetree/ajdhdphchfnodpdodhihdcflgaodbnfo)

2. **Add to Chrome**:

   - Click on the **"Add to Chrome"** button.


### Install from Source Code

1. **Download or Clone the Repository**:

   - **Download**: Click on the green **"Code"** button above the file list, then select **"Download ZIP"**. Extract the ZIP file to a folder on your computer.
   - **Clone**: Run the following command in your terminal:

     ```bash
     git clone https://github.com/caboodles/tabout_chrome.git
     ```

2. **Open Chrome Extensions Page**:

   - Open Google Chrome.
   - Navigate to `chrome://extensions/`.

3. **Enable Developer Mode**:

   - Toggle the **Developer mode** switch in the top right corner of the page.

4. **Load the Unpacked Extension**:

   - Click on the **"Load unpacked"** button.
   - Select the directory where you downloaded or cloned the extension files.


## Usage

### TabOut Functionality

- **Enable/Disable**: Click the extension icon to toggle the TabOut feature.
  - **Enabled**: The icon badge will display a space.
  - **Disabled**: The icon badge will display an "x".
- **Using TabOut**:
  - When enabled, pressing the **Tab** key while the cursor is next to specific characters (like closing brackets or quotes) will move the cursor outside of those characters.
  - Supported characters: `(`, `)`, `{`, `}`, `[`, `]`, `"`, `'`, `:`, `=`, `>`, `<`, `.`, ``` ` ```, `;`.

### Keyboard Shortcuts

- **Execute Code**:
  - Press `Ctrl+Shift+X` (Windows/Linux) or `Command+Shift+X` (macOS) to simulate clicking the "Execute" button.
- **Submit Code**:
  - Press `Ctrl+Shift+F` (Windows/Linux) or `Command+Shift+F` (macOS) to simulate clicking the "Submit" button.

#### Customizing Shortcuts

- You can customize the keyboard shortcuts:

  1. Navigate to `chrome://extensions/shortcuts` in Chrome.
  2. Find **TabOut for Codetree** in the list.
  3. Click the pencil icon next to the shortcut you want to change.
  4. Press the desired key combination.

## Notes

- **Compatibility**: This extension is designed specifically for the Codetree online editor. Functionality on other websites is not guaranteed.
- **Limited Testing**: The extension has not undergone extensive testing. Use it at your own discretion.
- **Known Issues**:
  - The extension may not work correctly if Codetree updates its website structure or changes the IDs/classes of the buttons.
  - If you encounter issues with the keyboard shortcuts, ensure they are not conflicting with other extensions or browser shortcuts.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Albert Romkes**: For creating the original TabOut extension for Visual Studio Code.
- **Codetree**: For providing the online coding platform that this extension enhances.