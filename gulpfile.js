var pkg = require('./package.json'),
	gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	inline = require('gulp-inline'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	replace = require('gulp-replace-task');

const config = require('./config.json')

// wp, html, psd
var build_for = 'for_' + config.buildFor[0];

var name = config.name,
		slug = config.slug,
		demoUrl = config.demoUrl,
		purchaseUrl = config.purchaseUrl,
		changelogUrl = config.changelogUrl,
		authorUrl = config.authorUrl,
		supportUrl = config.supportUrl;

gulp.task('stylus', function() {
	return gulp.src('public/css/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('public/css/'));
});

gulp.task('build', function() {
	return gulp.src('public/'+build_for+'.html')
	.pipe(inline({
		base: 'public/',
		js: uglify,
		css: [
			minifyCss,
			autoprefixer({
				browsers:['last 2 versions']
			})
		],
	}))
	.pipe( replace( {
		patterns: [
			{
				match: 'name',
				replacement: name
			},
			{
				match: 'slug',
				replacement: slug
			},
			{
				match: 'demoUrl',
				replacement: demoUrl
			},
			{
				match: 'purchaseUrl',
				replacement: purchaseUrl
			},
			{
				match: 'changelogUrl',
				replacement: changelogUrl
			},
			{
				match: 'authorUrl',
				replacement: authorUrl
			},
			{
				match: 'supportUrl',
				replacement: supportUrl
			},
			{
				match: 'author',
				replacement: pkg.author
			}
		]
	}))
	.pipe(rename('index.html'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('public/css/style.styl', ['stylus']);
});

gulp.task('default', ['watch']);