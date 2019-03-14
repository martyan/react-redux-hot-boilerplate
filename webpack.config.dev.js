const webpack = require('webpack');
const ReactLoadableWebpack = require('react-loadable/webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const SRC_PATH = path.resolve(__dirname, 'src');
const PUBLIC_PATH = path.resolve(__dirname, 'public');

module.exports = [
    {
        name: 'server',
        mode: 'development',
        target: 'node',
        entry: [`${SRC_PATH}/server/index.js`],
        output: {
            filename: 'server.js',
            path: PUBLIC_PATH,
            publicPath: '/public/',
            libraryTarget: 'commonjs2',
        },
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                            'react-loadable/babel',
                            ['react-css-modules', {
                                exclude: 'node_modules',
                                generateScopedName: '[local]___[hash:base64:5]',
                                filetypes: {
                                    '.scss': {
                                        syntax: 'postcss-scss'
                                    }
                                }
                            }]
                        ]
                    }
                }, {
                    test: /\.(scss|css)$/,
                    loaders: [
                        'isomorphic-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]___[hash:base64:5]',
                                sourceMap: false,
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                }, {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    loader: 'file-loader?name=[path][name].[ext]&context=src/assets/&emitFile=false'
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader&emitFile=false'
                }
            ]
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                BROWSER: false,
                ENDPOINT_BASEURI: 'https://jsonplaceholder.typicode.com'
            }),
            new ExtractCssChunks,
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ]
    },
    {
        name: 'client',
        mode: 'development',
        target: 'web',
        devtool: 'inline-sourcemap',
        entry: ['webpack-hot-middleware/client', `${SRC_PATH}/client/index.js`],
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: PUBLIC_PATH,
            publicPath: '/public/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            'react-hot-loader/babel',
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                            'react-loadable/babel',
                            ['react-css-modules', {
                                exclude: 'node_modules',
                                generateScopedName: '[local]___[hash:base64:5]',
                                filetypes: {
                                    '.scss': {
                                        syntax: 'postcss-scss'
                                    }
                                }
                            }]
                        ]
                    }
                }, {
                    test: /\.(scss|css)$/,
                    use: [
                        ExtractCssChunks.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]___[hash:base64:5]',
                                sourceMap: false,
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                }, {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    loader: 'file-loader?name=[path][name].[ext]&context=src/assets/'
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader'
                }
            ]
        },
        plugins: [
            new ReactLoadableWebpack.ReactLoadablePlugin({
                filename: './public/react-loadable.json',
            }),
            new ExtractCssChunks,
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                BROWSER: true,
                ENDPOINT_BASEURI: 'https://jsonplaceholder.typicode.com'
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        }
    }
]
