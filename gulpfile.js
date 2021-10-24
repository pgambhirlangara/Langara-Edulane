const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

// gulp.task("sass", () => {
//   return gulp
//     .src("./src/assets/sass/_main.scss")
//     .pipe(sass())
//     // .pipe(concat('style.css'))
//     .on("error", sass.logError)
//     .pipe(gulp.dest("./src/assets/css"))
// });


gulp.task( 'sass', function() {
  return gulp.src('./src/assets/sass/_main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/assets/css'))
});