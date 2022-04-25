import React from 'react'
import profile from "../images/profile.png";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function SuggestedContacts() {

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
  searchAllUsers();
  }, []);

  async function searchAllUsers(){
   const result = await fetch(`/searchallusers`,{
         method: 'POST',
         headers:{
           'content-Type':'application/json',
           'auth-token':localStorage.getItem('token')
         },
         body:JSON.stringify({
             limit: true
           })
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
               <h4 className="px-3"> Suggestions </h4>
                 <hr />

                 <div className="d-flex justify-content-around">

               <h4 className=""> No suggestions yet </h4>
               <Link to="/suggestions"> <i className="fa-solid fa-magnifying-glass"></i> </Link>

               </div>

        </div>
      </>
      );
    }else{



    return (
      <>
      <div className='py-4 activity border'>

      <div className="d-flex justify-content-around">

    <h4 className=""> Suggestions </h4>
    <Link to="/suggestions"> <i className="fa-solid fa-magnifying-glass"></i> </Link>

    </div>

      <hr />

      {users.map((user) => (

        <div className="d-flex px-3">
        <img className="circle me-3" src={user.profileImg} alt="" />

          <p>{user.first_name} {user.last_name}</p>
        </div>

      ))}



           </div>
         </>
        )
}
}
}


export default SuggestedContacts
