var gulp = require('gulp');
var gutil = require('gulp-util'); //utility functions for gulp. Logs messages etc...
var source = require('vinyl-source-stream'); 
// Basically you can say that vinyl-source-stream convert the readable stream you get from browserify into a 
// vinyl stream that is what gulp is expecting to get. A vinyl stream is a Virtual file format, and it 
// is fundamental for Gulp. Thanks to this vinyl streams Gulp doesnt need to write a temporal file between 
// different transformations. And this is one of the main advantages it have over Grunt.
var browserify = require('browserify');

// Browserify is a development tool that allows us to write node.js-style modules that compile for use in 
// the browser. Just like node, we write our modules in separate files, exporting external methods and
// properties using the module.exports and exports variables.
var watchify = require('watchify');
var reactify = require('reactify'); //plugin for gulp to transform react jsx file
var notifier = require('node-notifier');
// A Node.js module for sending cross platform system notification. Using Notification Center for Mac, 
// notify-osd for Linux, Toasters for Windows 8/10, or lovely taskbar Balloons for earlier Windows versions. 
// If none of these requirements are met, be it older version of Windows or OS X, Growl is used.
var server = require('gulp-server-livereload');

// Gulp plugin to run a local webserver with livereload enabled via socket.io
// Serve a folder over HTTP and watch it for changes, telling the browser to reload itself when a change happens.

// Uses socket.io - livereload mechanism works even if your browser does not support WebSockets (PhoneGap developers rejoice!).

// window.console capture - it can capture console output from the client-side and transmit it to the back-end for display. This is useful for when testing from Phonegap, etc.

// Supports CSS injection (no need to reload the whole page if just your CSS has changed).

// Proxy mode - proxy requests arriving at certain URLs to other servers.

// Comes with a command-line runnable.

// This was originally a fork of gulp-webserver.
var concat = require('gulp-concat');
var sass = require('gulp-sass');
// Gulp plugin for sass. Complies sass into css 
var watch = require('gulp-watch');

var notify = function(error){
	var message = 'In ';
	var title = 'Error: ';

	if(error.description){
		title +=error.description;
	} else if (error.message){
		title += error.message;
	}

	if(error.filename){
		var file = error.filename.split('/');
		message += file[file.length-1];
	}

	if(error.lineNumber){
		message += '\nOn Line: ' + error.lineNumber;
	}

	notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
	entries:['./src/app.jsx'],
	transform: [reactify],
	extensions: ['.jsx'],
	debug: true,
	cache: {},
	packageCache: {},
	fullPaths: true
}));

	function bundle(){
		return bundler
		.bundle()
		.on('error', notify)
		.pipe(source('main.js'))
		.pipe(gulp.dest('./'))
	}
	bundler.on('update', bundle);
    
    gulp.task('build', function(){
    	bundle()
    });

    gulp.task('serve', function(done){
    	gulp.src('')
    		.pipe(server({
    			livereload : {
    				enable: true,
    				filter: function(filePath, cb){
    					if(/main.js/.test(filePath)){
    						cb(true)
    					} else if(/style.css/.test(filePath)){
    						cb(true)
    					}
    				}
    			},
    			open:true
    		}));
    });


    gulp.task('sass',function(){
    	gulp.src('./sass/**/*.scss')
    		.pipe(sass().on('error', sass.logError))
    		.pipe(concat('style.css'))
    		.pipe(gulp.dest('./'));
    });

    gulp.task('default', ['build', 'serve', 'sass', 'watch']);

    gulp.task('watch',function(){
    	gulp.watch('./sass/**/*.scss', ['sass']);
    })


