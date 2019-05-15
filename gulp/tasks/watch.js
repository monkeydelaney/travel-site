var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');

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

    watch('./app/assets/styles/**/*.css', function(){
        styles();
        cssInject();
    });
});

gulp.task('cssInject', cssInject);
function cssInject(){
    return gulp.src('./app/temp/styles/styles.css').pipe(browserSync.stream());
};

gulp.task('styles', styles);
function styles(done) {
    console.log("CSS Updated");
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error',function(errorInfo){
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
};