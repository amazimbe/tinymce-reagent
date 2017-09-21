# reagent TinyMCE Plugin

Welcome stranger! This is a repo containing the reagent TinyMCE plugin.

## The development server

Checkout the code from Github and change into the plugin's directory. Install all npm dependencies by running `npm install`.
Install all bower dependencies by running `bower install`. Run `npm start` to start the development server and open a browser window with an instance of TinyMCE with your plugin added to it. This window will reload automatically whenever a change is detected in the `index.html` file in the `static` folder or in one of the JavaScript files in the `src` directory.

## The production build

By running the `npm run build` command Webpack will create a `dist` directory with a child directory with the name of your plugin (reagent) containing three files:

* `plugin.js` - the bundled plugin
* `plugin.min.js` - the bundles, uglified and minified plugin
* `LICENSE` - a file explaining the license of your plugin (copied over from `src/LICENSE`)
