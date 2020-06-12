const utils = require('./utils')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

const config = {
  mode: "production",
  devtool: "none",
  plugins: [
    new CleanWebpackPlugin(), // 清理打包目录
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new OptimizeCSSAssetsPlugin(),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
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
