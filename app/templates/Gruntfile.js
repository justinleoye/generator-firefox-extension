// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    config.name = grunt.file.readJSON(config.app + '/package.json').name;


    grunt.initConfig({
        config: config,

        shell: {
            run: {
                command: [
                    'cd <%%= config.app %>/',
                    'jpm run' //'jpm run -b nightly'
                ].join('&&')
            },
            xpi: {
                command: [
                    'cd <%%= config.app %>',
                    'jpm xpi',
                    'cd ..',
                    'mv <%%= config.name %>.xpi <%%= config.dist %>',
                    'wget --post-file=<%%= config.dist %>/<%%= config.name %>.xpi http://localhost:8888/ || echo>/dev/null'
                ].join('&&')
            },
            build: {
                command: [
                    'cd <%%= config.app %>',
                    'jpm xpi',
                    'cd ..',
                    'mv <%%= config.name %>.xpi <%%= config.dist %>'
                ].join('&&')
            }
        },
        watch: {
            xpi: {
                files: ['<%%= config.app %>/**/*'],
                tasks: ['shell:xpi']
            }
        },
        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'app/data/{,*}/*.html'
                ],
                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        }
    });

    grunt.registerTask('run', ['shell:run']);
    grunt.registerTask('build', ['shell:build']);
    grunt.registerTask('default', ['run']);
};
