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

    grunt.registerTask('release', ['html2js','concat','uglify']);
};