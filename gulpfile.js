var gulp = require('gulp'), 
    sass = require('gulp-sass') ,
    sourcemaps = require('gulp-sourcemaps'),
    notify = require("gulp-notify") ,
    bower = require('gulp-bower');

var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components',
    jpsmRoot: './jspm_packages'
};

/*
// Downloads bower dependencies
// Don't need this since jspm handles that
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});
*/

// move fontawesome files to public folder so they're available
gulp.task('icons', function() { 
    return gulp.src(config.jspmRoot + 'npm/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('js', function(){
    return gulp.src([config.bowerDir + '/jquery/dist/jquery.min.js',
                    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js'])
        .pipe(gulp.dest('./public/js'));
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sass({
                 style: 'compressed',
                 loadPath: [
                     './resources/sass',
                     config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                     config.bowerDir + '/fontawesome/scss',
                 ]
             }) 
                .on("error", notify.onError(function (error) {
                     return "Error: " + error.message;
                 }))) 
         .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'js', 'css']);
