const express = require('express');
// const { findOneAndUpdate } = require('../models/Blog');
const router = express.Router();
const Blog = require('../models/blog')

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

module.exports = router;