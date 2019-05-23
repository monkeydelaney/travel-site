var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify:false,
        server: {
            baseDir: "dist"
        }
    });
})

gulp.task('deleteDistFolder', function(){
    return del("./dist");
})

gulp.task('copyGeneralFiles', function() {
var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**',
    '!./app/assets/images/icons',
    '!./app/assets/images/icons/**/*'
]
return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./dist"))
})

gulp.task('optimizeImages', optimizeImages);
function optimizeImages() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*', '!./app/assets/images/*-i.jpg'])
    .pipe(imagemin({
        progresssive:true,
        interlaced: true,
        multipass:true
    }))
    .pipe(gulp.dest("./dist/assets/images"));
};

gulp.task('usemin', function() {
    return gulp.src("./app/index.html")
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./dist"));
})

gulp.task('build', gulp.series('deleteDistFolder', 'icons', 'styles','modernizr', 'scripts', 'copyGeneralFiles', 'optimizeImages', 'usemin'));