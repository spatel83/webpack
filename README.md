# README

### Overview

Located here are all of the resources used to build out the frontend for VMSNet. To improve maintainability, we have started using Webpack to bundle all of our JavaScript and SASS to compile all of our stylesheets.

If you are updating anything on the frontend of VMSNet, please ensure that you have **node**, **npm** and **SASS** installed on your machine.  To get started, download the entire **frontend-source** folder and run the following command from the **frontend-source** folder to receive everything you need to get started:

```
npm install
```

##### ** Please note **
No git repo is set up for this.  It is recommended you set up a local git repo.  For now, we are relying on SharePoint's version control to maintain this folder and all of our frontend changes.  This means that if you are updating anything on the frontend, you must be sure to include all of your updated partials when publishing your changes.  If you do not, there is a good chance all of your changes will get wiped out.

### JavaScript

The entry point for all of the JavaScript partials can be found in the **/frontend-source/source/js/vmsnet-entry.js** file and all the partials can be found in the **/frontend-source/source/js/components/** folder.

To compile all of the JavaScript, you can run the following command from the **/frontend-source/** folder:

```
webpack
```

To compile and compress all of the JavaScript, you can run the following command from the **/frontend-source/** folder:

```
webpack -p
```

ESLint rules have been provided, please try to address all open issues before publishing.

### SASS

The entry point for all of the SASS partials can be found in the **/frontend-source/source/sass/main.scss** file and all the partials can be found in the **/frontend-source/source/sass/partials/** folder.

To compile all of the SASS partials, you can run the following command from the **/frontend-source/source/sass/** folder:

```
sass main.scss ../../build/css/main.css
```

To compile and compress all of the SASS, you can run the following command from the **/frontend-source/source/sass/** folder:

```
sass main.scss ../../build/css/main.css --style compressed
```
