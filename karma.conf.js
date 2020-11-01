// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files : [
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/angular-messages/angular-messages.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './web/main.js',
      './web/js/services/**/*.js',
      './web/js/states/**/*.js',
      './web/js/directives/**/*.js',
      './frontend-tests/specs/cart-service.spec.js',
      './frontend-tests/specs/avatar-directive.spec.js',
      './frontend-tests/specs/records-service.spec.js',
    ],
    autoWatch : false,
    singleRun : true,
    browsers : ['Chrome']
  });
};
