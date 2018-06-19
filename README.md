[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)

### A few notes
* We're starting the server with the `index.js` file which is in the root folder. This file loads the babel-register and sets up the babel plugins needed to run JSX and ESModules on the server.
* The node server needs to handle the static files from the `dist` folder.
* The entry point of the bundle is called `client.js` because it's the only part of our application that is not used for the server render.

## (WIP) Navigating through the different steps
* Base example
* React Router
* Redux
* Prefetching Data
* React Helmet
