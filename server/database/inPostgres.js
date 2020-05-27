const { Client } = require('pg')

// requires environment variables: PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE

let connectPromise
let client

function connect() {
  if (!connectPromise) {
    client = new Client()
    connectPromise = client.connect().then(() => client)
  }
  return connectPromise
}

function clear() {
    return connect()
    .then((client) => client.query('DELETE FROM messages'))
    .then((deleteResult) => Promise.resolve())
}

function addPost(newContent) {
    return connect()
      .then((client) => {
        let insertSql = 'INSERT INTO messages("messageText",author,"messageDate") VALUES ($1,$2,$3) RETURNING *'
        let insertParams = [
            newContent.messageText,
            newContent.author,
            newContent.messageDate
        ]
        return client.query(insertSql, insertParams)
          .then((res) => res.rows[0])
      })
}

function updatePost(messageWithNewContent) {
    return connect()
      .then((client) => {
        let updateSql = 'UPDATE messages SET "messageText"=$2, "author"=$3, "messageDate"=$4 WHERE id=$1'
        let updateParams = [
            messageWithNewContent.id,
            messageWithNewContent.messageText,
            messageWithNewContent.author,
            messageWithNewContent.messageDate
        ]
        return client.query(updateSql, updateParams)
          .then(() => client.query('SELECT * FROM messages WHERE id='+messageWithNewContent.id))
          .then((selectResult) => selectResult.rows[0])
      })
}

function findAllPosts() {
  return connect()
    .then((client) => client.query('SELECT * FROM messages'))
    .then((selectResult) => selectResult.rows)
}

function close() {
  return connect().then((client) => {
    connectPromise = null
    return client.end()
  })
}

module.exports = {
    clear,
    findAllPosts,
    addPost,
    updatePost,
    close
}