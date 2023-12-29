var gulp = require("gulp");
var scss = require("gulp-sass");
var scssLint = require("gulp-sass-lint");
var consolidate = require("gulp-consolidate");
var iconfont = require("gulp-iconfont");

gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("default", ["scss", "scss-lint"], function () {
  gulp.watch("src/**/*.scss", ["scss"]);
});

gulp.task("scss-lint", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(
      scssLint({
        configFile: ".sass-lint.yml",
      })
    )
    .pipe(scssLint.format())
    .pipe(scssLint.failOnError());
});

gulp.task("project-build", [
  "copy-html",
  "copy-js",
  "copy-img",
  "copyfonts",
  "copy-svg",
]);

gulp.task("copy-html", function () {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
});

gulp.task("copy-html", function () {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
});

gulp.task("copy-js", function () {
  return gulp.src("src/js/*.js").pipe(gulp.dest("dist/js"));
});

gulp.task("copy-img", function () {
  return gulp
    .src("src/images/*.{png,jpg,jpeg,svg,mp4}")
    .pipe(gulp.dest("dist/images"));
});
gulp.task("copy-svg", function () {
  return gulp
    .src("src/svg/*.{png,jpg,jpeg,svg}")
    .pipe(gulp.dest("dist/images"));
});

gulp.task("copyfonts", function () {
  return gulp
    .src("src/fonts/*.{woff,woff2}")
    .pipe(gulp.dest("dist/text-fonts"));
});

gulp.task("iconfont", function () {
  return gulp
    .src("src/svg/*.svg")
    .pipe(
      iconfont({
        fontName: "iconfont",
        formats: ["ttf", "eot", "woff", "woff2"],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true,
      })
    )
    .on("glyphs", function (glyphs, options) {
      gulp
        .src("src/iconfont-template/iconfont.scss")
        .pipe(
          consolidate("underscore", {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime(),
          })
        )
        .pipe(gulp.dest("src/scss/base/icon-font"));
    })
    .pipe(gulp.dest("dist/fonts"));
});
