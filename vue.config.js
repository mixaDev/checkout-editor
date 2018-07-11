module.exports = {
  baseUrl: '',
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: 'checkout-editor.js',
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
          filename: 'checkout-editor.css',
          // chunkFilename: '[name].css'
        }
      ]);
    }

    if (process.env.NODE_ENV === 'production') {
      config.plugins
        .delete('html')
        .delete('prefetch')
        .delete('preload')
    }
  }
}