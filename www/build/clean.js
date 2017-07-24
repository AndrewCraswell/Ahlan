(function () {
    'use strict';

    var gulp = require('gulp');
    var del = require('del');
    var vinylPaths = require('vinyl-paths');

    var paths = [
        './www/css/',
        './www/dist/',
        './www/build/coverage/**/*',
        './www/build/test-runs/**/*.trx',
    ];

    // deletes all files in the output path
    gulp.task('clean', function () {
        return gulp.src(paths)
          .pipe(vinylPaths(del));
    });

})();
