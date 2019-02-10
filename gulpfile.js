'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');

gulp.task("concatScripts", done => {
    return gulp.src([
        'js/circle/autogrow.js',
        'js/circle/circle.js',
        'js/global.js'])
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("js"));
        done();
});

gulp.task("minifyScripts", done => {
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'))
        done();
});

gulp.task('compileSass', done => {
    return gulp.src("sass/global.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        done();
})

gulp.task('watchSass', function() {
    gulp.watch('scss/**/*.scss', series('compileSass'));
})

gulp.task("build", gulp.series('concatScripts', 'minifyScripts', 'compileSass'));

gulp.task("default", gulp.series('build'));