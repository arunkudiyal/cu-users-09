// Request-Response Handler File --> Express Application
const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const mongoose = require('mongoose')

// MIDLLEWARE -> This gets executed after the server starts running but before you manage your route
// 0. cors middleware -> Removes the CORS restriction
app.use( cors() )

// cookieParser needs to be executed like a function to access cookies from the client's browsers
app.use( cookieParser() )

// Before creating the session you need to optimise / give options to session
app.use( session( {
    // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    resave: true,
    // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
    saveUninitialized: true,
    // This is the secret used to sign the session cookie. This can be either a string for a single secret, or an array of multiple secrets.
    secret: ['values', 'for', 'security', 'secret'],
    secret: 'secret',
    // cookie: {
    //     // Specifies the number (in milliseconds) to use when calculating how long session will be alive.
    //     maxAge: numbers
    // }
} ) )

// NOW, you access a property in request parameter called - 'req.session'

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

const homeRoute = require('./api/routes/home')
const loginHandler = require('./api/routes/login')
const signupHandler = require('./api/routes/signup')
const logoutHandler = require('./api/routes/logout')

// Mange my routes --> localhost:5001/users

// app.use('/users', (req, res) => {
//     res.status(200).json( {username: 'Demo UserName', password: 'Demo PWD'} )
// })

// Home Route should be defined before managing any route
app.use('/', homeRoute)
app.use('/users/login', loginHandler)
app.use('/users/signup', signupHandler)
app.use('/users/logout', logoutHandler)

// ERROR HANDLING
// Handing req and responses from the express app
app.use((request, response) => {
    // response.status().json(object)
    response.status(404).json( {msg: 'Resource Not Found!'} )
} )

module.exports = app;