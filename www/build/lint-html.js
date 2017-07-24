(function () {
  'use strict';

  var gulp = require('gulp');
  var htmlhint = require('gulp-htmlhint');

  var htmlSource = [
    './www/js/**/*.html',
  ];

  gulp.task('lint-html', function () {
    return gulp.src(htmlSource)
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.reporter('htmlhint-stylish'))
      .pipe(htmlhint.failReporter({ suppress: true }));
  });
})();
