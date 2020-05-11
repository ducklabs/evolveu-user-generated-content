const express = require('express')
const database = require('../database')
const apiRouter = express.Router()

function findAllPosts(request, response) {
  let allPosts = database.findAllPosts()
  response.send(allPosts)
}

function addNewPost(request, response) {
  console.log('saving post', request.body)
  database.addNewPost(request.body)
  response.send(200)
}

apiRouter.get('/posts', findAllPosts)
apiRouter.post('/addPost', addNewPost)

module.exports = apiRouter
