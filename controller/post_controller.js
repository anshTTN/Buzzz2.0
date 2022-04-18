const postData=require("../models/post_model");

exports.createPost=(req,res)=>{
    const {post_text,image_url,email}=req.body;
            const post=new postData({
                userEmail:email,
                post_text:post_text,
                image_url:image_url,
                created_at:new Date()
            })
            post.save().then(userData=>{
                return res.status(200).json({status:"success",message:"Post created"})
            }).catch(err=>{
                return res.status(200).json({status:"failure",message:"Failed to create a post.Try again...",err:err})
            })
       
}
exports.getPosts=(req,res)=>{
    const {email}=req.body;
    postData.find({userEmail:email}).exec((err,post)=>{
        if(post)
        return res.status(200).json({status:"success",posts:post})
        else
        return res.status(200).json({status:"failure",message:"Failed to fetch posts.Try again...",err:err})
    })
          
        
       
}

