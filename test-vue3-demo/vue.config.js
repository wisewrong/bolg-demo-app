/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path');

module.exports = {
  // 打包的目录
  outputDir: 'dist',

  // 在保存时校验格式
  lintOnSave: true,

  // 生产环境是否生成 SourceMap
  productionSourceMap: false,

  devServer: {
    open: true, // 启动服务后是否打开浏览器
    overlay: { // 错误信息展示到页面
      warnings: true,
      errors: true,
    },
    host: '0.0.0.0',
    port: 8066, // 服务端口
    https: false,
    hotOnly: false,
    // proxy: { // 设置代理
    //   '/api': {
    //     target: host,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': '/',
    //     }
    //   },
    // },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/styles/var.less'),
      ],
    },
  },
};
