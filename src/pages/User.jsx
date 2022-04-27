import React from 'react';
import { useState , useEffect } from 'react';
import Alerts from '../components/Alerts';


const User = () => {

  const [users , setUsers] = useState([]);

  const [loading , setLoading] = useState(true);


  const [type,setType]=useState(null);
  const [msg,setMsg]=useState(null);


  const showAlert=(type,msg)=>{
    setType(type);
    setMsg(msg);
    setTimeout(()=>{
      setType(null)
      setMsg(null)
    },5000)
  }



  useEffect(() => {
    getUsers();
  } , [])

  function deleteUser(e){

    removeUser(e.target.value);

  }

  async function removeUser(id){

    const res = await fetch(`/deleteuser`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body:JSON.stringify({
          id: id
        })
    });



    const data = await res.json();

  if(data.status == "success"){
     showAlert("alert alert-success", "User deleted successfully");
      setUsers(users.filter((item)=> item._id != id))
  }else{
    console.log(data.status);
  }

  }




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

<Alerts type={type} msg={msg} />

<hr className="invisible"/>

{users.map((user) => (

<div className="card col-md-4 col-sm-6 col-xs-12 userPost">


<center> <img className="postImage" src={user.profileImg} alt="Card image cap" />  </center>

<div className="d-flex justify-content-around postContent">
    <h5 className="d-flex">{user.first_name} {user.last_name}</h5>
    <hr className="invisible"/>

    <div className='buttonsUsers'>
        <div className="d-flex">
            <div className="col-md-6 col-sm-12 col-xs-12 postBtn"><center><button className="btn btn-primary " value={user._id} onClick={deleteUser}>Delete</button></center></div>
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
