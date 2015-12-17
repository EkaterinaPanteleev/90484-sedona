"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cmq = require("gulp-combine-mq");
var minify = require("gulp-minify-css");
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var imagemin = require("gulp-imagemin");
var jsmin = require("gulp-jsmin");


gulp.task("style", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: "last 2 versions"})
    ]))
    .pipe(gulp.dest("source/css"));
});

gulp.task("compile", function() {
    gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(cmq())
    .pipe(postcss([
      autoprefixer({browsers: "last 2 versions"})
    ]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("copy", function() {
  return gulp.src(["source/img/**", "source/js/**", "source/index.html", "source/form.html", "source/post.html", "source/blog.html"], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("start", ["style"], function() {
  gulp.watch("source/less/**/*.less", ["style"]);
});

gulp.task("clean", function () {
  return gulp.src("build/*", {read: false})
    .pipe(clean());
});

gulp.task("compress", function() {
  gulp.src("source/img/*")
  .pipe(imagemin())
  .pipe(gulp.dest("build/img"));
});

gulp.task("jsmin", function () {
  gulp.src("source/js/**/*.js")
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("build/js"));
});

gulp.task('default', ['concat', 'uglify']);

// Оставьте эту строку в самом конце файла
require("./.gosha");
