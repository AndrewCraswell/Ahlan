(function () {
  'use strict';

  var gulp = require('gulp');

  gulp.task('lint', [
      'lint-js',
      'lint-sass',
      'lint-html'
  ]);
})();
