var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var hexrgba = require('postcss-hexrgba');
var webpack = require('webpack');
var modernizr = require('gulp-modernizr');

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

    watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts'));

    watch('./app/assets/scripts/**/*.js', function() {
        scripts();
        scriptsRefresh();
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
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error',function(errorInfo){
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
};

//scripts
gulp.task('modernizr', function(){
    return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
    .pipe(modernizr({
        "options": [
            "setClasses"
        ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});



gulp.task('scripts', scripts);
function scripts(){
    webpack(require('../../webpack.config.js'), function(err, stats){
        if (err) {
            console.log(err.toString());
        }
        console.log("\n" + stats.toString() + "\n");
    });
};

gulp.task('scriptsRefresh', scriptsRefresh);
function scriptsRefresh(){
    browserSync.reload();
};

    

