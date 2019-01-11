var gulp = require("gulp");
var ts = require("gulp-typescript");
var replace = require('gulp-string-replace');
var yargs = require('yargs');
var watch = require('gulp-watch');
var shell = require('gulp-shell');

var usuario = yargs.argv.usuario || 'main';

gulp.task('build-ts', function () {
    var tsProject = ts.createProject("tsconfig.json");

    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("dist"));
});

gulp.task('build-js', function () {
    return gulp.src('src/JS/*.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-html', function () {
    return gulp.src('src/HTML/*.html')
        .pipe(replace('/sites/DEV_LotePiloto/SiteAssets/deploy/main/JS/lotePiloto.js', '/sites/DEV_LotePiloto/SiteAssets/deploy/' + usuario + '/JS/lotePiloto.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.parallel('build-ts', 'build-js', 'build-html'));
gulp.task('deploy', shell.task('node dist/app.js --usuario ' + usuario));
gulp.task('default', gulp.series('build', 'deploy'));

gulp.task('watch', function () {
    return watch(['src/*.html', 'src/*.js'], gulp.series('build', 'deploy'));
});
