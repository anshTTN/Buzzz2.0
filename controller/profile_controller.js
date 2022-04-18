const usersData=require("../models/user_model")
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv')

dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET
exports.saveProfile=(req,res)=>{
    const {
        first_name,last_name,email,designation,gender,dob,pin_code,city,state,bio,website,prevEmail,coverImg,profileImg
    }=req.body;

    const updatedProfile={
        first_name:first_name,
        last_name:last_name,
        email:email,
        designation:designation,
        gender:gender,
        dob:dob,
        pin_code:pin_code,
        city:city,
        state:state,
        bio:bio,
        my_website:website,
        googleAuth:false,
        profileImg:profileImg,
        coverImg:coverImg
    }
    const emailRegex=/^[A-Za-z0-9._]{1,}@tothenew.com$/

    if(prevEmail!=email){
        usersData.findOne({email:prevEmail}).exec((err,user)=>{
            if(!(emailRegex.test(email))){
                return res.status(400).json({status:'failure',message:'You have to use only your TO THE NEW email id.'})
            }
            else{
                usersData.findOne({email:email}).exec((err,user1)=>{
                    if(user1)
                    return res.status(400).json({status:'failure',message:'This email is already regitered'})
                    else{
                        usersData.findOneAndUpdate({email:prevEmail},updatedProfile,(err,doc)=>{

                            const data={
                                user:{
                                    email:email
                                }
                            }
                            const authToken=jwt.sign(data,JWT_SECRET);
                            if(err)
                            return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
                            else
                            return res.status(200).json({status:"success",message:"Profile Updated",token:authToken})
                        })
                    }
                })
            }
    })
    }
    else{
        usersData.findOneAndUpdate({email:prevEmail},updatedProfile,(err,doc)=>{
            const data={
                user:{
                    email:email
                }
            }
            const authToken=jwt.sign(data,JWT_SECRET);
            if(err)
            return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
            else
            return res.status(200).json({status:"success",message:"Profile Updated",token:authToken})
        })
    }

}
