importScripts("/precache-manifest.98018feb354c21728fb3f670deb5e581.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


workbox.setConfig({ debug: true });
importScripts('/js/db/p_idb.js');
importScripts('/js/db/p_indexedDB.js')
importScripts('/js/swActions.js')
const CACHE_STATIC = 'PWA_Cache'
const CACHE_DYNAMIC = 'Dynamic'
const STATIC_URLS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
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



// background佇列
const queue = new workbox.backgroundSync.Queue('myQueueName', {
  onSync: async ({ queue }) => {
    let entry;
    while (entry = await queue.shiftRequest()) {
      try {
        await fetch(entry.request);
      } catch (error) {
        await queue.unshiftRequest(entry);
        return;
      }
    }
    console.log('Replay complete!');
  }
});


workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
  'https://stanteccms-dev.webim.io/api/Form/0d86a364-9fb8-4ee6-81df-f103636ca293',
  new workbox.strategies.NetworkFirst({
    cacheName: 'form-cache',
  })
);


self.addEventListener('install', function (event) {
  console.log('[SW]安裝成功', event)
  event.waitUntil(installAsync(event))
})
self.addEventListener('activate', function (event) {
  console.log('[SW]Activate')
  event.waitUntil(activeAsync())
})
self.addEventListener('fetch', function (event) {
  console.log('[SW]Fetch', event)
  console.log('fetch method', event.request.method)
  if (event.request.method === 'GET') {
    event.respondWith(fetchAsync(event))
  } else {
    // POST失敗會將request存到 indexedDB
    console.log('POST ', event.request)
    var promiseChain = fetch(event.request.clone()).catch(err => {
      return queue.pushRequest({ request: event.request })
    })
    event.waitUntil(promiseChain)
  }
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
  } else {
    caches.open(CACHE_DYNAMIC).then((cache) => cache.add(event.request))
    console.log('🔵 save Cache', event.request.url)
  }
  // 請求失敗加入sync佇列
  const promiseChain = fetch(event.request.clone())
    .catch((err) => {
      console.log('promiseChain', err)
      return queue.pushRequest({ request: event.request });
    });
  // 緩存沒資料就跟伺服器要資料  儲存cache
  return fetch(event.request)


}

function syncAsync (event) {
  console.log('[SW] Sync')
  switch (event.tag) {
    case 'sync-formResult': 
      ActionPostFormResults()
      break;
    case 'sync-formSchema':
      console.log("sync-formSchema")
      ActionPostFormSchema()
      break;
  }
}




