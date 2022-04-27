import React from 'react';
import { useState , useEffect } from 'react';



const User = () => {

  const [users , setUsers] = useState([]);

  const [loading , setLoading] = useState(true);


  useEffect(() => {
    getUsers();
  } , [])

  // function deleteProfile(e){

  //   console.log(e.target.value);

  // // removeProfile(e.target.value);

  // }

  // async function removeProfile(id){

  //   const res = await fetch(`/deleteProfile/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "content-Type": "application/json",
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //   });


  
  //   const data = await res.json();

  //   console.log(data.status);
  
  //   setUsers(data.users);

  //   console.log(data.users);

  //   // setLoading(false);

  // }

  


  async function getUsers(){

    const res = await fetch("/getAllUser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });


  
    const data = await res.json();
  
    setUsers(data.users);

    // console.log(data.users);

    setLoading(false);

  }


    if(loading){
      return(
        <h1> Loading .. </h1>
      )
    }else{
    
      if(users.length == 0){
        return (
          <>
          <div className='py-4 activity border contactContainer'>
                 <h4 className="px-3"> Profile </h4>
                   <hr />
            <h4 className="px-3"> No Profiles Yet</h4>
          </div>
        </>
        );
      }else{

        return (
          <>

<div className="row py-4 px-4">

<h2>Profiles</h2>


<hr className="invisible"/>

{users.map((user) => (

<div className="card col-md-4 col-sm-6 col-xs-12 userPost">


<center> <img className="postImage" src={user.profileImg} alt="Card image cap" />  </center>

<div className="d-flex justify-content-around postContent">
    <h5 className="d-flex">{user.first_name} {user.last_name}</h5>
    <hr className="invisible"/>

    <div className='buttonsUsers'>
        <div className="d-flex">
            <div className="col-md-6 col-sm-12 col-xs-12 postBtn"><center><button className="btn btn-primary " >Delete</button></center></div>
            {/* <div className="col-md-6 col-sm-12 col-xs-12 removediv"><center><button className="btn btn-primary" onClick={addFriend} value={user._id}>Add Friend</button></center></div> */}
        </div>
    </div>
</div>
</div> 

))}

  </div>
  
  </>
        )
  
    
  
  }
}

}

export default User





//   return (
//     <div>
//       User Page
//     </div>
//   )
// }
// }

// export default User
