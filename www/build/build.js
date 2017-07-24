(function () {
  'use strict';

  var gulp = require('gulp');
  var runSequence = require('run-sequence').use(gulp);

  gulp.task('build', ['before-build'], function callback() {
    return runSequence([
      'compile-sass',
      'bundle-js',
      'compress-images',
    ], 'after-build', callback);
  });
})();
