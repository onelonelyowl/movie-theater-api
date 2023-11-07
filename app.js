const express = require('express')
const app = express()
const users_router = require('./routes/Users.js')
const shows_router = require('./routes/Shows.js')

app.use(express.json())
app.use(express.urlencoded())
app.use('/users', users_router)
app.use('/shows', shows_router)

module.exports = app