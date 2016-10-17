'use strict';
import gulp from 'gulp';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import jshint from 'gulp-jshint';
import livereload from 'gulp-livereload';
import less from 'gulp-less';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import minifycss from 'gulp-minify-css';
import del from 'del';
import watch from 'gulp-watch';

const itemFolder = 'mysecondwx';

//js检查,合并，压缩公共js文件
gulp.task('copyjs', ()=>{
	gulp.src(['../src/**/*.js', '../src/**/*.json'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('../../' + itemFolder + ''))
});

gulp.task('rename', ()=>{
	gulp.src(['../src/pages/**/*.html'])
		.pipe(rename((path)=>{
			path.extname = '.wxml'
		}))
		.pipe(gulp.dest('../../' + itemFolder + '/pages'))
});

gulp.task('less', ()=>{
	gulp.src(['../src/**/*.less'])
		.pipe(less())
		.pipe(autoprefixer({browsers: ['last 2 versions', 'ff 18', 'safari 5','ie 8','ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(rename((path)=>{
			path.extname = '.wxss'
		}))
		.pipe(gulp.dest('../../' + itemFolder + ''))
});

//图片压缩
gulp.task('images', ()=>{
	return gulp.src(['../src/images/**/*.*'])
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true,svgoPlugins: [{removeViewBox: false}],use: [pngquant()]})))
		.pipe(gulp.dest('../../' + itemFolder + '/images'))
});

//清除图片缓存
gulp.task('cleanCash', function (done) {  
    return cache.clearAll(done);  
});  

//压缩前删除原来文件夹里的内容
gulp.task('del', function(cb){
	del.sync(['../../' + itemFolder + '/'], {force: true});
});

// 默认任务
gulp.task('default', function(){
	gulp.run('images', 'copyjs', 'rename', 'less');
	gulp.watch('../src/pages/**/*.html', ['rename']);
	gulp.watch('../src/**/*.js', ['copyjs']);
	gulp.watch('../src/**/*.json', ['copyjs']);
	gulp.watch('../src/**/*.less', ['less']);
	gulp.watch('../src/images/**/*.*', ['images']);
});