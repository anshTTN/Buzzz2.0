const express=require("express")
const router=express();
const profileController=require('../controller/profile_controller');



router.post("/saveProfile", profileController.saveProfile);


module.exports=router;