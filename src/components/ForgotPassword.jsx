import {  useState } from 'react';
import { useNavigate,Link,useLocation } from "react-router-dom";
import Alerts from './Alerts';

function ForgotPassword() {
    const [userData,setUserData]=useState({email:"",dob:"",password:"",confirmPassword:""})
    const [verified,setVerified]=useState(false)
const [type,setType]=useState(null)
const [msg,setMsg]=useState(null)
const navigate = useNavigate();
const showAlert=(type,msg)=>{
    setType(type);
    setMsg(msg);
    setTimeout(()=>{
      setType(null)
      setMsg(null)
    },5000)
  }

    const handleSubmit= async (e)=>{
        e.preventDefault();
      console.log(userData.email,userData.dob)
      const res=await fetch('/verifyEmail',{
        method:'POST',
        body:JSON.stringify({
          email:userData.email,
         dob:userData.dob
        }),
        headers:{
          'content-Type':'application/json',
        },
      })
      const data=await res.json();
      console.log(data);
      if(data.status==='success'){
          showAlert("alert alert-success",data.message)
          setVerified(true);
      }
      else{
          showAlert("alert alert-danger",data.message)
          setVerified(false);
      }
      }
    const handlePasswordSubmit= async (e)=>{
        e.preventDefault();
      const res=await fetch('/forgotPassword',{
        method:'POST',
        body:JSON.stringify({
          email:userData.email,
          password:userData.password,
         confirmPassword:userData.confirmPassword
        }),
        headers:{
          'content-Type':'application/json',
        },
      })
      const data=await res.json();
      console.log(data);
      if(data.status==='success'){
          showAlert("alert alert-success",data.message)
          setVerified(false);
      }
      
      else{
          showAlert("alert alert-danger",data.message)
        }
        if(data.status==='success'){

          setVerified(false);
          navigate('/',{state:{passwdChanged:true}})
        }
      }

    const onChange=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
      }

  return (
      <>
      <Alerts type={type} msg={msg} />
    <div className='container ' >
        <div className="row mt-5">
            <div className="col mt-5">
        <h1 className='text-center'>Forgot Password</h1>
            </div>
        </div>
        {verified?(
            <>
            <h4 className='text-center mt-4'>Create your new password</h4>
            <div className="container ">
            <form onSubmit={handlePasswordSubmit} className = "login-form">
                <div className="row mt-4">
                    <div className="col text-center">
                       <h4>Enter password</h4> 
                       <input type="password" className="form-control forgotInput mx-auto mt-3" name="password"  placeholder="Password" onChange={onChange} value={userData.password} required/>
                    </div>
                </div>
                <div className="row mt-4">
                <div className="col text-center">
                       <h4>Confirm password</h4> 
                       <input type="password" className="form-control forgotInput mx-auto mt-3" name="confirmPassword" onChange={onChange} value={userData.confirmPassword} placeholder="Confirm Password" required/>
                    </div>
                </div>
                <div className="row text-center">
              <div className="col mt-4">
                <button type="submit" className="btn btn-lg btn-primary "> Change Password </button>
              </div>
              </div>
    </form>
            </div>
            </>
        ):(
            <>
            <h4 className='text-center mt-4'>Verify your Email Id by entering your email and date of birth</h4>
            <div className="container ">
            <form onSubmit={handleSubmit} className = "login-form">
                <div className="row mt-4">
                    <div className="col text-center">
                       <h4>Enter your Email Id</h4> 
                       <input type="email" className="form-control forgotInput mx-auto mt-3" name="email"  placeholder="Email Id" onChange={onChange} value={userData.email} required/>
                    </div>
                </div>
                <div className="row mt-4">
                <div className="col text-center">
                       <h4>Enter your DOB</h4> 
                       <input type="date" className="form-control forgotInput mx-auto mt-3" name="dob" onChange={onChange} value={userData.dob} required/>
                    </div>
                </div>
                <div className="row text-center">
              <div className="col mt-4">
                <button type="submit" className="btn btn-lg btn-primary "> Verify </button>
              </div>
              </div>
    </form>
            </div>
            </>
        )

        }
    </div>
      </>
  )
}

export default ForgotPassword