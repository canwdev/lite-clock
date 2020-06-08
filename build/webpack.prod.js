const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const config = {
  mode: "production",
  devtool: "none",
  optimization: {
    // https://www.webpackjs.com/plugins/split-chunks-plugin/
    splitChunks: {
      cacheGroups: {
        expansions: {
          name: 'expansions',
          test(module) {
            return /axios|moment/.test(module.context)
          },
          chunks: 'initial',
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = merge(commonConfig, config)
