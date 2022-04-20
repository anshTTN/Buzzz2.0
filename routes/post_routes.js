const express=require("express")
const router=express();
const postController=require('../controller/post_controller');
const auth=require('../controller/auth');

router.post("/createPost",auth.verifyUsers, postController.createPost);
router.post("/getPosts", auth.verifyUsers, postController.getPosts);
router.post("/likeAndDislikePost/:like/:id", auth.verifyUsers, postController.likeAndDislikePost);
router.post("/comment/:id", auth.verifyUsers, postController.comment);
router.get("/getPostDetail/:id",postController.getPostDetails);

module.exports=router;