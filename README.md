# Testbed-Control-UI

This project aims to provide a controller interface of the WebEng testbed based on the [WoT Thing Description](https://www.w3.org/TR/wot-thing-description/).<br />
Currently, the app is served on [our lab server](http://server.seiker.kr:3000).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You would be required to allow the CORS policy of your Web browser.<br />
Install the [CORS extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) or others to allow the policy.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app in the production mode.<br />
After the app is successfully built, run `serve -s -l PORT ./build/` to serve the app.

## Further Update

### `src/Actions.js`

Currently, integer inputs are only supported by this app.<br />
Further support for [other input types](https://w3c.github.io/wot-thing-description/#sec-data-schema-vocabulary-definition) can be made by extending cases for them.
