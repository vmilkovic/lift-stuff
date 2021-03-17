const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

const resolveUrlLoader = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true
    }
};

const useDevServer = false;
const publicPath = useDevServer ? 'http://localhost:8080/build/' :'/build/'

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
        publicPath: publicPath
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
                use: [MiniCssExtractPlugin.loader, cssLoader]
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, cssLoader, resolveUrlLoader, sassLoader],
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
         new MiniCssExtractPlugin({
            filename: '[name].css'
         })
    ],
   /*  optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'layout'
        }
    }, */
    devtool: 'inline-soruce-map',
    devServer: {
        contentBase: './web',
        headers: {'Access-Control-Allow-Origin': '*'}
    }
}