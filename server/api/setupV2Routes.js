const express = require('express')


const bodyParser = require('body-parser')
const database = require('../database')

const setupV2Routes = (apiRouter) => {
    // Controller Functions
    function findAllPosts(request, response) {
        let allPosts = database.findAllPosts()
        response.send(allPosts)
    }

    function addNewPost(request, response) {
        console.log('saving post', request.body)
        database.addPost(request.body)
        response.send(200)
    }

    // Middleware
    const textParser = bodyParser.text()

    // Routing
    const router = express.Router()
    router.get('/posts', findAllPosts)
    router.post('/addPost', textParser, addNewPost)

    apiRouter.use('/v2', router)
};

module.exports = setupV2Routes

