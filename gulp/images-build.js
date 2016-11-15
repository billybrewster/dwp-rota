var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var debug = require('gulp-debug');

gulp.task('images-build', function() {
    'use strict';
    return gulp.src(gulpPaths.src.assets.images)
        .pipe(debug({title: 'Copying image file : '}))
        .pipe(copy())
        .pipe(gulp.dest(gulpPaths.dest.images));
});

