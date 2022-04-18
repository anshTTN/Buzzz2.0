import React from 'react'
import profile from "../images/profile.png";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Contacts() {

const [users, setUsers] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(()=>{
searchFriends();
}, []);


async function searchFriends(){
 const result = await fetch(`/searchallfriends`,{
       method: 'POST',
       headers:{
         'content-Type':'application/json',
         'auth-token':localStorage.getItem('token')
       }
     });
     const data = await result.json();
       setUsers(data.users);
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
             <h4 className="px-3"> Contacts </h4>
               <hr />
        <h4 className="px-3"> No friends yet </h4>       
      </div>
    </>
    );
  }else{



  return (
    <>
    <div className='py-4 activity border contactContainer'>


       <h4 className="px-3"> Contacts </h4>

<hr />






{users.map((user) => (

  <div className="d-flex px-3">
  <img className="circle me-3" src={profile} alt="" />

    <p>{user.first_name}</p>
  </div>

))}

<Link to="/searchfriends"> <h5 className="text-center"> See all friends </h5> </Link>

     </div>
   </>
  )
}
}
}

export default Contacts
