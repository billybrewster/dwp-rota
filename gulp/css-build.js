var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var debug = require('gulp-debug');
var browserSync = require('browser-sync');

gulp.task('css-build', function() {
    'use strict';
    return gulp.src(gulpPaths.src.assets.scssApp)
        .pipe(debug({title: 'Compiling Sass file : '}))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ["> 0%"] }) ]))
        .pipe(gulp.dest(gulpPaths.dest.css))
        .pipe(browserSync.stream());
});

