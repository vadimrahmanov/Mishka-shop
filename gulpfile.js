"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var htmlmin = require("gulp-htmlmin");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();
var del = require("del");

// CSS

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// HTML

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest("build"));
  });

  // JavaScript

  gulp.task("script", function () {
    return gulp.src("./source/js/*.js")
      .pipe(concat("scripts.js"))
      .pipe(uglify())
      .pipe(rename("scripts.min.js"))
      .pipe(gulp.dest("build/js"));
  });

// Images optimization

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 7}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
  });

// WebP

  gulp.task("webp", function () {
    return gulp.src("source/img/**/*.{png,jpg}")
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest("source/img"));
  });

// SVG Sprite

  gulp.task("sprite", function () {
    return gulp.src("source/img/*.svg")
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img"));
    });

// Build cleaner

gulp.task("clean", function () {
  return del("build");
  });

// Copy to build

gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/js/**",
  "source/*.ico",
  "source/*.html"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
});

// Server

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("script", "refresh"));
  });

  // Refresh

  gulp.task("refresh", function (done) {
    server.reload();
    done();
    });

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html", "script"));
gulp.task("start", gulp.series("build", "server"));
