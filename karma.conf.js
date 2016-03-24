// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files : [
      './web/js/lib/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './web/js/lib/angular-ui-router.js',
      './web/js/main.js',
      './web/js/**/*.js',
      './frontend-tests/specs/*.spec.js'
    ],
    autoWatch : false,
    singleRun : true,
    browsers : ['Chrome']
  });
};