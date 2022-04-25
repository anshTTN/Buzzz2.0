import React,{useState,useEffect} from 'react'
import logo from '../images/logo.png'
import { FaFacebookMessenger ,FaUserAlt} from 'react-icons/fa';
import {Link,Navigate,useNavigate} from 'react-router-dom'


function Header() {
  const [email,setEmail]=useState(null)
    const [first_name,setFirstName]=useState(null)
    const [last_name,setLastName]=useState(null)
    const [coverImg,setCoverImg]=useState(null)
    const [profileImg,setProfileImg]=useState(null)
    const navigate = useNavigate();

    const getUser=async () => {
      const res = await fetch("/getUser", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const data = await res.json();
        setEmail(data.user.email)
        setFirstName(data.user.first_name)
        setLastName(data.user.last_name)
          setCoverImg(data.user.coverImg)
          setProfileImg(data.user.profileImg)
  }

  useEffect(()=>{
    getUser();
  },[])

  const logoutBtn=()=>{
    navigate('/');
    localStorage.removeItem('token')
  }

  return (
  <>
<nav className="navbar navbar-light border-bottom sticky-top">
  <div className="container-fluid">
  <Link className="navbar-brand" to="/feedsPage">
      <img className="logo-circle" src={logo} alt=""/>
    </Link>

    <div className='d-flex'>
    <Link to="/friendRequests" >
    <p className="me-5 mt-3 friendsHeader" >Friend Requests </p>
    </Link>
      <Link to='/MyProfile'>
      <img className="circle me-3 mt-3" src={profileImg} alt=""/>
      </Link>
      {first_name&&last_name?
      (
        <p className="me-3 mt-3" >{first_name+" "+last_name} </p>

      ):(
        <p className="me-3 mt-3" >{first_name} </p>
      )}


    <button type="submit" onClick={logoutBtn}  id="btn_2" className='btn btn-primary mt-2'>Logout</button>

    </div>
  </div>
</nav>

  </>
  )
}


export default Header
