var gulp = require("gulp");  
var ts = require("gulp-typescript");  
var tsProject = ts.createProject("tsconfig.json");
var replace = require('gulp-string-replace');
var convertEncoding = require('gulp-convert-encoding');
var yargs = require('yargs');

gulp.task("default", function() {
    var usuario = yargs.argv.usuario || 'main';
    console.log('Gerando deploy para: ' + usuario);

    async function asyncFunction() {
        await tsProject.src()
            .pipe(tsProject())
            .js
            .pipe(gulp.dest("dist"));

        await gulp.src('src/*.html')
            .pipe(convertEncoding({from: 'ISO-8859-1', to: 'UTF-8'}))
            .pipe(replace('/sites/DEV_LotePiloto/SiteAssets/JS/lotePiloto.js', '/sites/DEV_LotePiloto/SiteAssets/deploy/' + usuario + '/lotePiloto.js'))
            .pipe(convertEncoding({from: 'UTF-8', to: 'ISO-8859-1'}))
            .pipe(gulp.dest('dist'));

        await gulp.src('src/*.js')
            .pipe(gulp.dest('dist'));
    }

    return asyncFunction();
});
