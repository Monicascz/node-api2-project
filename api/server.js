// implement your server here
//STEP 3:
const express = require("express")


//STEP 4:
const server = express();

//STEP 5:
server.use(express.json())
// require your posts router and connect it here

const Posts = require('./posts/posts-model')
// | 1 | GET    | /api/posts              | Returns **an array of all the post objects** contained in the database                                                                   |
server.get('/api/posts', (req,res)=>{
    Posts.find()
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
})
// | 2 | GET    | /api/posts/:id          | Returns **the post object with the specified id**                                                                                        |
server.get('/api/posts/:id', (req,res)=>{
    const {id}=req.params
    Posts.findById(id)
    
    .then(posts=>{
        if(!posts){
            res.status(404).json("Post not found")
        }else{
            res.status(200).json(posts)
        }
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
})

// | 3 | POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**                          |

// | 4 | PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original          |
// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**                                                           |
// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id    



//STEP 6:
module.exports = server;