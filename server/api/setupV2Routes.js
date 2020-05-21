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
        const requestBody = request.body
        console.log('saving post', requestBody)
        database.addPost(requestBody)
        response.send(200)
    }

    // Middleware
    const textParser = bodyParser.json()

    // Routing
    const router = express.Router()
    router.get('/posts', findAllPosts)
    router.post('/addPost', textParser, addNewPost)

    apiRouter.use('/v2', router)
};

module.exports = setupV2Routes

