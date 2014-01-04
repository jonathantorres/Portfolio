/* global module:false */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        banner: [
            '/**',
            ' * <%= pkg.description %>',
            ' * Version: <%= pkg.version %>',
            ' * Author: <%= pkg.author.name %> | <%= pkg.author.email %>',
            ' * Compiled on <%= grunt.template.today("yyyy-mm-dd") %>',
            ' */\n\n'
        ].join('\n'),

        // Concatenate files.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },

            dist: {
                src: ['src/<%= pkg.name %>/*.js'],
                dest: 'js/<%= pkg.name %>.js'
            }
        },

        // Minify files.
        uglify: {
            options: {
                banner: '<%= banner %>'
            },

            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'js/<%= pkg.name %>.min.js'
            }
        },

        // JS Hint options.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    // jQuery
                    $: true,
                    jQuery: true,
                    console: true,

                    // greensock
                    TweenMax: true,
                    TimelineMax: true,
                    Expo: true,
                    Power1: true,
                    Sine: true,
                    Raphael: true,

                    // site
                    Utils: true,
                    Social: true,
                    Contact: true,
                    Welcome: true,
                    Portfolio: true,
                    Resume: true,
                    Site: true,
                    Preloader: true,
                    History: true
                }
            },

            gruntfile: {
                src: 'Gruntfile.js'
            },

            debug: {
                src: '<%= concat.dist.src %>'
            }
        },

        // SASS settings.
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },

                files: {
                    'css/main.css' : 'sass/main.scss'
                }
            },

            deploy: {
                options: {
                    style: 'compressed'
                },

                files: {
                    'css/main.css' : 'sass/main.scss'
                }
            }
        },

        // Grunt watch settings.
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },

            sass: {
                files: 'sass/main.scss',
                tasks: 'sass:dev'
            },

            jshint: {
                files: '<%= jshint.debug.src %>',
                tasks: ['jshint:debug', 'concat']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task.
    grunt.registerTask('default', ['jshint', 'sass:dev', 'concat']);

    // Deployment task
    grunt.registerTask('deploy', ['jshint', 'sass:deploy', 'concat', 'uglify']);

};
