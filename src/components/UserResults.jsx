import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UserImage from "../images/user.jpg";
import Header from "./Header.jsx";
import Alerts from './Alerts';

function UserResults(){

  const [senderEmail, setSenderEmail] = useState(null);
  const [type,setType]=useState(null);
  const [msg,setMsg]=useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState(null);


  const showAlert=(type,msg)=>{
    setType(type);
    setMsg(msg);
    setTimeout(()=>{
      setType(null)
      setMsg(null)
    },5000)
  }



  {/**************** For handling add friend button *************/}

 function addFriend(e){

  const email = e.target.value;

  async function sendReq(email){
   const result = await fetch(`/addfriend`,{
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
       switch(data.status) {

        case "success":
          showAlert("alert alert-success", "Friend request sent successfully");
          break;
        case "alreadyRequested":
          showAlert("alert alert-danger"," A friend request already been sent");
          break;
        case "alreadyFriend":
          showAlert("alert alert-danger"," You are already friends");
          break;
        case "checkOwnRequest":
          showAlert("alert alert-danger"," Please check your friend requests");
          break;  
      
          default:
          showAlert("alert alert-danger"," Something went wrong! could not send request");
      
      
      }

 }
 sendReq(email);

}



function handleChange(e){
setUserName(e.target.value);
}



function search(){
    searchUsers(userName);
}



useEffect(()=>{
searchAllUsers();
}, []);



  {/**************** For handling displaying Users *************/}

     async function searchUsers(userName){
       console.log(userName);
      const result = await fetch(`/searchusers`,{
            method: 'POST',
            headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                userName: userName
              })
          });
          const data = await result.json();
            setUsers(data.users);
            setSenderEmail(data.senderEmail);
            setLoading(false);

    }



    async function searchAllUsers(){
     const result = await fetch(`/searchallusers`,{
           method: 'POST',
           headers:{
             'content-Type':'application/json',
             'auth-token':localStorage.getItem('token')
           }
         });
         const data = await result.json();
           setUsers(data.users);
           setSenderEmail(data.senderEmail);
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
          <Header />
          <h1> No User found </h1>
          </>
        );
      }else{



    return (

      <>
      <Header />
      <Alerts type={type} msg={msg} />
      <div className="row py-4 px-4 searched-users">

      <div className="d-flex px-3 align-items-end">


         <div className="input-group rounded flex-1 px-2 w-50">
           <input type="search" className="form-control rounded" placeholder="Search People" aria-label="Search" aria-describedby="search-addon" onChange={handleChange}/>
           <span className="input-group-text border-0" id="search-addon">
          <button type="submit" className="btn btn-md btn-primary" onClick={search}> GO </button>
           </span>
         </div>

      </div>

      <hr className="invisible"/>

      {users.map((user) => (


      <div className="card col-md-4 col-sm-6 col-xs-12">
        <img className="card-img-top" src={UserImage} alt="Card image cap" />
        <div className="card-body">
            <h5 className="card-title">{user.first_name}</h5>
            <hr className="invisible"/>
            <div className="d-flex">
            <i className="fa-solid fa-location-dot"></i>
            <p className="mx-2">{user.city}</p>
            </div>

            <div className=' buttonsforusers'>
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12 messagediv"><center><a href="#" className="btn btn-primary">Message</a></center></div>
                    <div className="col-md-6 col-sm-12 col-xs-12 removediv"><center><button className="btn btn-primary" onClick={addFriend} value={user.email}>Add Friend</button></center></div>
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


export default UserResults;
