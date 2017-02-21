module.exports = function(config) {
  config.set({
      frameworks: ['mocha', 'chai'],
    files: [
      '../src/pathfinders/finder.js',
      '../src/!(core)/*.js',
      '../src/core/node.js',
      '../src/core/grid.js',
      'pathfinders/mazes.js',
      '!(coverage)/*.js'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage', 'coveralls', 'mocha'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      '../src/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/',
      subdir: 'lcov'
    }
  });
};