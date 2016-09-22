var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
    .pipe(plumber(function(error){
      console.log(error.message);
      notify(error.message);
      this.emit('end');
    }))
    .pipe(sass({
      outputStyle: 'extended',
      includePaths: ['./scss'].concat(require('node-bourbon').includePaths)
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./scss'].concat(require('node-bourbon').includePaths)
    }))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify('Sass compiled succesfully'))
});

gulp.task('watch', function() {
  gulp.watch('scss/**/**/*.scss', ['sass']);
  gulp.watch('scss/**/bold.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
