var gulp 		= require('gulp'),
	concat 		= require('gulp-concat'),
	stylus 		= require('gulp-stylus'),
	minifycss 	= require('gulp-cssmin'),
	rename 		= require('gulp-rename'),
	uglify		= require('gulp-uglify'),
	bowerFiles 	= require('main-bower-files'),
	watch 		= require('gulp-watch'),
	nodemon 	= require('gulp-nodemon'),
	autoprefixer= require('gulp-autoprefixer'),
	raster 		= require('gulp-raster'),
	jade 		= require('gulp-jade'),
	gulpShell 	= require('gulp-shell'),
	criticalcss	= require('criticalcss')

var browserify 	= require('browserify'),
	source 		= require("vinyl-source-stream"),
	babelify 	= require("babelify"),
	buffer 		= require('vinyl-buffer'),
	React 		= require('react');

require("node-jsx").install();

//		var App 		= React.createFactory(require('./assets/jsx/app.jsx')),
//		reactString 	= React.renderToString(App()),
function convertJade(isProduction, isStatic) {
	
	reactString = "",
	locals 		= {production: false, static: false, reactString: reactString}

	if (isProduction)
		locals.production = true
	if (isStatic)
		locals.static = true

	console.log(locals)
	
	gulp.src('./lib/views/index.jade')
		.pipe(jade({locals: locals}))
		.pipe(gulp.dest('./lib/views/build/'))
}

gulp.task('react', function(){
	browserify({
		entries: './assets/jsx/index.jsx',
		debug: true
	})
	.transform(babelify.configure({stage: 0}))
	.bundle()
	.pipe(source('bundle.react.js'))
	.pipe(gulp.dest('./public/js'))
	.pipe(buffer())
	.pipe(uglify())
	.on('error', console.log.bind(console))
	.pipe(rename('bundle.react.min.js'))
	.pipe(gulp.dest('./public/js/min'))
});

gulp.task('personal', function(){
	gulp.src(['./assets/js/*.js', '!./assets/js/*.exclude.js'])
		.pipe(concat('personal.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(uglify())
		.on('error', console.log.bind(console))
		.pipe(rename('personal.min.js'))
		.pipe(gulp.dest('./public/js/min'))

	gulp.src('./assets/js/*.exclude.js')
		.pipe(concat('pre.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(uglify())
		.on('error', console.log.bind(console))
		.pipe(rename('pre.min.js'))
		.pipe(gulp.dest('./public/js/min'))
});

gulp.task('stylus',function(){
	gulp.src('./assets/stylus/*.styl')
		.pipe(stylus())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(concat('final.css'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(minifycss())
		.pipe(rename('final.min.css'))
		.pipe(gulp.dest('./public/css/min'))
});

gulp.task('bower', function() {
	gulp.src(bowerFiles())
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(uglify())
		.pipe(rename('vendor.min.js'))
		.pipe(gulp.dest('./public/js/min'))
});

gulp.task('jade', function() {
	convertJade(false)
});

gulp.task('build', ['react', 'stylus', 'bower', 'personal'], function(){

	var jsfiles = [
		"./public/js/pre.js",
		"./public/js/vendor.js",
		"./public/js/bundle.react.js",
		"./public/js/personal.js"
	]

	gulp.src(jsfiles)
		.pipe(concat('final.js'))
		.pipe(gulp.dest('./public/js/build'))
		.pipe(uglify())
		.pipe(rename('final.min.js'))
		.pipe(gulp.dest('./public/js/build'))

	convertJade(true)
});

gulp.task('watch', ['react', 'stylus', 'bower', 'personal', 'jade'], function(){
	gulp.watch('./assets/jsx/**/*.jsx', ['react']);
	gulp.watch('./assets/js/*.js', ['personal']);
	gulp.watch('./assets/stylus/*.styl',['stylus']);
	gulp.watch('./lib/views/**/*',['jade']);

});

gulp.task('rasterize', function(){
	gulp.src('./public/img/logos/*.svg')
		.pipe(raster({scale:2}))
		.pipe(rename({extname: '.png', suffix: '@2x'}))
		.pipe(gulp.dest('./public/img/logos'))
});

gulp.task('criticalcss', function(){

	var request 	= require('request'),
		path 		= require('path'),
		criticalcss = require('criticalcss'),
		fs 			= require('fs'),
		tmpDir 		= require('os').tmpdir();

	var cssUrl = 'http://localhost:3000/css/min/final.min.css';
	var cssPath = path.join( tmpDir, 'style.css' );
	
	request(cssUrl).pipe(fs.createWriteStream(cssPath)).on('close', function() {
		criticalcss.getRules(cssPath, function(err, output) {
			if (err) throw new Error(err);
			else {
				criticalcss.findCritical("http://localhost:3000/", { rules: JSON.parse(output), width:1920, height:1200, ignoreConsole:true }, function(err, criticalCSSOutput) {
					if (err) throw new Error(err);
					else fs.writeFileSync('./lib/views/includes/critical.css', criticalCSSOutput);
		        })
			}
		});
	});
});

gulp.task('deploy', ['build'], gulpShell.task([
	'echo deploying',
	'forever stopall',
	'forever start app.js'
]));

gulp.task('static-build', function() {

	convertJade(false, true)
	//copy image static assets
	gulp.src('./public/img/**/*')
		.pipe(gulp.dest('./static-build/img'))

	//copy final build js script
	gulp.src('./public/js/build/final.min.js')
		.pipe(gulp.dest('./static-build/js/'))

	//copy final build css stylesheet
	gulp.src('./public/css/min/final.min.css')
		.pipe(gulp.dest('./static-build/css/'))

	//copy final build HTML
	gulp.src('./lib/views/build/index.html')
		.pipe(gulp.dest('./static-build/'))



});

gulp.task('default', ['watch'], function() {
	var config = {
		script: 'app.js',
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	}

	nodemon(config)
		.on('restart', function() {
			console.log('server restarting')
		})
})