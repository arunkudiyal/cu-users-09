const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    loggedInUser = req.session.user

    // To logout, you need to kill the session for the user
    req.session.destroy()
    res.status(200).json( {message: 'User Logged Out', loggedOutUser: loggedInUser} )
})

module.exports = router;