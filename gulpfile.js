'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create();

// build
gulp.task('build', function () {

    gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

// bower
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/bower_components'
    }))
    .pipe(gulp.dest('./app'));
});

// browser-sync
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './app'
    });

    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/js/**/*.*').on('change', browserSync.reload);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});

// sass
gulp.task('sass', function() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 3 version','> 5%']))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
});

// watch
gulp.task('watch', function () {
    
    gulp.watch('./src/sass/*.scss', [sass]);
});

// default
gulp.task('default', ['serve']);