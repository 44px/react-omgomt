var webpackConfig = require('./config/webpack.test.js');

module.exports = function(config) {
    config.set({
        singleRun: true,
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai'],
        files: [
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    });
};