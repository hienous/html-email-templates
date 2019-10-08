import gulp from 'gulp';
import browser from 'browser-sync';
import sass from 'gulp-sass';
import inky from 'inky';
import htmlmin from 'gulp-htmlmin';
var inlineCss = require('gulp-inline-css');

sass.compiler = require('node-sass');


gulp.task('default', gulp.series(parse, scss, css, minify, server));
gulp.task('css', gulp.series(parse2, css, minify, server));

function parse2() {
  return gulp.src('src/pagesCss/*.html')
    .pipe(inky())
    .pipe(gulp.dest('docs'));
}



function parse() {
  return gulp.src('src/pages/*.html')
    .pipe(inky())
    .pipe(gulp.dest('docs'));
}

function scss() {
  return gulp.src('src/assets/scss/*.scss', 'node_modules/foundation-emails/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('docs/css'));
}

function sasser() {
  return gulp.src('src/assets/scss/*.scss', 'node_modules/foundation-emails/scss/*.scss')
    .pipe(sass({
      includePaths: ['node_modules/foundation-emails/scss']
    }).on('error', sass.logError))
    .pipe(gulp.dest('docs/css'));
}

function css() {
  return gulp.src('./docs/*.html')
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: true,
      removeLinkTags: true,
      removeHtmlSelectors: true
    }))
    .pipe(gulp.dest('dist/'))
}

function minify() {
  return gulp.src('dist/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    })).pipe(gulp.dest('dist/'));
}

function server(done) {
  browser.init({
    server: 'dist'
  });
  done();
}

function watch() {

}

