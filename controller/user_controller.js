const dotenv= require('dotenv')
const {OAuth2Client} = require('google-auth-library');
const usersData=require("../models/user_model")
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')


dotenv.config();
const client=new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const JWT_SECRET=process.env.JWT_SECRET
//google login
exports.googleLogin=async (req,res)=>{
    const {token}=req.body;
    const ticket=await client.verifyIdToken({
        idToken: token,
        audience:process.env.REACT_APP_GOOGLE_CLIENT_ID,
    })
    const {name,email,picture}=ticket.getPayload();


    usersData.findOne({email:email}).exec((err,user)=>{
        if(user){
            const data={
                user:{
                    email:email
                }
            }
            const authToken=jwt.sign(data,JWT_SECRET);
            return res.status(200).json({status:"success",name:name,email:email,token:authToken})
        }
        else{
            if(name!='' && email!=''){
                const userDetails=new usersData({
                    first_name:name,
                    email:email,
                    googleAuth:true
                })
                userDetails.save().then(resp=>{
                    const data={
                        user:{
                            email:email
                        }
                    }
                    const authToken=jwt.sign(data,JWT_SECRET);
                    return res.status(200).json({status:"success",name:name,email:email,token:authToken})
                }).catch(err=>{
                    usersData.findOneAndDelete(({email:email}),(err)=>{
                        if(err)
                        console.log(err)
                    })
                    console.log(err)
                    return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
                })

            }
            else{
                return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
            }
        }
    })

}



//user register
exports.userRegistration=(req,res)=>{
    const {
        first_name,last_name,email,designation,gender,dob,pin_code,city,state,password
    }=req.body;

    const emailRegex=/^[A-Za-z0-9._]{1,}@tothenew.com$/

    usersData.findOne({email:email}).exec((err,user)=>{

        if(user && !user.googleAuth){
            return res.status(400).json({status:'failure',message:'This email is already registered.'})
        }
        else if((user && user.googleAuth)){


                if(!(/(?=.{8,})/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must be atleast 8 characters long'})
                }
                else if(!(/(?=.*[a-z])/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one lowercase alphabet'})
                } else if(!(/(?=.*[A-Z])/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one UPPERCASE alphabet'})
                } else if(!(/(?=.*\d)/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one digit'})
                }else if(!(/(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one special character'})
                }
                else{

                    const salt=bcrypt.genSaltSync(10);
                    const updatedUserDetails={
                        first_name:first_name,
                        last_name:last_name,
                        email:email,
                        designation:designation,
                        gender:gender,
                        dob:dob,
                        pin_code:pin_code,
                        city:city,
                        state:state,
                        password:bcrypt.hashSync(password,salt),
                        googleAuth:false
                    }

                    usersData.findOneAndUpdate({email:email},updatedUserDetails,(err,doc)=>{
                        if(err)
                        return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
                        else
                        return res.status(200).json({status:"success",message:"Registered succesfully",email:email,password:password})
                    })
                }



        }
        else{
            if(!(emailRegex.test(email))){
                console.log((/(?=.{8,})/).test(password))
                return res.status(400).json({status:'failure',message:'You have to use only your TO THE NEW email id.'})
            }
            else{
                if(!(/(?=.{8,})/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must be atleast 8 characters long'})
                }
                else if(!(/(?=.*[a-z])/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one lowercase alphabet'})
                } else if(!(/(?=.*[A-Z])/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one UPPERCASE alphabet'})
                } else if(!(/(?=.*\d)/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one digit'})
                }else if(!(/(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/).test(password)){
                    return res.status(400).json({status:'failure',message:'Password must have atleast one special character'})
                }
                else{

                    const salt=bcrypt.genSaltSync(10);
                    const userDetails=new usersData({
                        first_name:first_name,
                        last_name:last_name,
                        email:email,
                        designation:designation,
                        gender:gender,
                        dob:dob,
                        pin_code:pin_code,
                        city:city,
                        state:state,
                        password:bcrypt.hashSync(password,salt),
                        googleAuth:false
                    })

                    userDetails.save().then(resp=>{
                        return res.status(200).json({status:"success",message:"Registered succesfully",email:resp.email,password:resp.password})
                    }).catch(err=>{
                        usersData.findOneAndDelete(({email:email}),(err)=>{
                            if(err)
                            console.log(err)
                        })
                        console.log(err)
                        return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
                    })
                }
            }
        }
        }
    )
}



//user login using email
exports.userLogin=(req,res)=>{
    const {
        email,password
    }=req.body;

    usersData.findOne({email:email}).exec((err,user)=>{
        if(!user){
            return res.status(400).json({status:'failure',message:'This email is not registered.'})
        }
        else if(user.googleAuth){
            return res.status(400).json({status:'failure',message:'This email is Authenticated with Google . Login with Google or try Registering using this email.'})
        }
            else{
            const pswdCompare=bcrypt.compareSync(password,user.password)
            if(!pswdCompare){
                return res.status(400).json({status:'failure',message:'Password is incorrect.'})
            }
            else{
                const data={
                    user:{
                        email:email
                    }
                }
                const authToken=jwt.sign(data,JWT_SECRET);
                res.status(200).json({
                    status:"success",
                    message:"login successful",
                    email:user.email,
                    token:authToken
                })
            }

        }
    })
}


exports.verifyEmail=(req,res)=>{
    const {
        email,dob
    }=req.body;
    usersData.findOne({email:email}).exec((err,user)=>{
        if(!user){
            return res.status(400).json({status:'failure',message:'This email is not registered.'})
        }
        else if(user.googleAuth){
            return res.status(400).json({status:'failure',message:'This email is Authenticated with Google . Try Registering using this email.'})
        }
        else{
            const userDob=JSON.stringify(user.dob).substring(0,11)+"\""
                if(JSON.stringify(dob)===userDob)
                return res.status(200).json({status:'success',message:'Date of birth verified.Now you can change your password'})
                else
                return res.status(400).json({status:'failure',message:'Date of birth is incorrect.'})

        }
    })
}

exports.changePassword=(req,res)=>{
    const {
        password,confirmPassword,email
    }=req.body;
    if(password===confirmPassword){
        if(!(/(?=.{8,})/).test(password)){
            return res.status(400).json({status:'failure',message:'Password must be atleast 8 characters long'})
        }
        else if(!(/(?=.*[a-z])/).test(password)){
            return res.status(400).json({status:'failure',message:'Password must have atleast one lowercase alphabet'})
        } else if(!(/(?=.*[A-Z])/).test(password)){
            return res.status(400).json({status:'failure',message:'Password must have atleast one UPPERCASE alphabet'})
        } else if(!(/(?=.*\d)/).test(password)){
            return res.status(400).json({status:'failure',message:'Password must have atleast one digit'})
        }else if(!(/(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/).test(password)){
            return res.status(400).json({status:'failure',message:'Password must have atleast one special character'})
        }
        else{
            const salt=bcrypt.genSaltSync(10);
                        const updatedData={
                            password:bcrypt.hashSync(password,salt)
                        }
                        usersData.findOneAndUpdate({email:email},updatedData,(err,doc)=>{
                            if(err)
                            return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
                            else
                            return res.status(200).json({status:"success",message:"Password Changed Successfully"})
                        })
        }
    }
    else{
        return res.status(400).json({status:"failure",message:'Password do not match . Try again...'})
    }


}


exports.getUser= async (req,res,next)=>{
  const email=req.user.email;
  usersData.findOne({email:email}).exec((err,user)=>{
    if(user)
    return res.status(200).json({status:"success",user:user})
    else
      return res.status(400).json({status:"failure",message:'Some network error occured try again ....'})
  })

}
