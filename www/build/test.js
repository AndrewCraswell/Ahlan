(function () {
    'use strict';

    var gulp = require('gulp');
    var Server = require('karma').Server;
    var path = require('path');

    gulp.task('test', function () {
        new Server({
            configFile: path.join(__dirname, '../../', 'karma.config.js'),
            singleRun: true
        }, function (exitCode) {
            process.exit(exitCode);
        }).start();
    });
})();
