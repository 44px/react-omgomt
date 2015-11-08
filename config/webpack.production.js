var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    resolve: {
        root: [
            path.resolve(__dirname, '..', 'src')
        ]
    },
    entry: './src/Tagsinput',
    output: {
        path: path.join(__dirname, '..', 'lib'),
        filename: 'index.js',
        library: 'react-omgomt',
        libraryTarget: 'commonjs2'
    },
    externals: {
        react: 'react'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compressor: {
                warnings: false
            }
        })
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
