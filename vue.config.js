const path = require('path');
const pkg = require('./package.json')

module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Always On Screen v' + pkg.version
    }
  },
  css: {
    loaderOptions: {
      // 引入 stylus 全局变量
      stylus: {
        import: [path.resolve(__dirname, "src/assets/styles/variables.styl")]
      },
    }
  },
  devServer: {
    proxy: {
      '/bing': {
        target: 'http://www.bing.com',
        changeOrigin: true,
        pathRewrite: {
          '^/bing': '/'
        }
      }
    }
  },
  pwa: {
    themeColor: '#000'
  }
}
