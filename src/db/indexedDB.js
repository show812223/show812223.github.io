import { exp } from './idb'
export const DB_NAME = 'FormData'
export const DB_VERSION = 1
export const SYNC_POST = 'sync_post'
export const SYNC_FormSchema = 'SYNC_FormSchema'
export const TOKEN = 'token'
export const Form = 'form'
export const FormSchema = 'formSchema' 

var dbPromise = exp.open(DB_NAME, 1, function (db) {
  if (!db.objectStoreNames.contains(SYNC_POST)) {
    db.createObjectStore(SYNC_POST, { keyPath: 'id' })
  }
  if (!db.objectStoreNames.contains(SYNC_FormSchema)) {
    db.createObjectStore(SYNC_FormSchema, { keyPath: 'id' })
  }
  if (!db.objectStoreNames.contains(TOKEN)) {
    db.createObjectStore(TOKEN, { keyPath: 'id' })
  }
  if (!db.objectStoreNames.contains(Form)) {
    db.createObjectStore(Form, { keyPath: 'id' })
  }
  if (!db.objectStoreNames.contains(FormSchema)) {
    db.createObjectStore(FormSchema, { keyPath: 'id' })
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

export function readData (table, key) {
  return dbPromise.then(function(db) {
    var tx = db.transaction(table, 'readonly');
    var store = tx.objectStore(table);
    return store.get(key);
  }).then(function(val) {
    return val
  });
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
