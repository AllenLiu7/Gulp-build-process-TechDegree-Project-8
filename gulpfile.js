'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const del = require('del');
const webserver = require('gulp-webserver');
const connect = require('gulp-connect');


const paths = {
    styles: {
      src: 'sass/**/*.scss',
      dest: 'dist/styles'
    },
    scripts: {
      src: 'js/**/*.js',
      dest: 'dist/scripts'
    },
    images: {
        src: 'images/**',
        dest: 'dist/content'
      }
};


function styles() {
    return gulp
        .src(paths.styles.src, {
            sourcemaps: true
            })
        .pipe(sass())
        .pipe(rename({
            basename: 'all',
            suffix: '.min'
            }))
        .pipe(cleanCSS({debug: true}))
        .pipe(concat('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
    return gulp
        .src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest));
}

function server (cb) {
        connect.server({
        root: './',
        port: 3000,
        livereload: true
        });
        cb()
    };

function watch() {
        gulp.watch(paths.scripts.src, scripts);
        gulp.watch(paths.styles.src, styles);
    }

function clean(cb) {
        del('dist');
        cb()
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, images));

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.server = server;
exports.build = build;
exports.default = gulp.series(build, server, watch);
