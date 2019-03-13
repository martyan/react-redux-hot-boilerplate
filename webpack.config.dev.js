const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
            path: PUBLIC_PATH,
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: PUBLIC_PATH
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
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
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
            })
        ]
        // optimization: {
        //   minimizer: [
        //     new UglifyJsPlugin({
        //       uglifyOptions: {
        //         mangle: false,
        //         sourcemap: false,
        //         compress: {
        //           warnings: false,
        //         },
        //         output: {
        //           comments: false,
        //           beautify: false
        //         }
        //       }
        //     }),
        //   ]
        // }
    },
    {
        name: 'client',
        mode: 'development',
        target: 'web',
        devtool: 'inline-sourcemap',
        entry: [/*'@babel/polyfill', */`${SRC_PATH}/client/index.js`],
        output: {
            path: PUBLIC_PATH,
            filename: 'client.js',
            publicPath: PUBLIC_PATH
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
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
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
                        MiniCssExtractPlugin.loader,
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
            new MiniCssExtractPlugin({
                filename: 'styles.css',
                allChunks: true
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                BROWSER: true,
                ENDPOINT_BASEURI: 'https://jsonplaceholder.typicode.com'
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
        // optimization: {
        //   splitChunks: {
        //     cacheGroups: {
        //       vendor: {
        //         test: /node_modules/,
        //         chunks: 'initial',
        //         name: 'vendor',
        //         enforce: true
        //       }
        //     }
        //   }
        // }
    }
]
