const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const del = require("del");
const browserSync = require("browser-sync").create();

const paths = {
  styles: {
    src: "src/scss/style.scss",
    dest: "docs/css"
  },
  html: {
    src: "src/*.html",
    dest: "docs/"
  },
  js: {
    src: ["src/js/picturefill.min.js", "src/js/main-navigation.js"],
    dest: "docs/js"
  },
  images: {
    src: "src/images/**"
  },
  fonts: {
    src: "src/fonts/**"
  },
  favicon: {
    rootIcon: "src/favicon.ico",
    config: "src/*.{xml,webmanifest}",
    icons: "src/images/favicon/*.{png,svg}"
  },
  base: "src",
  dest: "docs"
};

// CSS task
function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on(
      "error",
      notify.onError(error => "Problem here: " + error.message)
    )
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// HTML task
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// JS task
function js() {
  return gulp
    .src(paths.js.src)
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// BrowserSync Reload
function reload(done) {
  browserSync.reload();
  done();
}

// Watch files
function watch() {
  browserSync.init({
    server: {
      baseDir: paths.dest
    },
    notify: false
  });

  gulp.watch(paths.styles.src, style);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.js.src, js);
}

function clean() {
  return del(paths.dest);
}

function copy() {
  return gulp
    .src(
      [
        paths.images.src,
        paths.fonts.src,
        paths.favicon.rootIcon,
        paths.favicon.config,
        paths.favicon.icons
      ],
      { base: paths.base }
    )
    .pipe(gulp.dest(paths.dest));
}

const build = gulp.series(clean, copy, style, html, js);

gulp.task("default", gulp.series(build, watch));

exports.watch = watch;
exports.style = style;
exports.html = html;
exports.js = js;
exports.clean = clean;
exports.copy = copy;
exports.build = build;
