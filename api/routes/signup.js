const express = require('express')
const router = express.Router()

// GET -> Reading the data
// POST -> Write the data

// localhost:5001/users/signup
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/signup'} )
})

// Email, Password are the two values expected from the user 
// email & password --> request
// NOTE --> NODEJS DONOT HAVE A DIRECT ACCESS TO req.body OBJECT
router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    const userDetails = {
        email: userEmail,
        password: userPassword
    }

    res.status(201).json( {message: 'Signup Successful', details: userDetails} )
})

router.patch('/', (req, res) => {
    res.status(200).json( {msg: 'PATCH request to /users/signup'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {msg: 'DELETE request to /users/signup'} )
})

module.exports = router;