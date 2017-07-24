(function () {
  'use strict';

  var gulp = require('gulp');
  var stylelint = require('gulp-stylelint');

  var sassSource = [
      './www/js/**/*.s+(a|c)ss'
  ];

  gulp.task('lint-sass', function () {
      return gulp.src(sassSource)
          .pipe(stylelint({
              failAfterError: true,
              reporters: [{
                  formatter: 'string',
                  console: true
              }]
          }));
  });
})();
