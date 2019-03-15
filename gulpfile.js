const gulp           = require('gulp');
const gutil          = require('gulp-util');
const browserSync    = require('browser-sync');
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglify');
const cleanCSS       = require('gulp-clean-css');
const rename         = require('gulp-rename');
const autoprefixer   = require('gulp-autoprefixer');
const notify         = require("gulp-notify");
const preproc        = require('gulp-less');
const gcmq           = require('gulp-group-css-media-queries');

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function() {
	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
		// 'app/libs/jquery/jquery.viewportchecker.min.js',
		// 'app/libs/jquery/owl.carousel.min.js',
		'app/js/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('preproc', function() {
	gulp.src('app/less/style.less')
		.pipe(preproc({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(gcmq())
		/*.pipe(rename({suffix: '.min', prefix : ''}))*/
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleanCSS({
		// 	level: 2
		// })) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['preproc', 'js', 'browser-sync'], function() {
	gulp.watch('app/less/**/*.less', ['preproc']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
