var gulp   = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

// Load the gulp task files
requireDir('./gulp');

/**
 *  AVAILABLE TASKS DEFINED IN 'gulp' directory....
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  clean                   - removes the public folder
 *  css-build            - precompile sass to css & run 'autoprefixer' to add vendor specific style support
  *  images-build   - copies all image files in app/assets/images to public/images
 *  js-build              - concats all js files in app/assets/js (excl vendor & lib subfolders) - adds to public/js
 *                              - concats all js files in app/assets/js/vendor - adds to public/js
 *  js-compress     - compresses the main application js file (app.js)
 *  lint                       - lints javascript
 *  nodemon          - runs ./bin/server.js (should only be used for development)
 *  unit-test             - runs the jasmine tests in the /spec folder
 *  watch                 - watches resources to allow auto-recompile etc while developing
 */

/**
 *          A G G R E G A T E S
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

gulp.task('test',['lint', 'unit-test']);  // unit testing here

gulp.task('dev', function(){
    'use strict';
    runSequence(
        'clean',
        'test',
        ['css-build','js-build','images-build'],
        'nodemonDev'
    );
});

gulp.task('local', function(){
    'use strict';
    runSequence(
        'clean',
        'test',
        ['css-build','js-build','images-build'],
        'nodemonLocal'
    );
});

gulp.task('jenkins', function(){
    'use strict';
    runSequence(
        'clean',
        'test',
        ['css-build','js-build','images-build'],
        ['css-compress','js-compress']
    );
});


/**
 *  Future Considerations
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * ---  Set environment params  ----
 *   This should probably come from vagrant for dev, and exist on the box in managed environments
 *   Need a way to run a version that connects to either the dev server or a local instance of the java app & database ?
 * ---  Duplicated hardcoded paths  ----
 *   Create a common module for grunt constants including paths
 * ---  Node Security ---
 *  Node security project ( https://nodesecurity.io ) has a gulp plugin (gulp-nsp) that runs a security audit on package.json
 *
 *
 */

