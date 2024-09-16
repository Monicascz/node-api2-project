// implement your server here
// require your posts router and connect it here
//STEP 3:
const express = require("express")
const postsRouter= require('./posts/posts-router.js')


//STEP 4:
const server = express();


//STEP 5:
server.use(express.json())

server.use('/api/posts', postsRouter)

server.use('*', (req,res)=>{
    res.status(404).json({
        message: 'not found'
    })
})




//STEP 6:
module.exports = server;