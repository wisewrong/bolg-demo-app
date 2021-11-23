module.exports = {
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8200,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        target: 'http://localhost:3200/',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
