var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    resolve: {
        root: [
            path.resolve(__dirname, '..', 'src')
        ]
    },
    entry: './demo/index',
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
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
    },
    devServer: {
        contentBase: './demo',
        noInfo: true,
        inline: true,
        hot: true
    }
};
