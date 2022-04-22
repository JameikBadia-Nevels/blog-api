const express = require('express');
// const { findOneAndUpdate } = require('../models/Blog');
const router = express.Router();
const Blog = require('../models/blog')
const users = [{}]
const bcrypt = require('bcrypt')


///index
router.get('/', (req, res)=>{
    Blog.find({}, (err, foundPost) =>{
        res.json(foundPost)

    })
});

//Delete
router.delete('/:id', (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
        res.json(deletedPost);
    });
});

//update
router.put('/:id', (req, res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost)=>{
        res.json(updatedPost);
    });
});

//create
router.post('/', (req,res) => {
    Blog.create(req.body, (err, createdPost) => {
        res.json(createdPost)
    })
})

router.get('/:id', (req, res)=>{
    Blog.findById(req.params.id, (err, foundPost)=>{
        res.json(foundPost);
    });
});

//user routes

router.get('/users', (req,res) => {
    res.json(users)
  })

router.post('/users', async (req,res) => {
    try{
      const hashedPass = await bcrypt.hash(req.body.password, 10)
      console.log(hashedPass)
      const user = {name: req.body.name, password: hashedPass }
      users.push(user)
     res.status(201).send()
    }
  
    catch{
      res.status(500).send()
    }
  
  })





module.exports = router;