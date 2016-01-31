'use strict';

export default {
  paths: {
    lib: './lib/**/*.js',
    src: './src/**/*.js',
    test: './test/**/*.spec.js',
    coverage: 'coverage/**/lcov.info',
    gulp: ['./gulpfile.babel.js', './gulp/**/*.js']
  },
  manifests: ['./package.json']
};