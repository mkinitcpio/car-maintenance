// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

// Electron prints dev-only security warnings (missing CSP, etc.) for karma's
// test page. They never appear in the packaged app, so silence them to keep the
// test output readable.
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-electron'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      // Launch a real window instead of an iframe: in Electron only top-level
      // windows receive `nodeIntegration` privileges, which the `electron-renderer`
      // webpack target (require/global/fs/electron externals) relies on.
      useIframe: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    // The first run has to JIT-compile the whole app, so give the browser some
    // slack before karma considers it inactive.
    browserNoActivityTimeout: 60000,
    browsers: ['AngularElectron'],
    customLaunchers: {
      AngularElectron: {
        base: 'Electron',
        flags: [
          '--remote-debugging-port=9222'
        ],
        browserWindowOptions: {
          webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            // Since Electron 12 `contextIsolation` defaults to `true`, which hides
            // Node globals (`require`, `global`, ...) from the renderer's main world.
            // The test bundle is built with `target: electron-renderer` and needs them.
            contextIsolation: false,
            sandbox: false
          }
        }
      }
    }
  });
};
