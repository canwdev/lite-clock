const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
const utils = require('./utils')
const pkg = require('../package.json')
const vConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: './', // 可设置 CDN 或基本路径
    path: path.join(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].js')
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            fix: false,
            cache: true
          }
        }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: utils.assetsPath('img/[name].[hash:7].[ext]'),
            limit: 8192
          }
        }
      },
      {
        test: /\.(styl|css)$/i,
        // loader 执行顺序是从后往前
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Lite Clock v' + pkg.version
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public'},
      ],
    }),
    new vConsolePlugin({
      filter: [],  // 需要过滤的入口文件
      enable: isProd && process.env.VCONSOLE
    }),
  ]
}
