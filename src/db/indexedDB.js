import { exp } from './idb'
export const DB_NAME = 'FormData'
export const DB_VERSION = 1
export const SYNC_POST = 'sync_post'

var dbPromise = exp.open(DB_NAME, 1, function (db) {
  if (!db.objectStoreNames.contains(SYNC_POST)) {
    db.createObjectStore(SYNC_POST, { keyPath: 'id' })
  }
})

export function writeData (table, data) {
  return dbPromise
    .then(function (db) {
      console.log('writeData', db)
      var transaction = db.transaction(table, 'readwrite')
      var article = transaction.objectStore(table)
      article.put(data)
      return transaction.complete
    })
}

function readData (table, key) {
  return dbPromise.then(function (db) {
    var transaction = db.transaction([table], 'readonly')
    var store = transaction.objectStore(table)
    var request = store.get(key)
    request.onsuccess = function (event) {
      console.log('Read Data', request.result)
      return request.result
    }
    request.onerror = function (event) {
      return request.result
    }
  })
}

export function readAllData (table) {
  return dbPromise
    .then(function (db) {
      var transaction = db.transaction(table, 'readonly')
      var store = transaction.objectStore(table)
      return store.getAll()
    })
}

export function deleteData (table, key) {
  return dbPromise.then(function (db) {
    var transaction = db.transaction(table, 'readwrite')
    var store = transaction.objectStore(table)
    store.delete(key)
    return transaction.complete
  })
}
