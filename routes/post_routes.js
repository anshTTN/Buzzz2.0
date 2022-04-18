const express=require("express")
const router=express();
const postController=require('../controller/post_controller');


router.post("/createPost", postController.createPost);
router.post("/getPosts", postController.getPosts);

module.exports=router;