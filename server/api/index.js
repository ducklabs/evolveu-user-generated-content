const express = require('express')
const setupV2Routes = require('./setupV2Routes')
const database = require('../database/inMongo')

const Router = express.Router

const setupV1Routes = (apiRouter) => {

  // Controller Functions
  function findAllPosts(request, response) {
    database.findAllPosts()
      .then((posts) => response.send(posts))
      .catch((error) => response.send(error))
  }

  function addNewPost(request, response) {
    database.addPost(request.body)
    .then(() => response.sendStatus(200))
    .catch((error) => response.send(error))
  }

  // Routing
  const v1Router = Router()
  v1Router.get('/posts', findAllPosts)
  v1Router.post('/addPost', addNewPost)

  apiRouter.use('/v1', v1Router)
};

const apiRouter = Router()
setupV1Routes(apiRouter)
setupV2Routes(apiRouter)

module.exports = apiRouter
