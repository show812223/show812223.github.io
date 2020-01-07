// git pages
module.exports = {
  publicPath:'/',
  'transpileDependencies': [
    'vuetify'
  ],
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
