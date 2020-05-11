const express = require('express')
const apiRouter = express.Router()

const database = require('../database')

const setupV1Routes = (apiRouter) => {
  function findAllPosts(request, response) {
    let allPosts = database.findAllPosts()
    response.send(allPosts)
  }

  function addNewPost(request, response) {
    console.log('saving post', request.body)
    database.addPost(request.body)
    response.send(200)
  }

  apiRouter.get('/posts', findAllPosts)
  apiRouter.post('/addPost', addNewPost)
};


setupV1Routes(apiRouter);
// setupV2Routes(apiRouter);


module.exports = apiRouter
