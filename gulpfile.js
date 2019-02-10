'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');

gulp.task("concatScripts", done => {
    gulp.src([
        'js/circle/autogrow.js',
        'js/circle/circle.js',
        'js/global.js'])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("js"));
    done();
});

gulp.task("minifyScripts", done => {
    gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'))
        done();
});

gulp.task('compileSass', done => {
    gulp.src("sass/global.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        done();
})

gulp.task("default", function() {
    console.log("the default task")
});