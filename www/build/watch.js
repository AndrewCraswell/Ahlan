(function () {
  'use strict';

  var gulp = require('gulp');

  var paths = {
    sass: ['./scss/**/*.scss']
  };

  gulp.task('watch', ['compile-sass'], function() {
    gulp.watch(paths.sass, ['compile-sass']);
  });
})();
