var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
/*
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var hexrgba = require('postcss-hexrgba');
var webpack = require('webpack');
var modernizr = require('gulp-modernizr');
*/

gulp.task('watch', function(){
    browserSync.init({
        notify:false,
        server: {
            baseDir: "app"
        }
    });
    watch('./app/index.html', function() {
        browserSync.reload();
        //html();
    });

    watch('./app/assets/styles/**/*.css', gulp.series('styles','cssInject'));
    
    watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts'));

});

gulp.task('cssInject', cssInject);
function cssInject(){
    return gulp.src('./app/temp/styles/styles.css').pipe(browserSync.stream());
};