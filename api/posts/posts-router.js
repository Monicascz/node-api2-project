// implement your posts router her

const Posts = require('./posts-model.js')
const express=require("express")
const router=express.Router()


// | 1 | GET    | /api/posts              | Returns **an array of all the post objects** contained in the database                                                                   |
router.get('/', (req,res)=>{
    Posts.find()
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(()=>{
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

// | 2 | GET    | /api/posts/:id          | Returns **the post object with the specified id**                                                                                        |
router.get('/:id', (req,res)=>{
    const {id}=req.params
    Posts.findById(id)
    
    .then(posts=>{
        if(!posts){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(posts)
        }
    })
    .catch(()=>{
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

// | 3 | POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**                          |
router.post('/', (req,res)=>{
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        Posts.insert(newPost)
        //code from Gabe's follow-along - works
            .then(({id})=>{
                return Posts.findById(id)
            })
            .then(posts=>{
                res.status(201).json(posts)
            })
        
            //my code from homwork, also works.
        // .then(posts=>{
        //     const postID = posts.id
        //     Posts.findById(postID)
        //     .then(posts=>{
        //         res.status(201).json(posts)
        //     })
        // })
        .catch(()=>{
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }       
})

// | 4 | PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original          |

router.put('/:id', async(req,res)=>{
    const {id} = req.params
    const changes = req.body
   
    //USING TRY/CATCH
    
        if(!changes.title || !changes.contents){
            res.status(400).json({ message: "Please provide title and contents for the post" })
        }else{
            
            Posts.findById(id)
            .then(stuff=>{
                if(!stuff){
                    res.status(404).json({message: "The post with the specified ID does not exist"})
                }else{
                    return Posts.update(id, changes)
                }
            })
            .then(data=>{
                if(data){
                    return Posts.findById(id)
                }
            })
            .then(post=>{
                if(post){
                    res.json(post)
                }
            })
            .catch(err=>{ res.status(500).json({ message: "The post information could not be modified"})
        
            })

        }
    })
            // const updatedPost = await Posts.update(id, changes)
            // if(!updatedPost){
            //     res.status(422).json("User doesn't exist.")
            // }else{
            //     res.status(200).json(updatedPost)
            // }
        


// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**       
router.delete('/:id', async (req,res)=>{
    const {id}=req.params

    try{
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            const numOfDeletedPosts = await Posts.remove(req.params.id) // if this works, it should be one
            // res.status(200).json({ message: 'The post has been deleted' })
            res.json(post)
        }
    }catch(err){
        res.status(500).json({ message: "The post could not be removed" })
    }

    // Posts.remove(id)
    // .then(posts=>{
    //     if(posts>0){
    //         res.status(200).json({ message: 'The post has been deleted' });
    //     }else {
    //         res.status(404).json({ message: "The post with the specified ID does not exist" });
    //       }
    // })
    // .catch(()=>{
    //     res.status(500).json({ message: "The post could not be removed" })
    // })
})
// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id    
router.get('/:id/comments', async (req,res)=>{
    const {id}=req.params.id

    try{
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            const comments = await Posts.findPostComments(id)
            res.json(comments)
        }

    }catch(err){
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }

    // //Posts.findbyId
    // // if post exists(findPost comments)
    // Posts.findPostComments(postId)
    // console.log(postId)
    // .then(postCom=>{
    //     console.log('test')
    //     res.status(200).json(postCom)
    // })
    // .catch(()=>{
    //     res.status(500).json({ message: "The comments information could not be retrieved" })
    // })
})
module.exports = router;

