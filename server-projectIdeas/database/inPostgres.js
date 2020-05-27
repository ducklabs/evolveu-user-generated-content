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
    .then((client) => client.query('DELETE FROM projectideas'))
    .then((deleteResult) => Promise.resolve())
}

function addPost(newContent) {
    return connect()
      .then((client) => {
        let insertSql = 'INSERT INTO projectideas("title","description","contact","postedDate") VALUES ($1,$2,$3,$4) RETURNING *'
        let insertParams = [
            newContent.title,
            newContent.description,
            newContent.contact,
            newContent.postedDate
        ]
        return client.query(insertSql, insertParams)
          .then((res) => res.rows[0])
      })
}

function updatePost(messageWithNewContent) {
    return connect()
      .then((client) => {
        let updateSql = 'UPDATE projectideas SET "title"=$2, "description"=$3, "contact"=$4, "postedDate"=$5 WHERE id=$1'
        let updateParams = [
            messageWithNewContent.id,
            messageWithNewContent.title,
            messageWithNewContent.description,
            messageWithNewContent.contact,
            messageWithNewContent.postedDate
        ]
        return client.query(updateSql, updateParams)
          .then(() => client.query('SELECT * FROM projectideas WHERE id='+messageWithNewContent.id))
          .then((selectResult) => selectResult.rows[0])
      })
}

function findAllPosts() {
  return connect()
    .then((client) => client.query('SELECT * FROM projectideas'))
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