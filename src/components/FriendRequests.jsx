import {useState, useEffect} from 'react';
import profile from "../images/profile.png";
import Header from "./Header.jsx";
import Alerts from './Alerts';


function FriendRequests(){

const [requests, setRequests] = useState(null);
const [loading, setLoading] = useState(true);

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



useEffect(()=>{
  searchRequests();
}, []);

{/************** Searching for requests ************/}

async function searchRequests(){
 const result = await fetch(`/searchrequests`,{
       method: 'POST',
       headers:{
         'content-Type':'application/json',
         'auth-token':localStorage.getItem('token')
       }
     });
     const data = await result.json();
     setRequests(data.users);
       setLoading(false);

}

{/************* accept friend request *******/}

function acceptReq(e){
acceptFriendRequest(e.target.value);
}

async function acceptFriendRequest(email){
 const result = await fetch(`/acceptfriendrequest`,{
       method: 'POST',
       headers:{
         'content-Type':'application/json',
         'auth-token':localStorage.getItem('token')
       },
       body:JSON.stringify({
           email: email
         })
     });
     const data = await result.json();
      console.log(data.status);
      if(data.status == "success"){
        showAlert("alert alert-success", "Request accepted successfully");
        setRequests(data.users);
      }else{
        showAlert("alert alert-danger","Request could not be accepted");
      }
       setLoading(false);

}




if(loading){
  return(
    <h1> Loading .. </h1>
  )
}else{
   console.log(requests);
  if(requests.length == 0){
    return (
      <>
        <Header />
      <h1> No friend request found </h1>
      </>
    );
  }else{



  return (
    <div>
        <Header />
        <Alerts type={type} msg={msg} />
        <div className="row py-4 px-4 searched-users">


        {requests.map((request) => (

          <div className="d-flex px-3">


          <img className="circle me-4" src={profile} alt="" />

            <h3>{request.first_name} {request.last_name}</h3>

         <button className="btn btn-primary btn-md ms-4" onClick={acceptReq} value={request.email}> accept </button>
          </div>

        ))}





        </div>

    </div>
  )

}
}
}

export default FriendRequests;
