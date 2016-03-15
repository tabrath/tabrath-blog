const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const livereload = require('gulp-livereload');

const source = path.resolve(__dirname, 'src');
const target = path.resolve(__dirname, 'dist');

gulp.task('js', (callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err)
      throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    livereload.changed('/bundle.js');
    callback();
  });
});

gulp.task('css', () => {
  return gulp.src(source + '/css/*.css')
    .pipe(gulp.dest(target + '/css'))
    .pipe(livereload());
});

gulp.task('img', () => {
  return gulp.src(source + '/img/*.*')
    .pipe(gulp.dest(target + '/img'))
    .pipe(livereload());
});

gulp.task('html', () => {
  return gulp.src(source + '/**/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest(target))
    .pipe(livereload());
});

gulp.task('server', ['build'], (callback) => {
  const app = require('./');
  app.on('ready', () => {
    app.listen(8080, (err) => {
      if (err)
        throw new gutil.PluginError('server', err);
      gutil.log('[server] listening on localhost:8080');
      callback();
    });
  });
});

gulp.task('build', ['html', 'css', 'img', 'js']);

gulp.task('watch', ['build', 'server'], () => {
  livereload.listen();

  gulp.watch(source + '/**/*.html', ['html']);
  gulp.watch(source + '/css/*.css', ['css']);
  gulp.watch(source + '/img/*.*', ['img']);
  gulp.watch(source + '/*js/*.js', ['js']);
});

gulp.task('default', ['build']);
