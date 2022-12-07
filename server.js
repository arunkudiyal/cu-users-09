// Server -> A platform on which the diff components of the application will render
// Server -> Local Machine (localhost -> localhost:5500; localhost: 3000; localhost: 5000...) || 
// Cloud Machine -> Cloud Providers -> AWS (Amazon Web Services), GCP (Google Cloud Provider), Azure (Microsoft)  
// Creating a Server using NodeJS Moddule - http

// Deploy any application on AWS
const http = require('http')
const app = require('./app')

// const PORT = 5001 || process.env.PORT
const PORT = process.env.PORT || 5001

const server = http.createServer(app)
server.listen(PORT)