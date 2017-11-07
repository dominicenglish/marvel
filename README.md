# Marvel Explorer

A sample application using the [Marvel Comic API](https://developer.marvel.com/)

## Setup
This application makes use of the [Marvel Comic API](https://developer.marvel.com/) and requires an API key. You can sign up for a free API key and the link above.

You must then place your API key in the /src/config.js file in the provided place

## Observations
While the current application is functional there are a number of changes
I would like to make to increase maintainability of the project.
- Test suites particularly for Action Creators, Reducers and Selectors
- Plenty of good candidates for refactoring. Action creators in particular have
quite a lot of repetitive boilerplate.
- Interface updates. The user interface is in a very basic state at the moment.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
