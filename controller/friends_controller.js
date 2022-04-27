const User = require('../models/user_model.js');
const _ = require('lodash');



/********** Search all friends ********************************/                      /* Done */

exports.searchAllFriends = function findFriends(req, res){
    const id=req.user._id;
    const limit = req.body.limit

let foundUsers = [];
let numberOfFriends = 0;


if(limit == true){


  User.findById(id, function(err, found){
     if(found){
       numberOfFriends = (found.friends).length;
       if(numberOfFriends == 0){
         return res.status(200).json({status:"failure", users: []});
       }else{
         let flag;
         if((found.friends).length <=5){
           flag = (found.friends).length;
         }else{
           flag = 5;
         }
         found.friends.forEach((friend)=>{
           User.findById(friend, function(err, foundFriend){
            foundUsers.push(foundFriend);
            if(foundUsers.length === flag){
              return res.status(200).json({status:"success", users: foundUsers});
            }
           })
         })
       }
     }
   });

}else{

  User.findById(id, function(err, found){
     if(found){
       numberOfFriends = (found.friends).length;
       if(numberOfFriends == 0){
         return res.status(200).json({status:"failure", users: []});
       }else{
         found.friends.forEach((friend)=>{
           User.findById(friend, function(err, foundFriend){
            foundUsers.push(foundFriend);
            if(foundUsers.length === numberOfFriends){
              return res.status(200).json({status:"success", users: foundUsers});
            }
           })
         })
       }
     }
   });


}


}




/******************* Search all users *************************/                /* Done*/

exports.searchAllUsers = function findUser(req, res){

  const id = req.user._id;
  const limit = req.body.limit;

  if(limit){


      User.find(function(err, found){
          if(found.length == 0){
               return res.status(200).json({status:"failure", users: []});
          }else{

            for(var i=0; i< found.length; i++){
              if(found[i]._id == id){
              found.splice(i, 1);
              }
            }

        User.findById(id, function(err, foundUser){

     for(var i = 0; i<foundUser.friends.length; i++){

        for(var j = 0; j< found.length; j++){

        if(found[j]._id == foundUser.friends[i]){
          found.splice(j, 1);
        }

        }

     }
    return res.status(200).json({status:"success", users: found, senderId: id});

        })


          }
        }).limit(6);

  }else{



      User.find(function(err, found){
          if(found.length == 0){
               return res.status(200).json({status:"failure", users: []});
          }else{

            for(var i=0; i< found.length; i++){
              if(found[i]._id == id){
              found.splice(i, 1);
              }
            }

        User.findById(id, function(err, foundUser){

     for(var i = 0; i<foundUser.friends.length; i++){

        for(var j = 0; j< found.length; j++){

        if(found[j]._id == foundUser.friends[i]){
          found.splice(j, 1);
        }

        }

     }
    return res.status(200).json({status:"success", users: found, senderId: id});

        })


          }
        });

  }


}





/**************************** Search Specific users **********************/      /* Done */

exports.searchUsers = function findUser(req, res){
  const userName = req.body.userName;
  const senderId = req.user._id;
  User.find({ first_name: { $regex: userName, $options: 'i' } }, function(err, found){
    if(found.length == 0){
         return res.status(200).json({status:"failure", users: []});
    }else{

  for(var i=0; i< found.length; i++){
    if(found[i]._id == senderId){
    found.splice(i, 1);
    }
  }

    return res.status(200).json({status:"success", users: found, senderId: senderEmail});
    }
    });
}




/***************************** Add Friend *********************/

exports.addFriend = function findUser(req, res){
  const receiverId = req.body._id;
  const senderId = req.user._id;

  var flag = 1;

  User.findById(receiverId, function(err, found){
if(found){

found.requests.forEach((request)=>{
if(request == senderId){
  flag = 0;                                                     /* Already friend request sent */
}
})

found.friends.forEach((friend)=>{
if( friend == senderId){
  flag = -1;                                                      /* Already friends */
}
})


User.findById(senderId, function(err, foundSender){


  foundSender.requests.forEach((request)=>{
  if(request == receiverId){
    flag = 2;                                                   /* Check own friend request */
  }
  })

  if(flag == 0){
    return res.status(200).json({status:"alreadyRequested"});
  }else{
    if(flag == -1){
      return res.status(200).json({status:"alreadyFriend"});
    }else{
      if(flag == 2){
        return res.status(200).json({status:"checkOwnRequest"});
      }else{
        found.requests.push(senderId);
        found.save();
        return res.status(200).json({status:"success"});
      }

    }
  }

})


}else{
  return res.status(200).json({status:"failure"});
}
});


}




/*************** Display Friend requests *********************/

exports.searchRequests = function findUser(req, res){

const userId = req.user._id;
let foundUsers = [];
let numberOfFriendRequests = 0;

 User.findById(userId, function(err, found){
    if(found){
      numberOfFriendRequests = (found.requests).length;
      if(numberOfFriendRequests == 0){
        return res.status(200).json({status:"failure", users: []});
      }else{
        found.requests.forEach((request)=>{
          User.findById(request, function(err, foundSecond){
           foundUsers.push(foundSecond);
           if(foundUsers.length === numberOfFriendRequests){
             return res.status(200).json({status:"success", users: foundUsers});
           }
          })
        })
      }


    }
  });

}


/***************** Accept friend request ***********************/


exports.acceptFriendRequest = function findUser(req, res){

const senderId = req.user._id;
const receiverId = req.body._id;



let foundUsers = [];
let numberOfFriendRequests = 0;

User.findById(senderId, function(err, found){
    if(found){

      for(var i=0; i< found.requests.length; i++){
        if(found.requests[i] == receiverId){
        found.requests.splice(i, 1);
        }
      }
      found.friends.push(receiverId);
      found.save();

     User.findById(receiverId, function(err, secondFound){

       if(secondFound){

         for(var i=0; i< secondFound.requests.length; i++){
           if(secondFound.requests[i] == senderId){
           secondFound.requests.splice(i, 1);
           }
         }
          secondFound.friends.push(senderId);
         secondFound.save();


/* Same work thats been carried out in searchRequests */


              numberOfFriendRequests = (found.requests).length;
              if(numberOfFriendRequests == 0){
                return res.status(200).json({status:"success", users: []});
              }else{
                found.requests.forEach((request)=>{
                  User.findById(request, function(err, foundUser){
                   foundUsers.push(foundUser);
                   if(foundUsers.length === numberOfFriendRequests){
                     return res.status(200).json({status:"success", users: foundUsers});
                   }
                  })
                })
              }



/**********************************/

       }else{
         return res.status(200).json({status:"failure", users: []});
       }

     }); /**** Ending second find ****/

    }else{
      return res.status(200).json({status:"failure", users: []});
    }
  });









}





/************************* Remove Friend ***************************/


exports.removeFriend = function findUser(req, res){

const senderId = req.user._id;
const receiverId = req.body._id;


User.findById(senderId, function(err, found){
    if(found){

      for(var i=0; i< found.friends.length; i++){
        if(found.friends[i] == receiverId){
        found.friends.splice(i, 1);
        }
      }
      found.save();

     User.findById(receiverId, function(err, secondFound){

       if(secondFound){

         for(var i=0; i< secondFound.friends.length; i++){
           if(secondFound.friends[i] == senderId){
           secondFound.friends.splice(i, 1);
           }
         }
         secondFound.save();
         return res.status(200).json({status:"success"});
       }else{
         return res.status(200).json({status:"failure"});
       }

     }); /**** Ending second find ****/

    }else{
      return res.status(200).json({status:"failure"});
    }
  });


}





exports.getFriends=(req,res)=>{
  const {email}= req.body;
  let posts=[];
   User.findOne({email:email}).exec((err,user)=>{
      if(user){
          return res.status(200).json({status:"success",friends:user.friends})
      }
      else{
          return res.status(200).json({status:"failure",message:"Some error occured",err:err})
      }
  })
}






/************************** Ankita's delete user by admin *****************/


exports.deleteUser = function findUser(req, res){
  const userId = req.body.id;

User.deleteOne({ _id: userId }, function(err){
  if(err){
    console.log(err);
      return res.status(200).json({status:"failure"})
  }else{
      return res.status(200).json({status:"success"})
  }
});

}
