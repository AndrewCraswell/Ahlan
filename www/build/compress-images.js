(function () {
  'use strict';

  var gulp = require('gulp');
  var image = require('gulp-image');

  gulp.task('compress-images', function () {
    gulp.src('./www/**/*.{png,svg,jpg,jpeg,gif}', { base: './' })
      .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: false,
        jpegRecompress: false,
        jpegoptim: true,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true,
        concurrent: 10
    }))
      .pipe(gulp.dest('./'));
  });
})();
