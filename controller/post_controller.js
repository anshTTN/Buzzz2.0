const postData=require("../models/post_model");
const usersData=require("../models/user_model")

exports.createPost=async (req,res)=>{
    const {post_text,image_url}=req.body;
    const user= await usersData.findById(req.user._id)
    let name;
    if(user.first_name&&user.last_name){
         name=user.first_name+" "+user.last_name
    }
    else{
         name=user.first_name
    }
            const post={
                userName:name,
                userId:req.user._id,
                post_text:post_text,
                image_url:image_url,
                userImage:user.profileImg
            }
            const newPost=await postData.create(post);
            user.posts.push(newPost._id);
            user.save().then(userData=>{
                return res.status(200).json({status:"success",message:"Post created"})
            }).catch(err=>{
                return res.status(400).json({status:"failure",message:"Failed to create a post.Try again...",err:err})
            })
       
}

exports.likeAndDislikePost=async (req,res)=>{
    const post=await postData.findById(req.params.id)
    const like=req.params.like
    if(like==='true'){

        if(post.like.includes(req.user._id)){
            const index=post.like.indexOf(req.user._id);
            post.like.splice(index,1);
             post.save().then(data=>{
                return res.status(200).json({status:"success",message:"Post unliked"})
            }).catch(err=>{
                return res.status(400).json({status:"failure",message:"Failed to unlike post"})
            })
        }else{
            post.like.push(req.user._id);
            post.save().then(data=>{
                return res.status(200).json({status:"success",message:"Post Liked"})
            }).catch(err=>{
                return res.status(400).json({status:"failure",message:"Failed to like post"})
            })
        }

    }else{

        if(post.dislike.includes(req.user._id)){
            const index=post.dislike.indexOf(req.user._id);
            post.dislike.splice(index,1);
             post.save().then(data=>{
                return res.status(200).json({status:"success",message:"Post Disliked"})
            }).catch(err=>{
                return res.status(400).json({status:"failure",message:"Failed to dislike post"})
            })
        }else{
            post.dislike.push(req.user._id);
            post.save().then(data=>{
                return res.status(200).json({status:"success",message:"Post disliked"})
            }).catch(err=>{
                return res.status(400).json({status:"failure",message:"Failed to dislike post"})
            })
        }

    }

        
       
}


exports.comment=async (req,res)=>{
    const post=await postData.findById(req.params.id)
    const user= await usersData.findById(req.user._id)
    const {com}=req.body;
    let name;
    if(user.first_name&&user.last_name){
         name=user.first_name+" "+user.last_name
    }
    else{
         name=user.first_name
    }
    const comment={
        userId:req.user._id,
        userName:name,
        comment:com
    }
    post.comments.push(comment);
    post.save().then(data=>{
        return res.status(200).json({status:"success",message:"Comment added succesfully"})
    }).catch(err=>{
        return res.status(400).json({status:"failure",message:"Failed to add comment"})
    })

}

exports.getPosts=async (req,res)=>{
    try{
        const user=await usersData.findOne({email:req.user.email})
        let posts=await postData.find({userId:{
            $in:user.friends
        }})
            return res.status(200).json({status:"success",posts:posts})
    }
    catch{
        return res.status(400).json({status:"failure",message:"Failed to fetch posts.Try again..."})
    }
          
        
       
}


exports.getPostDetails=async(req,res)=>{
    try{
        const post=await postData.findById(req.params.id)
        return res.status(200).json({status:"success",post:post})
    }
    catch{
        return res.status(400).json({status:"failure",message:"Failed to fetch post details"})
    }
}
