const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Signup = require('../model/signup')

// localhost:5001/users/login
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'Session in use', loggedInUser: req.session.user} )
})

// localhost:5001/users/login/variableId
router.get('/:variableId', (req, res) => {
    // Q:- What do you mean by queryParameter & how is it handled
    const queryParam = req.params.variableId
    res.status(200).json( {msg: `GET request to /users/login/${queryParam}`} )
})

// Any data sent over the POST request is carried in the body
router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    // Function to filter from the documents (all the documents in the DB), where the email (req.body.email) matches the document
    // Signup.find(filter) --> Signup.find( {dbProperty: condition} )
    // Signup.find( {email === userEmail} )
    Signup.find( {email: userEmail } )
        // find() -> Data_Type(result) -> Array of Objects 
        .then(result => {
            if(result.length === 0) {
                res.status(400).json( { message: 'Records Not Found!', records: result } )
            } else {
                // Decryption
                bcrypt.compare(req.body.password, result[0].password)
                    .then(result => {
                        if(result) {
                            const loggedInUser = {
                                email: req.body.email,
                                password: req.body.password
                            }
        
                            // Create a session for the user which is logged-in
                            req.session.user = loggedInUser
                            req.session.save()
                            res.status(200).json( { message: `User Authenticated! Session started for the user with the email of ${req.session.user.email}` } )
                        } else {
                            res.status(400).json( { message: 'User Authentication Failed!' } )
                        }
                    })
                    .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err } ))
            }
        })
        .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err } ))
})

router.patch('/', (req, res) => {
    res.status(200).json( {msg: 'PATCH request to /users/login'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {msg: 'DELETE request to /users/login'} )
})

module.exports = router;