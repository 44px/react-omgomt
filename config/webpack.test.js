var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        root: [
            path.resolve(__dirname, '..', 'src'),
            path.resolve(__dirname, '..', 'test')
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: 'style!css!autoprefixer?{browsers:["last 2 version"]}!sass'
        }]
    }
};
