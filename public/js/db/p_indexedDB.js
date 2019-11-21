 const DB_NAME = 'FormData'
 //const DB_VERSION = 1
 const SYNC_POST = 'sync_post'
 const TOKEN = 'token'

var dbPromise = idb.open(DB_NAME, 1, function (db) {
  if (!db.objectStoreNames.contains(SYNC_POST)) {
    db.createObjectStore(SYNC_POST, { keyPath: 'id' })
  }
  if (!db.objectStoreNames.contains(TOKEN)) {
    db.createObjectStore(TOKEN, { keyPath: 'id' })
  }
})

 function writeData (table, data) {
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
  return dbPromise.then(function(db) {
    var tx = db.transaction(table, 'readonly');
    var store = tx.objectStore(table);
    return store.get(key);
  }).then(function(val) {
    return val
  });
}

 function readAllData (table) {
  return dbPromise
    .then(function (db) {
      var transaction = db.transaction(table, 'readonly')
      var store = transaction.objectStore(table)
      return store.getAll()
    })
}

 function deleteData (table, key) {
  return dbPromise.then(function (db) {
    var transaction = db.transaction(table, 'readwrite')
    var store = transaction.objectStore(table)
    store.delete(key)
    return transaction.complete
  })
}
