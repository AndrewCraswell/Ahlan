(function () {
  'use strict';

  var gulp = require('gulp');
  var order = require('gulp-order');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var pump = require('pump');

  var paths = [
    'www/js/**/*.module.js',
    'www/js/**/*.js'
  ];

  gulp.task('bundle-js', function() {
    return pump([
      gulp.src(paths),
      order(paths),
      concat('app.bundle.min.js'),
      uglify({ mangle: false }),
      gulp.dest('./www/dist/'),
    ]);
  });
})();
