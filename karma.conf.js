// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files : [
      './web/js/lib/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './web/js/lib/angular-ui-router.js',
      './web/js/lib/angular-messages.js',
      './web/js/lib/angular-animate.js',
      './web/main.js',
      './web/js/services/**/*.js',
      './web/js/states/**/*.js',
      './web/js/directives/**/*.js',
      './frontend-tests/specs/*.spec.js'
    ],
    autoWatch : false,
    singleRun : true,
    browsers : ['Chrome']
  });
};