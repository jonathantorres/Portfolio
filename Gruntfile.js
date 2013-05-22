/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['js/*.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
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
          Social: true,
          Contact: true,
          Welcome: true,
          Portfolio: true,
          Resume: true,
          Site: true,
          Preloader: true,
          hasher: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      },
      debug: {
        src: 'js/*.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
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
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      },
      sass: {
        files: 'sass/main.scss',
        tasks: 'sass:dev'
      },
      jshint: {
        files: 'js/*.js',
        tasks: 'jshint:debug'
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
  grunt.registerTask('default', ['jshint', 'sass:dev']);

  // Deployment task
  grunt.registerTask('deploy', ['jshint', 'sass:deploy', 'concat', 'uglify']);

};
