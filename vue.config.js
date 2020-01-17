// git pages
module.exports = {
  devServer: {
    port: 9002
  },
  publicPath:'/',
  'transpileDependencies': [
    'vuetify'
  ],

  pluginOptions:{
    i18n: {
      locale:'zh-TW',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
  },

  pwa: {
    name: 'WeFrom PWA',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        swSrc: './src/service-worker.js'
    }
  }
}
