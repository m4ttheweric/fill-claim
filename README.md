# Auto-Fill Simple Practice Claims

## Requirements:

-  Google Chrome Browser or Firefox on a Mac or PC.
-  For Chrome: Installation of the <a href="https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld" target="_blank">User Javascript and CSS</a> Chrome extension. This allows us to run a custom script to do the magic!
-  For Firefox: Installation of: <a href="https://addons.mozilla.org/en-US/firefox/addon/codeinjector/" target="_blank">Code Injector</a>
-  Other browsers should also work provided you use some kind of mechanism to inject javascript.

## Chrome Setup:

1. Login to your Simple Practice account
2. Click the extensions button in the Chrome menu bar and select the `User Javascript and CSS` extension
3. Hit `+ Add New` when you see the `Rules For This Page` window appear. This should open a new tab where you will configure the script.
4. Type `Simple Practice` or whatever you want into the `Name` field.
5. In the leftmost large box below with the `JS` title in the top-left, paste in the contents from [/dist/inject.min.js](/dist/inject.min.js), hit the `Save` button and close the tab to return to Simple Practice.

## Firefox Setup:

Generally the same approach, but using the `Code Injector` extension listed above.

## General Use

1. When you are editing a claim, you should now see a new button that says `Setup Magic...`. Click the button and follow the prompts to fill in your Supervisor info.
2. Once you have finished entering that info, the button should now say `Magic Fill!`. To auto-fill the claim, click the `Magic Fill!` button and you're done!

Fields that have been filled appear highlighted pink.

If you ever clear your browsing data/cache, you may need to re-renter the info.

As of v1.4, you can also 1) open all "Prepared" claims in new tabs with a single button click, and 2) open, fill, and submit all "Prepared" claims with a single button click. This requires copying the latest from [/dist/inject.min.js](/dist/inject.min.js) into your browser injection plugin.
