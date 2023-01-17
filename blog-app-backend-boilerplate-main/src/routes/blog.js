const router = require('express').Router();
const e = require('express');
const Blog = require('../models/Blog'); 

// Your routing code goes here
router.post("/blog", async(req, res) => {
    try{
        const blog = await Blog.create(req.body);
        res.json({
            status: "success",
            data: blog
        })
    }catch(e){
        res.status(404).json({
            status: "failure",
            message: e.message
        })
    }
})

router.get('/blog',async(req,res)=>{
    try{
        // const {page=1, search=""} = req.query;
        // let blog;
        // if(search == ""){
        //     blog = await Blog.find().skip((page-1) * 5).limit(5);
        // }else{
        //     blog = await Blog.find({topic: search}).skip((page-1) * 5).limit(5);
        // }
        const blog = await Blog.find();
        res.json({
            status: "success",
            data: blog
        })
    }catch(e){
        res.status(400).json({
            status: "failure",
            message: e.message
        })
    }
})

router.put('/blog/:id', async(req,res)=>{
    try{
        const blog = await Blog.updateOne({_id:req.params.id}, req.body);
        console.log(blog);
        const updated = await Blog.findOne({_id:req.params.id});
        res.json({
            status: "success",
            data: updated
        });
    }catch(e){
        res.status(400).json({
            status: "failure",
            message: e.message
        })
    }
})

router.delete('/blog/:id', async(req,res)=>{
    try{
        const blog = await Blog.deleteOne({_id:req.params.id});
        res.json({
            status: "success",
            message: blog
        });
    }catch(e){
        res.status(404).json({
            status: "failure",
            message: e.message
        })
    }
})


module.exports = router;