module.exports = function(grunt){
 
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      uglify: {
        options: {
          mangle: false
        },
        build: {
          src: ['src/controllers/web/*.js','src/controllers/routesWEB.js','src/models/*.js','src/public/js/*.js'],
          dest: 'doc/scripts.min.js'
        }
      },
      watch: { 
        scripts: {       
          files: ['src/controllers/*.js','src/models/*.js','src/public/js/*.js'],
          tasks: ['uglify'],
          options: {
            spawn: false,
          }
        } //scripts
      }, //watch  */ 
      imagemin: { 
        main: {     
          files: [{
            expand: true,
            cwd: 'src/public/img/',
            src: ['src/public/img/*.{png,jpg,gif,.svg}'],
            dest: 'src/public/style/'
          }]     
        }     
      }, //imagemin
      watch: {
        images: {     
            files: ['src/public/img/*.{png,jpg,gif}'],
            tasks: ['newer:imagemin'],
            options: {
                spawn: false,
            }     
        }//images
      },// watch
      browserSync: {       
        dev: {        
          bsFiles: {
            src : [
              'src/controllers/web/*.js',
              'src/controllers/routesWEB.js',
              'src/models/*.js',
              'src/public/css/*.css',
              'src/public/img/*.jpg',
              'src/public/img/*.png',
              'src/public/img/*.svg',
              'src/public/js/*.js',
              'src/views/partials/*.jade',
              'src/views/publico/home/*.jade',
              'src/views/web/**/*.jade'
            ]
          },
          options: {
              watchTask: true,
              debugInfo: true,
              logConnections: true,
              notify: true,
              ghostMode: {
                scroll: true,
                links: true,
                forms: true
              }       
          }        
        } //dev
      } // browserSync */
    });
    
        
    
 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-contrib-imagemin');
 grunt.loadNpmTasks('grunt-newer');
 grunt.loadNpmTasks('grunt-browser-sync');
 grunt.registerTask('default', [, "watch"]);
 grunt.registerTask('default', ['uglify','watch','browserSync']);
};