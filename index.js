// require your server and launch it here

//STEP 1: connect the index.js to the api/server.js
const server = require('./api/server.js')

//STEP 2: make sure the server is listening.
server.listen(3000, ()=>{
    console.log('server running on port 3000.')
})