module.exports = {
  baseUrl: '',
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: '[name].js',
      // chunkFilename: '[name].js'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')

    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css');
      extractCSSPlugin &&
      extractCSSPlugin.tap(() => [
        {
          filename: '[name].css',
          // chunkFilename: '[name].css'
        }
      ]);
    }

    config.plugins.delete('preload')
  }
}