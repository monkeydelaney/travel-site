var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');

gulp.task('default', function(done){
    console.log("Gulp Task Created");
    done();
});

gulp.task('html', html);
function html(done) {
    console.log("HTML task is done");
    if (done) done();
};

gulp.task('styles', styles);
function styles(done) {
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
    
};

gulp.task('watch', function(){
    watch('./app/index.html', function() {
        html();
    });

    watch('./app/assets/styles/**/*.css', function(){
        styles();
    });
});

