const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭lintOnSave
  lintOnSave: false,
  devServer: {
    proxy: {
      'api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }
      }
    },
    open: true,
    host: 'localhost',
    port: 8080,

  }

})
