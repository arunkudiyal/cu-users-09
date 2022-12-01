// Creating a Server using NodeJS Moddule - http
const http = require('http')
const app = require('./app')

const PORT = 5001 || process.env.PORT

const server = http.createServer(app)
server.listen(PORT)