# JSPM Proof of Concept
[jspm](jspm.io) is a package manager that abstracts npm and bower.  In addition it allows us to use [ES6 style module notation](http://exploringjs.com/es6/ch_modules.html) in our JavaScript files.
## Install
First, run

    npm install
    
Then, run

    jspm install
    
## Installing Dependencies
Any dev dependencies should be installed with npm.  Any client side dependencies should be installed with jspm.

## This Project is a Dev Envrionment
The files and folders have been organized to support a development workflow.  If you would like to produce a production build, there are npm scripts you can run to install files in the build folder.
## Serving the Development Version
Download your favorite server package of choice ([http-server](https://www.npmjs.com/package/http-server) is nice). Run the server from the root of the project.
### A Note on JavaScript Modules
Any module you write needs to be imported in scripts/startup.js, or used by a module imported in startup.js
## Custom NPM Scripts
The following scripts can be run using

    npm run <command-name>
    
For more information see the package.json file
### bundle-js
Package all javascript dependencies into a single file, minify and write the file to build/build.js
### bundle-sass
Compile sass files in styles/sass and output the result to build/styles
### build
Run bundle-js and bundle-sass
### clean-styles
Remove build/styles/css and build/styles/fonts folders
### sass
Compile sass files in styles/sass and output to styles/css
### watch-sass
Watch styles/sass for changes. On any change, compile to styles/css
## Serving the Production Version
Run your server with a root folder of ./build


