(function () {
  'use strict';

  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var cleanCss = require('gulp-clean-css');
  var rename = require('gulp-rename');

  var paths = [
    './scss/ionic.app.scss',
    './scss/oneRefuge.app.scss'
  ];

  gulp.task('compile-sass', function(done) {
    gulp.src(paths)
      .pipe(sass().on('error', sass.logError))
      .on('error', sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(cleanCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
  });
})();
