// Model --> A file which describes the specification (amount of data & Data Type of the data which is incoming) of the data
// Specification --> schema
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {
    // dataName: dataType
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    newPassword: {
        type: mongoose.Schema.Types.String
    }
})

// module.exports = mongoose.model(nameOfTheImport, schemaToBeExported)
module.exports = mongoose.model('Signup', userSchema)