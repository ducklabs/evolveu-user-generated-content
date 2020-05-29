const express = require('express')
const bodyParser = require('body-parser')
const database = require('../database/inMemory')
const jwt = require('jsonwebtoken')
const SUPER_SECRET_PASSPHRASE = process.env.SUPER_SECRET_PASSPHRASE //THIS NEEDS TO GO INTO CONFIG

const setupV2Routes = (apiRouter) => {
    // Controller Functions
    function findAllPosts(request, response) {
        let allPosts = database.findAllPosts()
        response.send(allPosts)
    }

    function addUserId(body) {
        body.uid = new Date().getTime()
    }

    function addNewPost(request, response) {
        const requestBody = request.body
        addUserId(requestBody)
        requestBody.userid = request.user.id
        console.log('saving post', requestBody)
        database.addPost(requestBody)
        response.json(requestBody)
    }


    function updatePost(request, response) {
        const requestBody = request.body
        database.updatePost(requestBody)
        response.json(requestBody)
    }

    function basicAuth(request, response, next) {
        // check for basic auth header
        const noAuth = !request.headers.authorization
        if (noAuth || request.headers.authorization.indexOf('Basic ') === -1) {
            return response.status(401).json({ message: 'Missing Authorization Header' });
        }

        // decode username and password
        const base64Credentials = request.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');


        // check username and password against database
        const user = database.checkUserNameAndPassword(username, password)
        if (user) {
            request.user = user
            return next()
        } else {
            return response.status(401).json({ message: 'Basic Authentication failed: Invalid username or password.' });
        }
    }


    function jwtAuth(request, response, next) {
        // check for jwt auth header
        const noAuth = !request.headers.authorization
        if (noAuth || request.headers.authorization.indexOf('Bearer ') === -1) {
            return response.status(401).json({ message: 'Missing Authorization Header' });
        }

        // pull out the jwt
        const token = request.headers.authorization.split(' ')[1];

        // verify the jwt
        const payload = jwt.verify(token, SUPER_SECRET_PASSPHRASE)
        const user = database.getUserById(payload.userId)
        if (user) {
            request.user = user
            return next()
        } else {
            return response.status(401).json({ message: 'JWT Authentication failed: Invalid username or password.' });
        }
    }

    function createJWT(request, response) {
        // create a JWT and send it back
        const payload = { userId: request.user.id }

        const token = jwt.sign(payload, SUPER_SECRET_PASSPHRASE, {
            expiresIn: 1440 // expires in 24 hours
        })

        return response.json({
            message: 'login success',
            token: token
        })

    }


    // Middleware
    const textParser = bodyParser.json()

    // Routing
    const router = express.Router()
    router.get('/posts', findAllPosts)
    router.post('/addPost', jwtAuth, addNewPost)
    router.post('/updatePost', textParser, updatePost)
    router.post('/login', basicAuth, createJWT)

    apiRouter.use('/v2', router)
};

module.exports = setupV2Routes

