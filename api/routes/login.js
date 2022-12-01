const express = require('express')
const router = express.Router()

// localhost:5001/users/login
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/login'} )
})

// localhost:5001/users/login/variableId
router.get('/:variableId', (req, res) => {
    // Q:- What do you mean by queryParameter & how is it handled
    const queryParam = req.params.variableId
    res.status(200).json( {msg: `GET request to /users/login/${queryParam}`} )
})

// Any data sent over the POST request is carried in the body
router.post('/', (req, res) => {
    const userId = req.body.id
    const userPassword = req.body.password

    res.status(201).json( {message: 'POST Successful', details: `UserId: ${userId} & Password: ${userPassword}`} )
})

router.patch('/', (req, res) => {
    res.status(200).json( {msg: 'PATCH request to /users/login'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {msg: 'DELETE request to /users/login'} )
})

module.exports = router;