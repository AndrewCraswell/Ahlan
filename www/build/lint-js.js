(function () {
  'use strict';

  var gulp = require('gulp');
  var eslint = require('gulp-eslint');

  var jsPaths = [
    './www/js/**/*.js',
    './www/build/**!(bin)/*.js'
  ];

  gulp.task('lint-js', function () {
      return gulp.src(jsPaths)
          .pipe(eslint({
              warnFileIgnored: true
          }))
          .pipe(eslint.format('stylish'))
          .pipe(eslint.failAfterError());
  });
})();
