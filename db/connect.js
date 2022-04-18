const mongoose =require('mongoose')
const mongoURI='mongodb+srv://BuzzzProject:Buzzz@buzzz.kqhcp.mongodb.net/Buzzz'

mongoose.connect(mongoURI,{

}).then(()=>{console.log("DB connected")})
.catch(err=>console.log("DB connection error",err))