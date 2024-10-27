javascript:(async () => {
    async function waitForElementPresence(xPathSelector) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                const element = document.evaluate(xPathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);
        });
    }

    function $x(xpath, context = document) {
        const results = [];
        const query = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        let result = query.iterateNext();
        while (result) {
            results.push(result);
            result = query.iterateNext();
        }
        return results;
    }

    async function runEasyLevelScript() {
        //Easy level 
        //To solve this, it is enough to use the shortcut $x() in the Chrome developer console to execute XPath queries.
        console.log('####### Easy level #######');

        //Task 1
        console.log('==>1.Find the first h1 element on the main page.'); 
        console.log($x('//h1[1]'))

        //Task 2
        console.log('==>2.Find all images that have an "alt" attribute.'); 
        console.log($x('//img[@alt]'))

        //Task 3
        console.log('==>3.Find the button with the text Start forming a habit!".'); 
        console.log('Search exact match:', $x("//button[text() = 'Start forming a habit!']"));
        console.log('Search by partial match because some elements contain text with whitespaces: ',
            $x("//button[contains(text(), 'Start forming a habit!')]")
        );

        //Task 4
        console.log('==>4.Check for the presence of a search icon on the webpage.'); 
        const iconImg_v1 = $x("//img[contains(@src, 'search')]")
        const iconImg_v2 = $x("//*[contains(@class, 'search-icon')]/img[contains(@src, 'search')]"); //safer check
        console.log((iconImg_v1.length > 0 || iconImg_v2.length > 0 ) ? "The search icon is present" 
        : "The search icon is absent");

        //Task 5
        console.log('==>5.Check for the presence of checkboxes.'); 
        const checkboxes = $x(
            "//mat-checkbox | " +
            "//mat-pseudo-checkbox | " +
            "//input[@type='checkbox' and not(ancestor::mat-checkbox)]"
        );
        const printSuccess = (el) => {
            console.log("Checkboxes found:",el);
        };
        console.log(checkboxes.length > 0 ? printSuccess(checkboxes) : "No checkboxes found");

        console.log('__________Easy level - FIHISNED_________'); 
    }

    async function runMediumLevelScript() {
        //Medium level 
        //To solve this, it is necessary to use JavaScript and the method document.evaluate() in the Chrome developer console to execute XPath queries.
        console.log('####### Medium level #######'); 

        //Task 1
        console.log('==>1.To find the first h1 element on the main page.');
        let first_h1 = document.evaluate("//h1", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        console.log(first_h1.singleNodeValue);

        //Task 2
        console.log("==>2.Find all images that have the 'alt' attribute. Output the message in the console 'Found (number) images with the alt attribute.'");
        let images_alt = document.evaluate("//img[@alt]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        let count = images_alt.snapshotLength;
        console.log(`Found ${count} images with the alt attribute.`);

        //Task 3
        console.log("==>3.Find the button element with the text 'Start forming a habit!'. If an element with such text is not found, display a corresponding message. Output the message with numbers of buttons in the console.");
        let habitButtons = document.evaluate("//button[contains(text(), 'Start forming a habit!')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        let buttonResult = Array.from({ length: images_alt.snapshotLength }, (_, i) => images_alt.snapshotItem(i));
        buttonResult.length > 0 ? console.log("Buttons found:", buttonResult) : "Habit buttons not found";

        //Task 4 
        console.log('==>4.Validate the presence and visibility of the site search icon on the webpage, and ensure the image associated with the search icon has the appropriate alt text and a source (src) path'); 
        function checkVisibilityTest(element) {
            if (!element) return false;
            
            const style = window.getComputedStyle(element);
            const isDisplayNone = style.display === 'none';
            const isVisibilityHidden = style.visibility === 'hidden';
            const isOpacityZero = style.opacity === '0';
            
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top >= 0 && rect.left >= 0 
                                    && rect.bottom <= (window.innerHeight) 
                                    && rect.right <= (window.innerWidth);

            return !isDisplayNone && !isVisibilityHidden && !isOpacityZero && isInViewport;
        }
        function checkSearchButtonAttributes(element) {
            const searchText = "search"; 
            return (element.alt.includes(searchText) && element.src.includes(searchText) && checkVisibilityTest(element))
        }

        let imgButtons = document.evaluate("//img", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
        let result = "Search element not found"
        let button;
        while ((button = imgButtons.iterateNext())) {
            if(checkSearchButtonAttributes(button)) result = "The site search icon is present and visible"; 
        }

        console.log(result);

        //Task 5
        async function validateCheckboxesScript() {
            window.location.href = "https://www.greencity.cx.ua/#/profile";
            
            const editProfileIcon = await waitForElementPresence("//a[contains(@class, 'edit-icon')]");
            editProfileIcon.click();
            
            await waitForElementPresence("//input[@type='checkbox' and contains(@class, 'ng-touched')]");
            const profileCheckButtons = document.evaluate("//input[@type='checkbox']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
            
            let checkedCount = 0;
            let uncheckedCount = 0;
            let checkButton
            while (checkButton = profileCheckButtons.iterateNext()) {
                if (checkButton.checked) {
                    checkedCount++;
                } else {
                    uncheckedCount++;
                }
            }
            console.log('==>5.Create a script to check the checkbox statuses'); 

            console.log(`Checked elements: ${checkedCount} | Unchecked elements: ${uncheckedCount}.`, );
        }
        await validateCheckboxesScript();

        console.log('__________Medium level - FIHISNED_________'); 
    }

    async function runHardlevelScript() {
        //Hard level
        //Task 6 Validate the website's ability to switch languages effectively.
        console.log('####### Hard level #######'); 

        async function getElementsWithText() {
            return $x("//*[normalize-space(text()) != '']");
        }
        
        function captureSnapshot(elements) {
            return elements.map(element => element ? element.textContent.trim() : null);
        }
        
        function isLanguageSwitcherPresent() {
            return Boolean($x("//ul[@aria-label='language switcher']")[0]);
        }
        
        function clickOnLastLanguageOption() {
            const languageButtons = $x("//li[contains(@class,'lang-option')]");
            let arrLength = languageButtons.length;
            if (arrLength > 0) {
                const btnToClick = arrLength > 1 ? languageButtons[arrLength - 1] : languageButtons[0];
                btnToClick.click();
            }
        }
        
        function switchLanguageIfPresent() {
            if (isLanguageSwitcherPresent()) {
                clickOnLastLanguageOption();
                clickOnLastLanguageOption();
                return true;
            } else {
                console.warn("Language toggle element is absent");
                return false;
            }
        }
        
        function compareSnapshots(beforeSnapshot, afterSnapshot) {
            let counter = 0;
            for(let i = 0; i<beforeSnapshot.length; i++) {
                if(beforeSnapshot[i] !== afterSnapshot[i]){
                    console.log(`%cBefore: %c"${beforeSnapshot[i]}"\n%cAfter: %c"${afterSnapshot[i]}"`, 'color: green;', '', 'color: red;', '');
                    counter++;
                }
            };
            if(counter==0){console.warn("No language changes have been performed")}
            console.log("Number of elements with text found:" + beforeSnapshot.length)
        }
    
        let ref = await getElementsWithText();
        let before = await captureSnapshot(ref);
        if(switchLanguageIfPresent()){
            await new Promise(resolve => setTimeout(resolve, 500));
            let after = await captureSnapshot(ref); 
            compareSnapshots(before,after);
        }
        
        console.log('__________Hard level - FIHISNED_________'); 
    }

    await runEasyLevelScript()
    await runMediumLevelScript()
    await runHardlevelScript()
})();