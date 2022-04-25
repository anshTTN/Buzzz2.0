import {useEffect, useState} from "react";
import UserImage from "../images/user.jpg";
import Header from "./Header.jsx";

function AllFriends(){

  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
  searchAllFriends();
  }, []);

  async function searchAllFriends(){
   const result = await fetch(`/searchallfriends`,{
         method: 'POST',
         headers:{
           'content-Type':'application/json',
           'auth-token':localStorage.getItem('token')
         },
       });
       const data = await result.json();
         setFriends(data.users);
         console.log("all friends : "+ data.users[0]);
         setLoading(false);
  }


{/*---------------- Remove friend -------------*/}


function removeFriend(e){
  if( window.confirm("Are you sure you want to remove?")){

    removeAFriend(e.target.value);

  }

}


async function removeAFriend(id){
 const result = await fetch(`/removefriend`,{
       method: 'POST',
       headers:{
         'content-Type':'application/json',
         'auth-token':localStorage.getItem('token')
       },
       body:JSON.stringify({
           _id: id
         })
     });
     const data = await result.json();
      if(data.status == "success"){
         setFriends(friends.filter((item)=> item._id != id))
        setLoading(false);
      }

}




  if(loading){
    return(
      <h1> Loading .. </h1>
    )
  }else{

    if(friends.length == 0){
      return (
        <>
        <Header />
        <h1> No Friends Found </h1>
        </>
      );
    }else{




return (


<div>
    <Header />
    <div className="row py-4 px-4 searched-users">

<hr className="invisible"/>

{friends.map((friend) => (

<div className="card col-md-4 col-sm-6 col-xs-12">
  <img className="card-img-top" src={friend.profileImg} alt="Card image cap" />
  <div className="card-body">
      <h5 className="card-title">{friend.first_name} {friend.last_name}</h5>
      <hr className="invisible"/>
      <div className="d-flex">
      <i className="fa-solid fa-location-dot"></i>
      <p className="mx-2">{friend.city}</p>
      </div>

      <div className=' buttonsforusers'>
          <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12 messagediv"><center><button className="btn btn-primary">Message</button></center></div>
              <div className="col-md-6 col-sm-12 col-xs-12 removediv"><center><button className="btn btn-primary" value={friend._id} onClick={removeFriend}>Remove</button></center></div>
          </div>
      </div>
  </div>
</div>

))}




    </div>

</div>



);

}
}
}

export default AllFriends;
