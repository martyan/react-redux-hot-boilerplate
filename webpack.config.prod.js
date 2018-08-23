var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var context = path.resolve(__dirname, 'src');

module.exports = {
  context,
  mode: 'production',
  devtool: false,
  entry: ['@babel/polyfill', './index'],
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
              context,
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
          'style-loader', 
          'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
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
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[hash:5].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/assets/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: false,
          sourcemap: false, 
          compress: {
            warnings: false,
          },
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    } 
  },
};