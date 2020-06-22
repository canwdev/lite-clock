const merge = require('webpack-merge')
const commonConfig = require('./webpack.prod')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  plugins: [
    new BundleAnalyzerPlugin() // 开启打包分析
  ]
}

module.exports = merge(commonConfig, config)
