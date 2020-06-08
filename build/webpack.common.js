const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: "./", // 可设置 CDN 或基本路径
    filename: "[name].bundle.js",
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: "url-loader",
          options: {
            name: '[name]_[hash:8].[ext]',
            outputPath: 'img/',
            limit: 8192
          }
        }
      },
      {
        test: /\.(styl|css)$/i,
        // loader 执行顺序是从后往前
        use: ["style-loader", "css-loader", "postcss-loader", "stylus-loader"]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理打包目录
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: 'Lite Clock'
    }),
    // new BundleAnalyzerPlugin() // 开启打包分析
  ],
  optimization: {
    // https://www.webpackjs.com/plugins/split-chunks-plugin/
    splitChunks: {
    }
  }
}
