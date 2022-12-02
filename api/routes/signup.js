const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()

const Signup = require('../model/signup')

// GET -> Reading the data
// POST -> Write the data

// localhost:5001/users/signup
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/signup'} )
})

// Email, Password are the two values expected from the user 
// email & password --> request
// NOTE --> NODEJS DONOT HAVE A DIRECT ACCESS TO req.body OBJECT

// Whenever you use the schema for a POST request, you will have to create an object of the Schema
router.post('/', (req, res) => {
    const newUser = new Signup({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    })

    // Functionality which checks the recods of the user & check if the input email does not exist in the records
    newUser.save()
        .then(result => res.status(201).json( {message: 'User Signup Successful', userDetails: result} ))
        .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))
})

router.patch('/', (req, res) => {
    res.status(200).json( {msg: 'PATCH request to /users/signup'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {msg: 'DELETE request to /users/signup'} )
})

module.exports = router;