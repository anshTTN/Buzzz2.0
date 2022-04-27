const express=require("express")
const router=express();
const adminController=require('../controller/adminController');
const auth=require('../controller/auth');



router.post("/getAllPost",auth.verifyUsers, adminController.getAllPosts);
router.post("/getAllUser", auth.verifyUsers, adminController.getAllUsers);


module.exports=router;
