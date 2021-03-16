const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

const styleLoader = {
    loader: 'style-loader',
    options: {
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

const resolveUrlLoaderLoader = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true
    }
};

module.exports = {
    mode: 'development',
    entry: {
        rep_log: './assets/js/rep_log.js',
        login: './assets/js/login.js',
        layout: './assets/js/layout.js'
    },
    output: {
        path: path.resolve(__dirname, 'web', 'build'),
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                },
            },
            {
                test: /\.css$/i,
                use: [
                    styleLoader, 
                    cssLoader
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    styleLoader, 
                    cssLoader,
                    resolveUrlLoaderLoader,
                    sassLoader
                ],
            },
            {
                 test: /\.(png|svg|jpg|jpeg|ico|gif)$/,
                 use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]'
                        }
                    }
                 ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]'
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
        }),

        new CopyPlugin({
            patterns: [
                { from: "./assets/static", to: "static" },
            ],
         }),
    ],
    devtool: 'inline-soruce-map'
}