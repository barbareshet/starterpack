const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


const nodeFolder = 'node_modules/';
const devFolder = 'dev/';
const distFolder = 'dist/';
const baseHTTP = 'http://localhost/twbs4/';

//Sass
gulp.task('sass', function () {
        return gulp.src([nodeFolder + 'bootstrap/scss/bootstrap.scss', devFolder + 'scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(distFolder + 'css'))
        .pipe(browserSync.stream());
});

//Move FA Fonts to dist folder
gulp.task('fonts',function () {
    return gulp.src(nodeFolder + 'font-awesome/fonts/*')
        .pipe(gulp.dest(distFolder + 'fonts'));
});
//Move FA Styles to dist folder
gulp.task('fa',function () {
    return gulp.src(nodeFolder + 'font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(distFolder + 'fonts'));
});

//JS
gulp.task('js',function () {
        return gulp.src([nodeFolder + 'bootstrap/dist/js/bootstrap.min.js', nodeFolder + 'jquery/dist/jquery.min.js', nodeFolder + 'popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest(distFolder + 'js'))
        .pipe(browserSync.stream());
});


//BrowserSync and watch

gulp.task('serve',['sass'],function () {
    browserSync.init({
        files: ['./**/*.html'],
        proxy: baseHTTP + 'starterpack'
    });
    gulp.watch([nodeFolder + 'bootstap/scss/bootstrap.scss', devFolder + 'scss/*.scss'], ['sass']);
    gulp.watch('starterpack/*.html').on('cahnge',browserSync.reload);
});


//Default gulp task

gulp.task('default',['js', 'serve', 'fa', 'fonts']);
