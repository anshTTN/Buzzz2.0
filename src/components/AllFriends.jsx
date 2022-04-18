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
  <img className="card-img-top" src={UserImage} alt="Card image cap" />
  <div className="card-body">
      <h5 className="card-title">{friend.first_name}</h5>
      <hr className="invisible"/>
      <div className="d-flex">
      <i className="fa-solid fa-location-dot"></i>
      <p className="mx-2">{friend.city}</p>
      </div>

      <div className=' buttonsforusers'>
          <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12 messagediv"><center><a href="#" className="btn btn-primary">Message</a></center></div>
              <div className="col-md-6 col-sm-12 col-xs-12 removediv"><center><a href="#" className="btn btn-primary">Remove</a></center></div>
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
