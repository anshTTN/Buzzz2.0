import GoogleLogin from 'react-google-login';
import {  useState } from 'react';
import loginlogo from '../images/newlogo.png';
import { useNavigate,Link,useLocation } from "react-router-dom";
import Alerts from './Alerts';
import ForgotPassword from './ForgotPassword';
function Login(){

const [credentials,setCredentials]=useState({email:"",password:""})
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
//   const {state}=useLocation();
//   if(state!=null){
//     console.log(state.passwdChanged)
//     if(state.passwdChanged){
//       showAlert("alert alert-success","Password Changed")
//       state.passwdChanged=false
//     }

//   }
// if(state!=null && state.isRegistered===true){
//   showAlert('alert alert-success',"Registered Successfuly. Please login to continue")
//   state.isRegistered=false;
// }
//google login
const handleLogin=async (googleData)=>{
  const res=await fetch('/googleAuth',{
    method:'POST',
    body:JSON.stringify({
      token:googleData.tokenId,
    }),
    headers:{
      'content-Type':'application/json',
    },
  })
  const data=await res.json();
  console.log(data);
  if(data.status){
    localStorage.setItem('token',data.token)
    navigate('/feedsPage')
  }
  else{
    showAlert("alert alert-danger",data.message)
  }
}

const handleFailure=(result)=>{
  showAlert("alert alert-danger","Getting some network error try again")
}


//manual login


const handleSubmit= async (e)=>{
  e.preventDefault();

const res=await fetch('/login',{
  method:'POST',
  body:JSON.stringify({
    email:credentials.email,
    password:credentials.password
  }),
  headers:{
    'content-Type':'application/json',
  },
})
const data=await res.json();
console.log(data);
if(data.status==='success'){
  localStorage.setItem('token',data.token)
  navigate('/feedsPage')
}
else
showAlert("alert alert-danger",data.message)
}

const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}


return (
  <>
<Alerts type={type} msg={msg} />
    <section>
<div className="container shadow p-3 mb-5 bg-white rounded">

  <div className="row">
    <div className="col">
      <div className="d-grid gap-4">
        <div className="loginlogo">
          <img src= {loginlogo} alt="logo"/>

        </div>
        <div className="heading_1">
          <h6><center>Enter your details and Start <br />your journey with us </center> </h6>

        </div>
        <div className="">
          <h6><center>Don't stop until you're proud.</center></h6>

        </div>
        {/* <div className="btn_1">
          <a className="btn btn-primary" id="btn_1" href="#" role="button">Sign In with Google</a>

        </div> */}
        {/* <div className="btn_1 ms-5"> */}
        <GoogleLogin
        className="googleBtn"
        theme='dark'
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign In With Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
        >
        </GoogleLogin>
        {/* </div> */}
      </div>

    </div>


    <div className="col form-content">
      <div className="heading_2">
        <h6> <center>Login To Your Account</center></h6>

      </div>

       <form onSubmit={handleSubmit} className = "login-form">
         <div className="d-grid gap-4">
           <div className="row row_1">
             <input type="email" className="form-control" name="email" onChange={onChange} value={credentials.email} placeholder="TTN Username" required/>
           </div>

           <div className="row row_2">
             <input className="form-control" type="password" id = "inputPassword" name='password' onChange={onChange} value={credentials.password} placeholder="Password" autoComplete='off' required />
           </div>

           <div className="row row_3">

             <div className='col-6'>
             <Link to="/signup">Don't have acccount Click Here to register</Link>
             </div>

             <div className="col-6">
               <div className="forgotPswd forgot float-right">
                <Link to="/forgotpswd">Forgot Password?</Link>
              </div>
             </div>
           </div>

           <div className="row row_4">
             {/* <a className="btn btn-primary" id="btn_2" href="#" role="button">Sign In</a> */}
             <button type="submit"  id="btn_2" className='btn btn-primary'>Sign In</button>
           </div>
         </div>


   </form>
   </div>



</div>
</div>
</section>
  </>
);

}

export default Login;
