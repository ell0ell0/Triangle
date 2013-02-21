var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    // A silly banner.
    banner:
      '/*          /$$$$$$          /$$      \n' +
      '           /$$__  $$        | $$      \n' +
      '  /$$$$$$$| $$  )__//$$$$$$ | $$$$$$$ \n' +
      ' /$$_____/| $$$$   /$$__  $$| $$__  $$\n' +
      '| $$      | $$_/  | $$  ) $$| $$  ) $$\n' +
      '| $$      | $$    | $$  | $$| $$  | $$\n' +
      '|  $$$$$$$| $$    | $$$$$$$/| $$$$$$$/\n' +
      ' (_______/|__/    | $$____/ |_______/ \n' +
      '                  | $$                \n' +
      '                  | $$                \n' +
      '                  |__/                */\n\n' +
      '/*! HMDAPOLIS - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://consumerfinance.gov/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Consumer Financial Protection Bureau; Licensed Apache 2.0 */\n\n',
    // Task configuration.
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
        multistr: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          Backbone: true,
          _: true,
          Highcharts: true
        }
      },
      all: ['static/js/main.js']
    },
    connect: {
      livereload: {
        options: {
          port: 8000,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },
    regarde: {
      reload: {
        files: ['index.html', 'static/js/main.js'],
        tasks: ['jshint', 'livereload']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  // Let's create a useful test command.
  grunt.registerTask('test', ['jshint']);

  // Default task.
  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);

};
