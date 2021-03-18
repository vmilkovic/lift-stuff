const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin  } = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const useDevServer = false;
const useVersioning = true;
const publicPath = useDevServer ? 'http://localhost:8080/build/' : '/build/'
const isProduction = process.env.NODE_ENV === 'production';
const useSourcemaps = !isProduction;

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: useSourcemaps
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: useSourcemaps,
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
        sourceMap: useSourcemaps
    }
};

const webpackConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        rep_log: './assets/js/rep_log.js',
        login: './assets/js/login.js',
        layout: './assets/js/layout.js'
    },
    output: {
        path: path.resolve(__dirname, 'web', 'build'),
        filename: useVersioning ? '[name].[chunkhash:6].js' : '[name].js',
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
            filename: useVersioning ? '[name].[contenthash:6].css' : '[name].css'
         }),

        new WebpackManifestPlugin({
             writeToFileEmit: true,
             basePath: 'build/',
         }),

        new WebpackChunkHash(),

        new webpack.HashedModuleIdsPlugin(),

        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: 'web/build/**/*.*'}),
    ],
    optimization: {
        /* splitChunks: {
            chunks: 'all',
            name: 'layout'
        } */
    },
    devtool: useSourcemaps ? 'inline-soruce-map' : false,
    devServer: {
        contentBase: './web',
        headers: {'Access-Control-Allow-Origin': '*'}
    }
}

if(isProduction){
    webpackConfig.optimization.minimizer = [new TerserPlugin()];

    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    );

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    )
}

module.exports = webpackConfig;
