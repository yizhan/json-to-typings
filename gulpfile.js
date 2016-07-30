/**
 * Created by yizhanwang on 30/07/16.
 */

var gulp = require('gulp');
var fs = require('fs');
var tap = require('gulp-tap');
var path = require('path');

function myFunction (file) {
    console.log(file);
    return file
}

// var File = require('vinyl');
//
// var coffeeFile = new File({
//     cwd: "/",
//     base: "/test/",
//     path: "/test/file.coffee",
//     contents: new Buffer("test = 123")
// });

gulp.task('default', () => {
    console.log('starting');

    var fileContent = fs.readFileSync("test.json", "utf8");

    return gulp.src('test.json')
        .pipe(tap(function(file, t) {

            file.contents = Buffer.concat([
                new Buffer('HEADER'),
                file.contents
            ]);

            console.log(file.contents);
            return file
        }))
        .pipe(gulp.dest('dest'));
});