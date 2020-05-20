const express = require('express')
const bodyParser = require('body-parser')

const Router = express.Router

const database = require('../database')

const setupV1Routes = (apiRouter) => {

  // Controller Functions
  function findAllPosts(request, response) {
    let allPosts = database.findAllPosts()
    response.send(allPosts)
  }

  function addNewPost(request, response) {
    console.log('saving post', request.body)
    database.addPost(request.body)
    response.sendStatus(200)
  }

  // Routing
  const v1Router = Router()
  v1Router.get('/posts', findAllPosts)
  v1Router.post('/addPost', addNewPost)

  apiRouter.use('/v1', v1Router)
};

const setupV2Routes = (apiRouter) => {

  // Controller Functions
  function findAllPosts(request, response) {
    let allPosts = database.findAllPosts()
    response.sendStatus(allPosts)
  }

  function addNewPost(request, response) {
    console.log('saving post', request.body)
    database.addPost(request.body)
    response.sendStatus(200)
  }

  // Middleware
  const textParser = bodyParser.text()

  // Routing
  const router = Router()
  router.get('/posts', findAllPosts)
  router.post('/addPost', textParser, addNewPost)

  apiRouter.use('/v2', router)
};



const apiRouter = Router()
setupV1Routes(apiRouter)
setupV2Routes(apiRouter)

module.exports = apiRouter
