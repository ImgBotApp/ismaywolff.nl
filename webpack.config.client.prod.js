const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SentryPlugin = require('webpack-sentry-plugin')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
const OfflinePlugin = require('offline-plugin')
const webpack = require('webpack')

/**
 * Name of the entrypoint. Currently there's only one client-side entrypoint. The name is defined
 * here so that it can be referenced when extracting the asset names for the server-side template.
 */

const ENTRYPOINT = 'main'

/**
 * Transforms the webpack stats object. Parses it into arrays of assets that are in the proper
 * order for server-side use.
 */

const transformStats = stats => {
  const assetsByEntrypoint = stats.entrypoints[ENTRYPOINT].assets
  const js = assetsByEntrypoint.filter(asset => asset.endsWith('.js'))

  return JSON.stringify({ js })
}

module.exports = {
  entry: {
    [ENTRYPOINT]: './src/client/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
  devtool: 'source-map',
  plugins: [

    /**
     * Clean dist before building.
     */

    new CleanWebpackPlugin(
      path.join(__dirname, 'dist', 'public'),
      { verbose: false }
    ),

    /**
     * Copy all static assets to dist.
     */

    new CopyWebpackPlugin([{ from: path.join(__dirname, 'src', 'static') }]),

    /**
     * Minify the generated js and pass along the sourcemaps.
     */

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    /**
     * Enable scope hoisting.
     */

    new webpack.optimize.ModuleConcatenationPlugin(),

    /**
     * Add all the necessary environment variables.
     */

    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'SPACE_ID',
      'CONTENT_DELIVERY_TOKEN',
      'PROD_TRACKING_ID',
      'SENTRY_CLIENT_KEY',
      'SENTRY_APP',
      'RELEASE',
      'BABEL_ENV'
    ]),

    /**
     * Split chunks
     *
     * splitting passes modules from top to bottom, see also:
     * - https://github.com/webpack/webpack/issues/4638#issuecomment-292702190
     * - http://stackoverflow.com/a/43291641/5918874
     *
     * Extracts:
     *
     * - vendor chunk
     * - react chunk (react and react-dom)
     * - manifest chunk (webpack runtime)
     */

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (m) => /node_modules/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks: (m) => /node_modules\/(?:react\/|react-dom\/)/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    /**
     * Hash module ids so the module identifiers won't change across builds
     */

    new webpack.HashedModuleIdsPlugin(),

    /**
     * Parse the webpack stats object and output a json file with the assets grouped by type
     */

    new StatsWriterPlugin({
      fields: null,
      transform: transformStats
    }),

    /**
     * Upload source and sourcemaps to Sentry
     */

    new SentryPlugin({
      organisation: 'ismay',
      project: 'ismaywolff-nl',
      apiKey: process.env.SENTRY_API_KEY,
      release: process.env.RELEASE
    }),

    /**
     * Make app available offline
     */

    new OfflinePlugin({
      publicPath: '/',
      externals: [
        '/'
      ],
      autoUpdate: true,
      AppCache: false,
      ServiceWorker: {
        navigateFallbackURL: '/',
      }
    })
  ]
}
