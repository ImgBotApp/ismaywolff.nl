const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: [
      './src/client/index.jsx'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist', 'public')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    port: process.env.DEV_PORT,
    host: process.env.DEV_HOST,
    disableHostCheck: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new CopyWebpackPlugin([{ from: path.join(__dirname, 'src', 'static') }]),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'DEV_BASE',
      'DEV_PORT',
      'SPACE_ID',
      'CONTENT_PREVIEW_TOKEN',
      'DEV_TRACKING_ID',
      'SENTRY_CLIENT_KEY',
      'SENTRY_APP',
      'BABEL_ENV'
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.ejs')
    })
  ]
}
