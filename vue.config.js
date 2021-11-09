const { version } = require('./package.json')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	productionSourceMap:false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        url: src => !src.startsWith('../images'),
        modules: {
          localIdentName:
            process.env.NODE_ENV === 'development'
              ? '[name]__[local]__[hash:base64:5]'
              : '[sha256:hash:base64:8]'
        }
      }
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
