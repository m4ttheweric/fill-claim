# Auto-Fill Simple Practice Claims

## Requirements: 

* Google Chrome Browser on a Mac or PC
* Installation of the <a href="https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld" target="_blank">User Javascript and CSS</a> Chrome extension. This allows us to run a custom script to do the magic!

## Setup: 

1. Login to your Simple Practice account
2. Click the extensions button in the Chrome menu bar and select the `User Javascript and CSS` extension
3. Hit `+ Add New` when you see the `Rules For This Page` window appear. This should open a new tab where you will configure the script.
4. Type `Simple Practice` or whatever you want into the `Name` field.
5. In the leftmost large box below with the `JS` title in the top-left, paste in the contents from [/src/chrome-user-js.js](/src/chrome-user-js.js)
6. Hit the `Save` button and then you can close this tab and return to Simple Practice.
7. When you are editing a claim, you should now see a new button that says `Setup Magic...`. Click the button and follow the prompts to fill in your Supervisor info.
8. Once you have finished entering that info, the button should now say `Magic Fill!`. To auto-fill the claim, click the `Magic Fill!` button and you're done!

Fields that have been filled appear highlighted pink.

If you ever clear your browsing data/cache, you may need to re-renter the info.
