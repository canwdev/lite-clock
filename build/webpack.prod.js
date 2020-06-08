const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const config = {
  mode: "production",
  devtool: "none"
}

module.exports = merge(commonConfig, config)
