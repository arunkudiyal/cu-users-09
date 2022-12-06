// Model --> A file which describes the specification (amount of data & Data Type of the data which is incoming) of the data
// Specification --> schema
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {
    // dataName: dataType
    _id: mongoose.Schema.Types.ObjectId,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    newPassword: mongoose.Schema.Types.String
})

// module.exports = mongoose.model(nameOfTheImport, schemaToBeExported)
module.exports = mongoose.model('Signup', userSchema)