const express = require('express')
const api = require('./api')

const app = express()

app.use(express.json())
app.use('/api', api)
app.use('/', express.static('../web-projectIdeas'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening at ${port}`))
