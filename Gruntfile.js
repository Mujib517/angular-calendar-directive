module.exports = function(grunt) {

    grunt.initConfig({

        html2js: {
            options: {
            },
            main: {
                src: ['directive/*.html'],
                dest: 'temp/templates.js'
            }
        },
        jshint:{
            myFiles: ['directive/*.js']
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['directive/*.js','temp/templates.js'],
                dest: 'dist/calendar.js'
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'dist/calendar.min.js': ['dist/calendar.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-common-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('release', ['jshint','html2js','concat','uglify']);
};