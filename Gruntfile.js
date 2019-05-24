//Gruntfile
module.exports = function(grunt) {
    //Initializing the configuration object
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

		// Task configuration
		copy: {
		  main: {
		  	files: [
		  		{
				    expand: true,
				    cwd: './assets/plugins/bootstrap/fonts/',
				    src: '**',
				    dest: './public_html/fonts/',
				    flatten: true,
				    filter: 'isFile',
				}
		  	]
		  },
		  font2: {
		  	files: [
		  		{
				    expand: true,
				    cwd: './assets/plugins/font-awesome/fonts/',
				    src: '**',
				    dest: './public_html/fonts/',
				    flatten: true,
				    filter: 'isFile',
				}
		  	]
		  },
		  angular: {
		  	files: [
		  		{
				    src: './node_modules/angular/angular.min.js',
				    dest: './public_html/assets/js/vendors/angular.min.js',
					}
		  	]
		  },
		},
		concat: {
			options: {
			separator: ';',
			},
			js_modern: {
				src: [
					'./assets/plugins/jquery/jquery-2.1.4.min.js',
					'./assets/plugins/jquery-ui/jquery-ui.min.js',
					// './assets/plugins/pace-master/pace.min.js', // Preload page
					'./assets/plugins/jquery-blockui/jquery.blockui.js',
					'./assets/plugins/bootstrap/js/bootstrap.min.js',
					'./assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
					'./assets/plugins/switchery/switchery.min.js',
					'./assets/plugins/uniform/jquery.uniform.min.js',
					'./assets/plugins/offcanvasmenueffects/js/classie.js',
					'./assets/plugins/waves/waves.js',
					'./assets/plugins/3d-bold-navigation/js/main.js',
					// './assets/plugins/jquery-validation/jquery.validate.min.js',
					// './assets/plugins/jquery-validation/locale_es.js',
					'./assets/plugins/bootstrap-media-lightbox.min.js',
					'./assets/plugins/dropzone/dropzone.min.js',
					'./assets/plugins/jstree/jstree.min.js',
					'./assets/plugins/jstree.js',
					'./assets/plugins/x-editable/bootstrap3-editable/js/bootstrap-editable.js',
					'./assets/plugins/bootstrap-star-rating/star-rating.js',
					'./assets/plugins/stacktable/stacktable.js',
					'./assets/javascript/modern.js',

					'./node_modules/socketio-file-upload/client.js',
					'./node_modules/socket.io-client/socket.io.js',
					'./node_modules/angular/angular.js',
					'./assets/plugins/datatables/js/jquery.datatables.min.js',
					'./node_modules/angular-animate/angular-animate.js',
					'./node_modules/angular-resource/angular-resource.js',
					'./node_modules/angular-messages/angular-messages.js',
					'./node_modules/angular-jwt/dist/angular-jwt.js',
					'./node_modules/angular-route/angular-route.js',
					'./node_modules/angular-cookies/angular-cookies.js',
					'./node_modules/angular-datatables/dist/angular-datatables.js',
					// './node_modules/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js',
					// './assets/plugins/ng-table/ng-table.min.js',
					'./assets/javascript/app.js',
					'./assets/javascript/controllers/*.js',
					'./assets/javascript/services/*.js',
					'./assets/javascript/directives/*.js'
				],
				dest: './public_html/assets/js/modern.min.js',
			},

		},
		less: {
			development: {
				options: {
					compress: true,  //minifying the result
				},
				files: {
					//compiling frontend.less into frontend.css
					'./public_html/assets/css/sar.css':'./assets/stylesheets/sar.less',

				}
			}
		},
		uglify: {
			options: {
				mangle: false  // Use if you want the names of your functions and variables unchanged
			},
			modern: {
				files: {
				  './public_html/assets/js/modern.min.js': './public_html/assets/js/modern.min.js',
				}
			},

		},



		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      './public_html/assets/css/assets.css': [
						'./assets/plugins/pace-master/themes/blue/pace-theme-flash.css',
						'./assets/plugins/uniform/css/uniform.default.css',
						'./assets/plugins/bootstrap/css/bootstrap.css',
						'./assets/plugins/fontawesome/css/font-awesome.css',
						'./assets/plugins/line-icons/simple-line-icons.css',
						'./assets/plugins/offcanvasmenueffects/css/menu_cornerbox.css',
						'./assets/plugins/waves/waves.css',
						'./assets/plugins/switchery/switchery.css',
						'./assets/plugins/3d-bold-navigation/css/style.css',
						//'./assets/plugins/stacktable/stacktable.css',
						'./assets/plugins/slidepushmenus/css/component.css',
						'./assets/plugins/bootstrap-star-rating/star-rating.css',
						'./assets/plugins/bootstrap-star-rating/theme-krajee-svg.css'
		      ]
		    }
		  }
		},

		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		watch: {
			js_modern: {
				files: [
					//watched files
					'./assets/javascript/**/*.js'
				],
				tasks: ['concat:js_modern','uglify:modern'],     //tasks to run
				options: {
					livereload: true                        //reloads the browser
				}
			},
			gruntfile: {
				files: 'Gruntfile.js'
			},
			less: {
				files: ['./assets/stylesheets/*.less'], 	//watched files
				tasks: ['less'],                          	 //tasks to run
				options: {
					livereload: true                        //reloads the browser
				}
			}

		},


		concurrent: {
		  dev: {
		    tasks: ['nodemon', 'watch'],
		    options: {
		      logConcurrentOutput: true
		    }
		  }
		} // concurrent
	});

	// // Plugin loading
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');


	// Task definition
	grunt.registerTask('init', ['copy', 'less', 'concat', 'uglify', 'cssmin']);
	grunt.registerTask('default', ['concurrent', 'nodemon', 'watch']);

};
