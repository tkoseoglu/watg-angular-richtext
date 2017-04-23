/**
 * Created by Kemal on 07/31/15.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngconstant: {
            // Options for all targets
            options: {
                space: " ",
                dest: "src/app/core/app.const.js",
                name: "watgRichtextModule.const"
            },
            // Environment targets
            dev: {
                constants: {
                    "CONST_TEMPLATE_URL": "src/app/directives/templates/watgRichtextEditorTemplate.html"
                }
            },
            dist: {
                constants: {
                    "CONST_TEMPLATE_URL": "app/directives/templates/watgRichtextEditorTemplate.html"
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9023,
                    livereload: true,
                    debug: true,
                    target: 'http://localhost:9023/index.html', // target url to open
                    open: true
                }
            },
            test: {
                options: {
                    port: 9023,
                    keepalive: false
                }
            }
        },
        jshint: {
            beforeconcat: ["gruntfile.js", "app/**/*.js"]
        },
        concat: {
            app: {
                src: ['src/app/app.js',
                    'src/app/core/*.js',
                    'src/app/directives/*.js',
                    'src/app/tests/*.js'
                ],
                dest: 'dev/js/watg-angular-richtext.js'
            },
            appdist: {
                src: ['src/app/appdist.js', 'src/app/directives/watgRichtextEditorDirective.js'],
                dest: 'dist/js/watg-angular-richtext.js'
            },
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-route/angular-route.js'
                ],
                dest: 'dev/js/vendor.js'
            },
            vendorDist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-route/angular-route.min.js'
                ],
                dest: 'dev/js/watg-angular-richtext-vendor-dependencies.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            app: {
                files: {
                    'dev/js/watg-angular-richtext.min.js': ['dev/js/watg-angular-richtext.js']
                }
            },
            appdist: {
                files: {
                    'dist/js/watg-angular-richtext.min.js': ['dist/js/watg-angular-richtext.js']
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "src/assets/watg-angular-richtext.css": "src/assets/watg-angular-richtext.less"
                }
            }
        },
        concat_css: {
            assets: {
                src: ["src/assets/watg-angular-richtext.css"],
                dest: "dev/css/watg-angular-richtext.css"
            },
            assetsdist: {
                src: ["src/assets/watg-angular-richtext.css"],
                dest: "dist/css/watg-angular-richtext.css"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            assets: {
                files: {
                    'dev/css/watg-angular-richtext.min.css': ['dev/css/watg-angular-richtext.css']
                }
            },
            assetsdist: {
                files: {
                    'dist/css/watg-angular-richtext.min.css': ['dist/css/watg-angular-richtext.css']
                }
            },
            vendor: {
                files: {
                    'dev/css/vendor.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/fontawesome/css/font-awesome.css'
                    ]
                }
            }
        },
        watch: {
            files: ["src/app/app.js", "src/app/core/*.js", "src/app/**/*.js", "src/assets/*.less"],
            tasks: ['concat:app', 'uglify', 'less', 'concat_css', 'cssmin']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: ['bower_components/fontawesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
                    dest: 'dev/fonts/',
                    filter: 'isFile',
                    flatten: true
                }, {
                    expand: true,
                    src: ['bower_components/footable/css/fonts/*'],
                    dest: 'dev/css/fonts/',
                    filter: 'isFile',
                    flatten: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    src: ["src/assets/images/*"],
                    dest: 'dist/css/images/',
                    filter: 'isFile',
                    flatten: true
                }]
            }
        },
        html2js: {
            options: {
                base: 'src',
                module: 'watgRichtext.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            dist: {
                src: ['src/app/directives/templates/*.html'],
                dest: 'dist/js/watg-angular-richtext.tpl.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask('dev', ['ngconstant:dev', "jshint", 'concat:app', 'uglify', 'less', 'concat_css', 'cssmin', 'copy', 'connect:dev', 'watch']);
    grunt.registerTask('dist', ['ngconstant:dist', 'concat:appdist', 'concat:vendorDist', 'uglify:appdist', 'concat_css:assetsdist', 'cssmin:assetsdist', 'copy:dist', 'html2js:dist']);
};