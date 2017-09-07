//加载gulp
var gulp = require('gulp');
//加载压缩html插件
var html = require('gulp-htmlmin');
//加载压缩js
var uglify = require('gulp-uglify');
//加载压缩css
var cleanCss = require('gulp-clean-css');
//加载合并
var concat = require('gulp-concat');
//加载修改名
var rename = require('gulp-rename');
//编译
var less = require('gulp-less');
//1.编译less,对变异后的结果进行压缩
gulp.task('less', function() {
    gulp.src('src/less/*.less') //读取文件
        .pipe(less())
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/less'))

});
//2.压缩html
gulp.task('html', function() {
    gulp.src('src/*.html') //读取
        .pipe(html({ //处理工序
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist')) //写
});
//压缩js
gulp.task('js', function() {
    gulp.src('src/js/*.js') //读取
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist')) //写

});
//默认任务，监听文件变化，调用相关的任务在重复处理
gulp.task('default', function() {
    //任务一执行，所有任务都自动执行
    gulp.run(['less', 'html', 'js'])
        //然后任务文件变化时，对应的任务在自动执行
    gulp.watch('src/less/*.less', function() {
        //内容变化了，再重新调用执行
        gulp.run('less');
    });
    gulp.watch('src/css/*.css', function() {
        gulp.run('html');
    });
    gulp.watch('src/js/*.js', function() {
        gulp.run('js')
    })
})