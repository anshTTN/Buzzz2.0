const User = require('../models/user_model.js');
const _ = require('lodash');



/********** Search all friends ********************************/                      /* Done */

exports.searchAllFriends = function findFriends(req, res){
    const email=req.user.email;

let foundUsers = [];
let numberOfFriends = 0;

 User.find({ email: email }, function(err, found){
    if(found){
      numberOfFriends = (found[0].friends).length;
      if(numberOfFriends == 0){
        return res.status(200).json({status:"failure", users: []});
      }else{
        found[0].friends.forEach((friend)=>{
          User.find({ email: friend }, function(err, foundFriend){
           foundUsers.push(foundFriend[0]);
           if(foundUsers.length === numberOfFriends){
             return res.status(200).json({status:"success", users: foundUsers});
           }
          })
        })
      }
    }
  });


}




/******************* Search all users *************************/                /* Done*/

exports.searchAllUsers = function findUser(req, res){

  const senderEmail = req.user.email;

  User.find(function(err, found){
      if(found.length == 0){
           return res.status(200).json({status:"failure", users: []});
      }else{

        for(var i=0; i< found.length; i++){
          if(found[i].email == senderEmail){
          found.splice(i, 1);
          }
        }

    User.find({email: senderEmail}, function(err, foundUser){

 for(var i = 0; i<foundUser[0].friends.length; i++){

    for(var j = 0; j< found.length; j++){

    if(found[j].email == foundUser[0].friends[i]){
      found.splice(j, 1);
    }

    }

 }
return res.status(200).json({status:"success", users: found, senderEmail: senderEmail});

    })


      }
    });

}





/**************************** Search Specific users **********************/      /* Done */

exports.searchUsers = function findUser(req, res){
  const userName = req.body.userName;
  const senderEmail = req.user.email;
  User.find({ first_name: { $regex: userName, $options: 'i' } }, function(err, found){
    if(found.length == 0){
         return res.status(200).json({status:"failure", users: []});
    }else{

  for(var i=0; i< found.length; i++){
    if(found[i].email == senderEmail){
    found.splice(i, 1);
    }
  }

    return res.status(200).json({status:"success", users: found, senderEmail: senderEmail});
    }
    });
}




/***************************** Add Friend *********************/

exports.addFriend = function findUser(req, res){
  const receiverEmail = req.body.email;
  const senderEmail = req.user.email;

  var flag = 1;

  User.find({email: receiverEmail}, function(err, found){
if(found){


found[0].requests.forEach((request)=>{
if(request == senderEmail){
  flag = 0;                                                     /* Already friend request sent */
}
})

found[0].friends.forEach((friend)=>{
if( friend == senderEmail){
  flag = -1;                                                      /* Already friends */
}
})


User.find({email: senderEmail}, function(err, foundSender){

  foundSender[0].requests.forEach((request)=>{
  if(request == receiverEmail){
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
        found[0].requests.push(senderEmail);
        found[0].save();
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

const userEmail = req.user.email;
let foundUsers = [];
let numberOfFriendRequests = 0;

 User.find({ email: userEmail }, function(err, found){
    if(found){
      numberOfFriendRequests = (found[0].requests).length;
      if(numberOfFriendRequests == 0){
        return res.status(200).json({status:"failure", users: []});
      }else{
        found[0].requests.forEach((request)=>{
          User.find({ email: request }, function(err, found){
           foundUsers.push(found[0]);
           if(foundUsers.length === numberOfFriendRequests){
             console.log(foundUsers);
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

const senderEmail = req.user.email;
const receiverEmail = req.body.email;

//
// User.find({ email: senderEmail }, function(err, found){
//     if(found){
//
//       for(var i=0; i< found[0].requests.length; i++){
//         if(found[0].requests[i] == receiverEmail){
//         found[0].requests.splice(i, 1);
//         }
//       }
//       found[0].friends.push(receiverEmail);
//       found[0].save();
//
//      User.find({email: receiverEmail}, function(err, secondFound){
//
//        if(secondFound){
//
//          for(var i=0; i< secondFound[0].requests.length; i++){
//            if(secondFound[0].requests[i] == receiverEmail){
//            secondFound[0].requests.splice(i, 1);
//            }
//          }
//           secondFound[0].friends.push(senderEmail);
//          secondFound[0].save();
//
//        return res.status(200).json({status:"success"});
//        }else{
//          return res.status(200).json({status:"failure"});
//        }
//
//      }); /**** Ending second find ****/
//
//     }else{
//       return res.status(200).json({status:"failure"});
//     }
//   });



let foundUsers = [];
let numberOfFriendRequests = 0;

User.find({ email: senderEmail }, function(err, found){
    if(found){

      for(var i=0; i< found[0].requests.length; i++){
        if(found[0].requests[i] == receiverEmail){
        found[0].requests.splice(i, 1);
        }
      }
      found[0].friends.push(receiverEmail);
      found[0].save();

     User.find({email: receiverEmail}, function(err, secondFound){

       if(secondFound){

         for(var i=0; i< secondFound[0].requests.length; i++){
           if(secondFound[0].requests[i] == receiverEmail){
           secondFound[0].requests.splice(i, 1);
           }
         }
          secondFound[0].friends.push(senderEmail);
         secondFound[0].save();


/* Same work thats been carried out in searchRequests */


              numberOfFriendRequests = (found[0].requests).length;
              if(numberOfFriendRequests == 0){
                return res.status(200).json({status:"success", users: []});
              }else{
                found[0].requests.forEach((request)=>{
                  User.find({ email: request }, function(err, foundUser){
                   foundUsers.push(foundUser[0]);
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





/************************* Delete Friend Request ***************************/


// exports.deleteFriendRequest = function findUser(req, res){
//
// const senderEmail = req.user.email;
// const receiverEmail = req.body.email;
//
//
// User.find({ email: senderEmail }, function(err, found){
//     if(found){
//
//       for(var i=0; i< found[0].requests.length; i++){
//         if(found[0].requests[i] == receiverEmail){
//         found[0].requests.splice(i, 1);
//         }
//       }
//       found[0].save();
//
//      User.find({email: receiverEmail}, function(err, secondFound){
//
//        if(secondFound){
//
//          for(var i=0; i< secondFound[0].requests.length; i++){
//            if(secondFound[0].requests[i] == receiverEmail){
//            secondFound[0].requests.splice(i, 1);
//            }
//          }
//          secondFound[0].save();
//          return res.status(200).json({status:"success"});
//        }else{
//          return res.status(200).json({status:"failure"});
//        }
//
//      }); /**** Ending second find ****/
//
//     }else{
//       return res.status(200).json({status:"failure"});
//     }
//   });
//
//
// }
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