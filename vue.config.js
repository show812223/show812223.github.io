module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  pwa: {
    name: 'WeFrom PWA',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        swSrc: 'public/service-worker.js'
    }
  },
}
