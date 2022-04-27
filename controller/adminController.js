const postData=require("../models/post_model");
const usersData=require("../models/user_model")

exports.getAllPosts=async (req,res)=>{
    
    postData.find().then(data=>{
        return res.status(200).json({status:"success",posts:data})
    }).catch(err=>{
        
        return res.status(400).json({status:"failure",message:err})
    })

    // console.log("working......");

}

exports.getAllUsers=async (req,res)=>{
    
    usersData.find().then(data=>{
        return res.status(200).json({status:"success",users:data})
    }).catch(err=>{
        
        return res.status(400).json({status:"failure",message:err})
    })

    // console.log("working....");

}


