const express=require("express")
const router=express()
const _ = require('lodash');
const userLoginController=require('../controller/user_controller');
const auth=require('../controller/auth');
const userFriendsController = require('../controller/friends_controller');



router.post("/searchusers",auth.verifyUsers, userFriendsController.searchUsers); /* Done */

router.delete("/deleteuser",auth.verifyUsers, userFriendsController.deleteUser); /* Done */

router.post("/searchallusers",auth.verifyUsers, userFriendsController.searchAllUsers); /* Done */

router.post("/searchrequests",auth.verifyUsers, userFriendsController.searchRequests); /* Done */

router.post("/acceptfriendrequest",auth.verifyUsers, userFriendsController.acceptFriendRequest);

router.post("/getUser",auth.verifyUsers, userLoginController.getUser);

router.post("/googleAuth",userLoginController.googleLogin);

router.post("/register",userLoginController.userRegistration);

router.post("/login",userLoginController.userLogin);

router.post("/verifyEmail",userLoginController.verifyEmail);

router.post("/forgotPassword",userLoginController.changePassword);

module.exports=router;
