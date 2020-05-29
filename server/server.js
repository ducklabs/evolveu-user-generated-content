// add dotenv
require('dotenv').config()

const express = require('express')
const api = require('./api')

const app = express()

app.use(express.json())

// api
app.use('/api', api)

// files served statically
app.use('/', express.static(__dirname + '/../web1'))
app.use('/day2', express.static(__dirname + '/../web2'))
app.use('/projectIdeas', express.static(__dirname + '/../web-projectIdeas'))
app.use('/day3', express.static(__dirname + '/../web3'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening at ${port}`))
