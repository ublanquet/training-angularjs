# ************
This is a work in progress. Any comment or contribution is welcome.
# ************

# Training: computer-database angularJS

This tutorial will guide you through the creation of dedicated web application written with the [AngularJS](https://angularjs.org/) framework.
AngularJS is a full-featured web framework

The application will serve Computers & Companies lists using a REST Api.

## Before we start - prerequisites
You must have followed the complete [comuter-database tutorial](https://github.com/resourcepool/training-java).
In order to start on strong bases, let's assert the following :
 - You know what is a REST api.
 - Your REST api is Stateless
 - Your REST api provides pagination capabilities through query parameters.
 - Your REST api produces JSON, an is [REST-compliant](http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)
   Don't put verbs within URL. *Only* names in plural form. Use HTTP Methods.
 - Your REST api throws reliable [HTTP status](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) in case of errors.
   ie : `api/computers/42` should return 404 ifcomputer with id 42 doesn't exists.
 - You know how to use solutions like [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) (or curl, for the warriors).


Exemple of *bad* REST apis
```
    [POST]              host:8080/api/addComputer
    [GET]               host:8080/api/getComputer?id=12
    [GET]               host:8080/api/getCompanyOfComputer?computerId=12
    [POST]              host:8080/api/updateComputer
```

Exemple of *better* REST apis
```
    [POST]              host:8080/api/computer
    [GET]               host:8080/api/computer/12
    [GET]               host:8080/api/computer/12/company
    [PUT] / [PATCH]     host:8080/api/computer/12
```

Also, for the shake of simplicity, let's discard any security concern at the moment, we will consider that REST api is full access to everyone without any authentication.
You may want to disable Spring security, or if you use basic auth, you can provide http headers with your own hard-codded basic token.
```javascript
    const header = {
        'Authorization': 'Basic ' + btoa(username + ":" + password)
    }
```

> Does your GET /computer return the complete company within computer or just its id?

## Introduction:

Web technologies are progressing quickly, and web development is not the same all static ugly messed up code that it used to be.
We now build web application, not web sites, and they deserve a proper workflow, and proper tools as much as any other application.
There is many tools front-end developpers are familiar with, to use in their stack :
 - A package manager: Download libraries & dependencies for your project. Like maven or gradle but we don't run tasks with them (we usually prefer to use a dedicated program fot that).
    - SystemJS, NPM only, JSPM
 - A Task runner: Like maven, gradle or make, to run build & deploy tasks, among others.
    - Gulp, Grunt
 - A packager, or transpiler: Understand: a compiler that "translate code into code", rather than "compile code into binary", and bundle all source files into a single one.
   The *only* language natively supported by Web browsers is Javascript. But developers may prefer using more cutting-edge languages (Typescript, Dart, non-standard EcmaScript), then transpile it to widely compatible javascript
    - babel, browserify, webpack, Typescript, Rollup
 - A programming language (obviously)
    - Javascript ES5, ES6, typescript, dart
 - A framework
    - AngularJS, React, Backbone, Riot
 - A styling language.
    - Plain old CSS, Sass, less
 - A styling framework.
    - angular-material, bootstrap, paperkit, polymer...
 - An IDE
    - Intellij ultimate, Nodeclipse) or an 'advanced text editor' (Visual Studio Code, Atom, Brackets. Intellij community eddition **not** recommended,no javascript support.

This tutorial, we will rely on the following stack: 
 - Package manager : **NPM (v4) + bower**
 - Task runner : **Gulp (v4)**
 - Transpiller : **Babel**
 - language: **ES6 (= ES2015)**
 - framework: **AngularJS 1.6)
 - test framework: **karma**
 - styling language: **scss**
 - styling framework: **Bootstrap** 
 - ide: **Webstorm**

## Setup the environment.

 1. Download & install nodeJS v7.x:
    - via your package manager (linux): https://nodejs.org/en/download/package-manager/
    - manual installation: https://nodejs.org/en/
 2. Install npm : `sudo apt-get install npm`
 3. Install gulp : `sudo npm uninstall -g gulp || sudo npm install gulp-cli`
 4. Install bower: `sudo npm install -g bower`
 5. Install bower resolver : `sudo npm install -g bower-npm-resolver`

You also need a web browser (of course!). Google Chrome (or Chromium) have very good built-in javascript debugger & development tools.

## Installation:

Never start a project "from scratch". A useful stack involves a lot, and there is many code base & generator out of there that can push your project toward best practise and opinionated patterns.
This project comes with my own gulp stack, inspired by [FountainJS](http://fountainjs.io/) and [Hottowel](https://github.com/johnpapa/generator-hottowel)

Here is the project structure
```sh
/.tmp		# contains files generated by gulp serve
    /app		# project's root
    /resources
        /images		# contains images
        /i18n		# contains locale**.json
    /src		# javascript sources
        /blocks		# block module, for common codes source
    /styles		# common .scss styles
```

> Why do we get 2 dependencies manager ?

More details on gulp usage in README_GUP.md

## Get started

Some useful references that may worth reading while coding :
 - http://www.codelord.net/2017/01/01/angular-1-dot-6-is-here-what-you-need-to-know/
 - https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md/


Run `gulp serve`, and connect your web browser to localhost:3000.
This task generate intermediate source files within a ".tmp" directory, that is served with "browsersync"

Angular 1.x applications are defined by modules. It is best to see modules as some kind of standalone packages, that references each other to assemble the entire application.
Contrary to Java packages, AngularJS modules are not constrained by any folder architecture, but we tend to have a single module and all its files (js, styles, html) within its own (sub)directory.
The application is right now is composed of a unique AngularJS module named `app` (`app/app.module.js`). This module is referenced in `hello.js`, which adds to it a component named `hello`.
It is bootstraped by the [ng-app](https://docs.angularjs.org/api/ng/directive/ngApp) directive, that run and populate the `<ui-view></ui-view>` tag with the current view.

> Your app is build around HTML. Remember that HTML is not case sensitive. As a result, the convention is to always use lowercase file names. Note that with the awakening of packagers like WebPack or Typescript that bundle html, js & css files, this convention is not ubiquitous anymore and tend to dissapear.

> As the application grows up, you will soon get a bunch of files all around the project, and it is a good idea to keep consistent & coherent file organisation.

### 1. First module - Hello module

Rewrite the actual code, to create a new AngularJS module named `app.hello`, that define a component `hello`.
This component is reachable through the state named `hello`, bound to the url `/hello`
In order to let `app` module using the new `app.hello` module, don't forget to add it as a dependency in `hello.component.js`.
Add some style to this component (ie: title in red)
This step should produce the following files:
```sh
app/hello/hello.html
app/hello/hello.module.js
app/hello/hello.route.js
app/hello/hello.component.js
app/hello/hello.spec.js
app/hello/hello.scss
```

> It is a good idea to let modules come with their own routes, rather than defining a single 'routes.js' that list all existing routes of the app.

> How to ensure that hello.scss style does apply only to hello component?

> Never write CSS browser prefixes. That is code noise! If you need your application to be compatible with old browsers, use a plugin that post-process CSS for you.

### 2. Build project
Run `gulp build` to build the project. Building a web project often involves optimising the sources & resources.
This gulp setup is configured to lint the code, minimize & uglify javascript sources, optimise images, concatenate all html files within angular's [templateCache](https://docs.angularjs.org/api/ng/service/$templateCache), process SCSS files to optimized & prefixed CSS, ... 
Provided code ling passes, a resulting dist/ folder have been generated with optimized code. 
Test it with `gulp serve:dist`:

Oooops: You might encounter some weird error like this: `Error: [$injector:unpr] Unknown provider: e`
So what happened? Angular comes with **dependency injection**. When you define the `HelloController($log)` function, you ask angular to inject `$log` service in first parameter.
Javascript is weakly typed, so angular has no choice but to rely on variable's name to know which service (or which **provider**) to inject. But when uglifying the code, your `$log` parameter has been renamed to `e`, that breaks dependency injection.
 - Fix up dependency injection with uglification.
 - Enable [strict-di mode](https://docs.angularjs.org/api/ng/directive/ngApp), to never let this error happen again when you have tons of functions, and you won't know which one is broken.

### 3. 404 Not found.
Import static view `404.html`, and create a `app.route.js` file that define a state `404` bound to URL `/404` that shows the error page. This state is triggered by configuration at `app.config.js:26`

 - How did you installed bootstrap?

### 4. First true module: Dashboard

Create a new module `app.dashboard`, then import static views `addComputer.html`, `editComputer.html` & `dashboard.html` into it.
Create a new component `dashboard` with its state `dashboard`, bound to both `/dashboard` and `/` routes.
Create a [service or a factory](https://docs.angularjs.org/guide/providers) that uses [$http](https://docs.angularjs.org/api/ng/service/$http) against your java back-end.

> It is generally a bad idea to call directly `$http` within controllers. Always prefer to write a dedicated service for that.

> Do not hard code the api uri within your source code. You could use an angular [value or constant](https://docs.angularjs.org/guide/providers) to hold the configuration.
In javascript, there is no standard for switchable configuration like 'app.properties', but your gulp setup support this option : Just override `src/env/dev-conf.js` to define variables picked-up by `gulp serve`.



- Naming convention apart, any idea why we name files `some.module.js`, `some.service.js` or `some.config.js` ?
- Have you seen those `/* @ngInject */` all around source files?
- Any way to prevent copy-pasting of `<header></header>` across `dashboard.html`, `editComputer.html` & `addComputer.html` ?
- How to deal with boring url concatenation?
- What is the `track by` clause for `ng-repeat`?
- What is binding `<div>{{`**::**`item.name}}</div>` for?

### 5. Components
Create a new component to display the pagination element.

 - Differences between component and directive?


### 6. Models

Have you seen the release date & discontinuation date on dashboard ? It is displayed as a string, which will cause some troubles if you want to localise your application.
Javascript `Date` object has some useful localisation capabilities, and it could be interesting to take advantage of it, but we don't want to convert Date from / to string each time we need it in the application.
When applications get more complex, you may be limited if all your front-end layers work with the back-end formatted DTO, especially if you want to attach some behavior to objects.
Write a `computer.model.js` that defines a class Computer. This class should be mapped from / to back-end computer dto.
Use it to display localized dates on dashboard.

- Where is handled the mapping ?

### 7. i18n
When you want your application to be international, consider addressing the i18n concern as soon as possible, or you'll have a lot of fun searchingfor all remaining hard-coded strins that stills require translation.
There are few translation library for angular out of there. I recommend using [angular-translate](https://angular-translate.github.io/) because it is simple but full-featured.
To save up time, your gulp setup is already configured to handle internationalization files.
By default, it will search within `src/resources/i18n` for files named `xx.json` (where xx is the country code) to know supported languages.
Then, any `**/i18n/xx.json` will be merged to the corresponding file at build time. This mean that any of your module can come with its own `resource/i18n/xx.json` files, so that you don't  have a giant single file that contains translations for the whole application.


### 8. Forms
TODO
Write edit & add computer
Use ng-message to display errors

### 9. Tests
TODO karma, jasmine, protractor

### 10. CSS
TODO
Replace bootstrap with another CSS framework of your choice.

Guidelines:
- Use a limited and welldefined color scheme. Avoid using colors / dimens / whatever that isnot defined once for all in a kind of 'constants.scss'
- Be consistent in variable & class naming
- use `@mixin`
- use `display: flex`
