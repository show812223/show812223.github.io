
importScripts('/js/idb.js')
importScripts('/js/indexedDB.js')

const CACHE_STATIC = 'PWA_Cache'
const CACHE_DYNAMIC = 'Dynamic'
const STATIC_URLS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  './plugins/vuetify'
  // 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  // 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
  // 'https://unpkg.com/formiojs@latest/dist/formio.full.min.css',
  // 'https://unpkg.com/formiojs@latest/dist/formio.full.min.js',
  // './js/app.js',
  // './js/main.js',
  // './js/idb.js',
  // './js/indexedDB.js'
]

const API_URLS = [
  'api/token'
]


self.addEventListener('install', function (event) {
  console.log('[SW]安裝成功', event)
  event.waitUntil(installAsync(event))
})
self.addEventListener('activate', function (event) {
  console.log('[SW]Activate')
  event.waitUntil(activeAsync())
})
self.addEventListener('fetch', function (event) {
  // console.log('[SW]Fetch',event)
  event.respondWith(fetchAsync(event))
})

self.addEventListener('error', function (event) {
  console.log('[SW]Error', event)
})

self.addEventListener('message', function (event) {
  console.log('[SW]Message')
})

self.addEventListener('sync', function (event) {
  console.log('[SW] Sync, tag: ' + event.tag)
  event.waitUntil(syncAsync(event))
})

// functions
async function installAsync (event) {
  self.skipWaiting()
  const cache = await caches.open(CACHE_STATIC)
  await cache.addAll(STATIC_URLS)
}

async function activeAsync () {
  self.clients.claim()
}

async function fetchAsync (event) {
  // console.log('[SW]Fetch event', event.request.url);

  // token
  if (event.request.url.indexOf('api/token') > -1) {
    return fetch(event.request)
  }

  // 如缓存匹配成功，直接返回其内容
  const match = await caches.match(event.request.url, { ignoreSearch: true })
  if (match) {
    // 如请求指向静态资源或我们制定范围内的API，同时后台更新缓存
    if (STATIC_URLS.includes(event.request.url)) {
      caches.open(CACHE_STATIC)
        .then((cache) => cache.add(event.request))
    } else {
      caches.open(CACHE_DYNAMIC)
        .then((cache) => cache.add(event.request))
    }
    console.log('🔴 Cache', match)

    return match
  }else{
    caches.open(CACHE_DYNAMIC).then((cache) => cache.add(event.request))
    console.log('🔵 save Cache', event.request.url)
  }
  // 緩存沒資料就跟伺服器要資料  儲存cache
  return fetch(event.request)
}

function syncAsync (event) {
  if (event.tag === 'sync-new-post') {
    readAllData(SYNC_POST)
      .then(function (datas) {
        // console.log("readSyncData success",datas)
        for (var data of datas) {
          console.log('[SW] sync DB Data', data)
          fetchFormData(data)
        }
      })
      .catch(function (err) {
        console.log('readSyncData Error', err)
      })
  }
}
