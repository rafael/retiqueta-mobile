// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-10-15 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine",
      "browserify",
    ],

    // list of files / patterns to load in the browser
    files: [
      "vendors/ionic/js/ionic.bundle.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "test/spec/**/*.js",
      "www/**/*.js",
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 9090,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      //"PhantomJS"
      "Chrome"
    ],

    preprocessors: {
      'test/spec/**/*.js': [ 'browserify' ] //Mention path as per your test js folder
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify']
      ]
    },

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-chrome-launcher",
      "karma-jasmine",
      'karma-browserify',
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
