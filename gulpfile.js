var gulp 			= require("gulp"),
		sass 			= require("gulp-sass"),
		jade 			= require("gulp-jade"),
		borowsSync= require("browser-sync"),
		concat 		= require("gulp-concat"),
		uglifyjs 	= require("gulp-uglifyjs"),
		cssnano 	= require("gulp-cssnano"),
		rename 		= require("gulp-rename"),
		del 			= require("del"),
		pngquant 	= require("imagemin-pngquant"),
		imagemin 	= require("gulp-imagemin"),
		gulpCache = require ("gulp-cache"),
		prefixer 	= require("gulp-autoprefixer"),
		zip				= require("gulp-zip"),
		babel     = require("gulp-babel"),
		replace = require("gulp-replace");

var fs = require("fs");
var json = JSON.parse(fs.readFileSync('./package.json'));

gulp.task("es6", function() {
	return gulp.src("app/js/es6.js")
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(rename("es6compile.js"))
	.pipe(gulp.dest("app/js"));
});

gulp.task("sass", function() {
	return gulp.src("app/sass/**/*.sass")
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest("app/css"))
	.pipe(borowsSync.reload({stream: true}))
});

gulp.task("jade", function() {
	return gulp.src("app/jade/**/*.jade")
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest("app"))
});

gulp.task("scripts", function() {
	return gulp.src([
		'app/libs/jquery-2.2.1.min.js',
		'app/libs/bootstrap/js/bootstrap.min.js',
		'app/libs/datetimepicker-master/jquery.datetimepicker.min.js',
		'app/libs/fancybox/jquery.fancybox.pack.js',
		'app/libs/jquery.maskedinput.min.js',
		'app/libs/parallax.min.js',
		'app/libs/WOW/wow.min.js',
		'app/libs/jquery.validate.min.js',
		"app/libs/slick/slick.js",
		'app/libs/stellar/jquery.stellar.min.js',
		'app/libs/materialinputs/jquery.polymer-form.min.js',
		'app/libs/intlTel/build/js/intlTelInput.js',
        'app/libs/timer/jquery.time-to.min.js'
	])
	.pipe(concat("libs.min.js"))
	.pipe(uglifyjs())
	.pipe(gulp.dest("app/js"))
});

gulp.task("cssLibs", ['sass'], function() {
	return gulp.src("app/css/vendors/vendors.css")
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest("app/css"))
});

gulp.task("borowsSync", function() {
	borowsSync({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task("watch", ['borowsSync', 'jade', 'cssLibs', 'es6', 'scripts'], function() {
	gulp.watch("app/sass/**/*.sass", ['sass']);
	gulp.watch("app/jade/**/*.jade", ['jade']);
	gulp.watch("app/js/**/*.js", ["es6"]);
	gulp.watch("app/*.html", borowsSync.reload);
	gulp.watch("app/css/index.css", borowsSync.reload);
	gulp.watch("app/js/**/*.js", borowsSync.reload);
});

gulp.task("clear", function() {
	return cache.clearAll();
});

gulp.task("default", ['watch']);

//build
gulp.task("clean", function() {
	return del.sync("dist");
});

gulp.task("imgminImages", function() {
	return gulp.src("app/img/**/*")
	.pipe(gulpCache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest("dist/img"));
});

gulp.task("imgminUploads", function() {
	return gulp.src("app/upload/**/*")
	.pipe(gulpCache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest("dist/upload"));
});

//zip
gulp.task("zip", function() {
	return gulp.src("dist/*")
	.pipe(zip('archiveProject.zip'))
	.pipe(gulp.dest('dist/../'));
});

//build task
gulp.task("build", ['clean', 'imgminImages', 'imgminUploads'], function() {
	var buildCss = gulp.src([
		'app/css/vendors.min.css',
		'app/css/index.css'
	])
	.pipe(gulp.dest('dist/css'));
	
	gulp.src(["app/css/fonts/*"])
	.pipe(gulp.dest("dist/css/fonts"));
	
	gulp.src(["app/css/ajax-loader.gif"])
	.pipe(gulp.dest("dist/css/"));

	gulp.src('app/fonts/**/*')
	.pipe(gulp.dest("dist/fonts"));

	gulp.src(["app/js/es6compile.js", "app/js/libs.min.js"])
	.pipe(gulp.dest("dist/js"));

	gulp.src("app/*.html")
	.pipe(gulp.dest("dist"));

	gulp.src("app/favicons/**/*")
	.pipe(gulp.dest("dist/favicons"));

	gulp.src("app/favicon.ico")
	.pipe(gulp.dest("dist"));
	
	gulp.src("app/index.html")
	.pipe(replace(/src="\/?upload/g, "src=" + '"' + "/upload/landing/" + json.name  + "/upload"))
	.pipe(gulp.dest("dist/"));
});