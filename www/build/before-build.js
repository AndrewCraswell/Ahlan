(function () {
  'use strict';

  var gulp = require('gulp');
  var runSequence = require('run-sequence').use(gulp);

  // Task for the BeforeBuild target
    gulp.task('before-build', function (callback) {
        return runSequence('clean', 'lint', 'test', callback);
    });
})();
