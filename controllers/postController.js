const { validationResult } = require('express-validator');
const Post = require('../models/postModels');

const AddPost = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }

        const { title, description, cource_name } = req.body;

        var obj = {
            title,
            description,
            cource_name
        }

        const post = new Post(obj); 
        const postData = await post.save();

        const postFullData = await Post.findOne({}); 

        return res.status(200).json({
            success: true,
            msg: 'Post is created',
            data: postFullData
        })

    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
};

const GetPost = async(req,res) => {
    try{
        const posts = await Post.find({}); 

        return res.status(200).json({
            success: true,
            msg: 'Post is created',
            data: posts
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const DeletePost = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }
        const { id } = req.body;

        const postid = await Post.findOne({_id:id});
        if(!postid){
            return res.status(400).json({
                success: false,
                msg: 'Post Id Not Exist!!'
            }) 
        }

        await Post.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            msg: 'Post Deleted Successfully!'
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const UpdatePost = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors:errors.array()
            })
        }
        const { id,  title, description } = req.body;


        const postid = await Post.findOne({_id:id});
        if(!postid){
            return res.status(400).json({
                success: false,
                msg: 'Post Id Not Exist!!'
            }) 
        }

        var updateobj = {
            title,
            description,
            cource_name
        }

        const updateData = await Post.findByIdAndUpdate({ _id: id },
            {
                $set:updateobj
            },{ new:true }
        );
        return res.status(200).json({
            success: true,
            msg: 'Post Updated Successfully!',
            data: updateData
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    AddPost,
    GetPost,
    DeletePost,
    UpdatePost
}