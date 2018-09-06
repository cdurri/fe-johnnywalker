'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
       del = require('del'),
   tinypng = require('gulp-tinypng'),
     babel = require('gulp-babel'),
sourcemaps = require('gulp-sourcemaps'),
       pug = require('gulp-pug'),
autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
browserSync = require('browser-sync').create();

gulp.task("concatScripts", function() {
  return gulp.src(['src/externals/**/*.js', 'src/sections/**/*.js'])
      .pipe(sourcemaps.init())
      .pipe(concat("main.js"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("src/js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("src/js/main.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest("assets/js"));
});

gulp.task('compileSass', function() {
  return gulp.src("src/scss/main.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('src/scss'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('minifyCss', function() {
  return gulp.src("src/scss/main.css")
      .pipe(minify())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('compressImages', function() {
    gulp.src('src/img/*')
        .pipe(tinypng('vHR3peFJDX89CSBttBzaN1ucq2fOP1_l'))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('moveMarkup', function() {
  gulp.src('src/*.html')
      .pipe(gulp.dest('assets'));
})

gulp.task('watchFiles', ['browserSync'], function() {
  gulp.watch(['src/sections/**/*.scss', 'src/scss/**/*.scss'], ['compileSass']);
  gulp.watch(['src/externals/**/*.js', 'src/sections/**/*.js'], ['concatScripts']);
  gulp.watch(['src/*.pug', 'src/**/*.pug'], ['pug']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('clean', function() {
  del(['dist', 'assets/css/main.min.css', 'assets/js/main.min.js']);
});

gulp.task('pug', function buildHTML() {
  return gulp.src(['src/*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./src'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build', ['minifyScripts', 'minifyCss', 'moveMarkup'], function() {
  return gulp.src(["assets/css/main.min.css", "assets/js/main.min.js", 'assets/*.html',
                   "assets/img/*"], { base: './' })
              .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ['clean'], function() {
  gulp.start('build');
});
