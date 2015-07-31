/**
 * Created by Kemal on 07/31/15.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            appdist: {
                src: ['src/app/appdist.js',
                      'src/app/directives/watgRichtextEditorDirective.js'],
                dest: 'dist/js/watg-angular-richtext.js'
            },
            app: {
                src: ['src/app/app.js',
                      'src/app/controllers/testController.js',
                      'src/app/directives/watgRichtextEditorDirective.js'],
                dest: 'dev/js/watg-angular-richtext.js'
            },
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-route/angular-route.min.js'
                ],
                dest: 'dev/js/vendor.min.js'
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
                    'dev/css/vendor.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/fontawesome/css/font-awesome.css'
                    ]
                }
            }
        },
        watch: {
            files: ['src/app/**/*.js', 'src/assets/*.css'],
            tasks: ['concat:app','concat:appdist', 'uglify', 'concat_css', 'cssmin:assets', 'cssmin:assetsdist']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['bower_components/fontawesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
                        dest: 'dev/fonts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['bower_components/footable/css/fonts/*'],
                        dest: 'dev/css/fonts/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
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
            main: {
                src: ['src/app/templates/*.html'],
                dest: 'dist/js/watg-angular-richtext.tpl.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin', 'copy']);
    grunt.registerTask('dist', ['concat:appdist', 'uglify:appdist', 'concat_css:assetsdist', 'cssmin:assetsdist', 'html2js']);


};