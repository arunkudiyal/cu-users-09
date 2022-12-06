// Request-Response Handler File --> Express Application
const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')

const mongoose = require('mongoose')

// MIDLLEWARE -> This gets executed after the server starts running but before you manage your route
// 0. cors middleware -> Removes the CORS restriction
app.use( cors() )

// 1. nodemon -> Dev Middleware -> Is going the start the server and will detect changes on the code and restart the server

// 2. body-parser -> You want a direct access to req.body object
// extended: false --> req.body will only contain data in the form of string or array
// extended: true --> req.body will contain data in any format
app.use( bodyParser.urlencoded( {extended: true} ) )
app.use( bodyParser.json() )

// 3. morgan -> Dev Middleware -> Logger Middleware -> For all requests it will create a log in the terminal
app.use( morgan('dev') )

// 4. mongoose -> Prod Dep --> Help ypu connect to your cloud DB ( .connect(connectionString) )
mongoose.connect('mongodb+srv://arunkudiyal:examplepwd@cluster0.2pssb.mongodb.net/cu-09-users?retryWrites=true&w=majority')
    .then(console.log('Connection Successful!'))
    .catch(err => console.log(err))

// DO THIS ALSO --> async () => await mongoose.connect('mongodb+srv://arunkudiyal:examplepwd@cluster0.2pssb.mongodb.net/cu-09-users?retryWrites=true&w=majority')
// try {
//     async () => await mongoose.connect('mongodb+srv://arunkudiyal:examplepwd@cluster0.2pssb.mongodb.net/cu-09-users?retryWrites=true&w=majority')
// } catch {
//     console.log('Connection error')
// }


// MANAGING MY OWN ROUTES
// 1. /users/login
// 2. /users/signup
const loginHandler = require('./api/routes/login')
const signupHandler = require('./api/routes/signup')

// Mange my routes --> localhost:5001/users

// app.use('/users', (req, res) => {
//     res.status(200).json( {username: 'Demo UserName', password: 'Demo PWD'} )
// })

app.use('/users/login', loginHandler)
app.use('/users/signup', signupHandler)

// Handing req and responses from the express app
app.use((request, response) => {
    // response.status().json(object)
    response.status(404).json( {msg: 'Resource Not Found!'} )
} )

module.exports = app;