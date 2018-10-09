const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  context: SRC_PATH,
  devtool: 'inline-sourcemap',
  entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
          plugins: [
            'react-hot-loader/babel', 
            '@babel/plugin-proposal-class-properties', 
            '@babel/plugin-proposal-object-rest-spread',
            ['react-css-modules', {
              context: SRC_PATH,
              exclude: 'node_modules',
              generateScopedName: '[local]___[hash:base64:5]',
              filetypes: {
                '.scss': {
                  syntax: 'postcss-scss'
                }
              },
              webpackHotModuleReloading: true
            }]
          ]
        }
      }, {
        test: /\.(scss|css)$/,
        loaders: [
          'style-loader', 
          'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'file-loader?name=[path][name].[ext]&publicPath=http://localhost:8080/&context=src/assets/'
      }, {    
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    path: SRC_PATH,
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[hash:5].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        ENDPOINT_BASEURI: 'https://jsonplaceholder.typicode.com'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/assets/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};