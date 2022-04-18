const express = require('express');
const router = express.Router();
const friends = require('../controller/friends_controller');
const auth=require('../controller/auth');



// router.post("/searchfriends",auth.verifyUsers, friends.searchFriends);   

router.post("/addfriend",auth.verifyUsers, friends.addFriend);

router.post("/searchallfriends",auth.verifyUsers, friends.searchAllFriends);  /* Done */


router.post("/getFriends", friends.getFriends);



module.exports = router;
