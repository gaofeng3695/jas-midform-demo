// vue.config.js

const path = require("path");

module.exports = {
  // 选项...
  devServer: {
    hot: true,
    port: '8088',
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/': {
        // target: 'http://192.168.50.138:8080/',
        // target: 'http://1.119.155.134:10300/',
        // target: 'http://nmweb.zyax.cn/',
        target: 'http://192.168.100.36:8081/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': '/pipeline-supervise-platform/',
        }
      },
      '/jasproxy': {
        // target: 'http://192.168.50.138:8080/',
        // target: 'http://1.119.155.134:10300/',
        // target: 'http://nmweb.zyax.cn/',
        target: 'http://192.168.100.36:8081/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/jasproxy': '/pipeline-supervise-platform/',
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  configureWebpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
  },
  css: {
    loaderOptions: {
      // sass: {
      //   prependData: `@import "./src/assets/scss/style.scss";`
      //   // sass 版本 9 中使用 additionalData 版本 8 中使用 prependData  
      // }
    }
  }
}