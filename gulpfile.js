(function () {
  'use strict';

  var gulp = require('gulp');
  var requireDir = require('require-dir');
  var runSequence = require('run-sequence').use(gulp);

  // Import tasks from build folder
  requireDir('www/build/');

  // Define the default sass task to silence Ionic warnings
  gulp.task('sass', function callback() {
    return runSequence('compile-sass', callback);
  });
})();
