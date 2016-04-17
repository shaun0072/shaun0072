"use strict";

var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    maps         = require('gulp-sourcemaps'),
    del          = require('del'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
	browserSync  = require('browser-sync'),
	cssmin       = require('gulp-cssmin');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery-2.1.4.min.js',
		'js/nav-modal.js',
		'js/project-info-reveal.js',
		'js/back-to-top.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("dist/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/style.scss")
      .pipe(maps.init())
	  .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('minifyCSS', ['compileSass'], function() {
	return gulp.src('css/style.css')
		.pipe(cssmin())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('sass-watch', ['minifyCSS'], browserSync.reload);

gulp.task('scripts-watch', ['minifyScripts'], browserSync.reload);

gulp.task('watchFiles', function() {
  browserSync({
	  server: {
		  baseDir: './'
	  }
  });
  gulp.watch('scss/**/*.scss', ['sass-watch']);
  gulp.watch('js/*.js', ['scripts-watch']);
})

gulp.task('clean', function() {
  del(['dist', 'css/style.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'minifyCSS'], function() {
  return gulp.src(["css/style.css", "js/app.min.js", 'index.html', 'about.html', 'portfolio.html',
                   "assets/img/**", "assets/svg/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["build"]);