const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

gulp.task("sass", () => {
  return gulp
    .src("src/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(concat('style.css'))
    .on("error", sass.logError)
    .pipe(gulp.dest("src/assets/css"))
});

