[![car-maintenance](https://snapcraft.io/car-maintenance/badge.svg)](https://snapcraft.io/car-maintenance)
![Maintained][maintained-badge]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/car-maintenance)

# Introduction

Bootstrap and package your project with Angular 10 and Electron 9 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v11.0.3
- Electron v11.0.3
- Electron Builder v22.9.1

With this sample, you can :

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular 11.x CLI needs Node 10.13 or later to work correctly.

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with npm :

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:build`| Builds your application and creates an app consumable based on your operating system |


[build-badge]: https://travis-ci.org/maximegris/angular-electron.svg?branch=master&style=style=flat-square
[build]: https://travis-ci.org/maximegris/angular-electron
[license-badge]: https://img.shields.io/badge/license-Apache2-blue.svg?style=style=flat-square
[license]: https://github.com/maximegris/angular-electron/blob/master/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/maximegris/angular-electron.svg?style=social
[github-watch]: https://github.com/maximegris/angular-electron/watchers
[github-star-badge]: https://img.shields.io/github/stars/maximegris/angular-electron.svg?style=social
[github-star]: https://github.com/maximegris/angular-electron/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20angular-electron!%20https://github.com/maximegris/angular-electron%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/maximegris/angular-electron.svg?style=social
[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
