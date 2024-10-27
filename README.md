# Usage Instructions for the Script
This script in [homework_4.js](https://github.com/Angelsslayer/Search_WebElements_Xpath-04_Practical-Task/blob/main/homework_4.js) is designed to be executed by injecting JavaScript into the browser console (the instructions below may help you with this) or copied/pasted directly into the browser console.

## Instructions how to run the Script injection
1. Open the [website](https://www.greencity.cx.ua/#/greenCity) and log in or register new account.
2. Make sure you are still on the page [page](https://www.greencity.cx.ua/#/greenCity).
3. Open your browser's console. You can do this by pressing `F12` or `Ctrl + Shift + I` (depending on your browser).
4. Make sure you are allowed pasting scripts, type: `allow pasting`.
5. Copy and paste the following code into the console:

   ```javascript
   javascript:(() => {
   fetch('https://raw.githubusercontent.com/Angelsslayer/Search_WebElements_Xpath-04_Practical-Task/refs/heads/main/homework_4.js')
       .then(response => response.text())
       .then(scriptText => eval(scriptText))
       .catch(error => console.error('Error loading the script:', error));
   })();
 6. Press Enter to execute the script.

## Video Tutorials
For additional information on how to use the script, you can watch the tutorials at the following [YouTube link](https://youtu.be/wAFCh4aHggg)
