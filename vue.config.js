const { version } = require('./package.json')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        importLoaders: 1
      },
      // sass: {
      //   prependData: `@import "./src/assets/css/base";`
      // }    "node-sass": "^4.13.1","sass-loader": "^8.0.2",
    
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_URL, //process.env.VUE_APP_URL
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          // 路径重写
          '/api': '' // 以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      }
    }
  },

  chainWebpack: conf => {
    conf.plugin('html').tap(args => {
      args[0].version = version
      return args
    })
  }
}
