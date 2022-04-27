const express= require('express')
const dotenv= require('dotenv')
const path =require('path');

dotenv.config();
const app=express();
app.use(express.json());

require("./db/connect")

const userLoginRoutes=require(path.join(__dirname,"routes/user_routes"));
const friendsRoutes=require(path.join(__dirname,"routes/friends_routes"));
const profileRoutes=require(path.join(__dirname,"routes/profile_routes"));
const postRoutes=require(path.join(__dirname,"routes/post_routes"));
const adminRoutes=require(path.join(__dirname,"routes/adminRoutes"));

app.use(userLoginRoutes)
app.use(friendsRoutes)
app.use(profileRoutes)
app.use(postRoutes)
app.use(adminRoutes)

app.listen(5000,()=>{
    console.log("Backend server is connected on PORT 5000")
})
