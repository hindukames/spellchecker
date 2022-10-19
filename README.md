The component handling the spellcheck  is in src/spellCorrector.js of the code 

Features handled: 

1. The textarea is focussed when users click on it for typing
2. Used TextGears API for the spell check errors and suggestions response in the textarea 
3. Red highlights on the mis-spelled words based on my API-responses 
4. Suggestions context menu is displayed only on the right-click of the mis-spelled words
5. Context Menu is applicable only to my textarea and it disappears when user clicks anywhere other than the suggestions list. 
6. The mis-spelling word is then replaced from the selected word in the suggestions list. 
7. Hovering is handled in the suggestions list for better user-experience 


Since content editable div is used as textarea in this project, faced challenges in placing my cursor position in the div, hence handled them via a "SUBMIT FOR VALIDATION" button, meaning my content in textarea would be validated only on the button click. 

Attaching the video link of the working demo here https://www.loom.com/share/ecc453249fcf431085c33d335c6645f5, as in case my API key would expire the free-access limit at time of review 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


