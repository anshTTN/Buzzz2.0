import logo from "../images/logo.png";
import { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import Alerts from './Alerts';
import GoogleLogin from 'react-google-login';

function Signup() {
  const [userData, setUserData] = useState({ email: "", password: "",first_name:"",last_name:"",designation:"",gender:"",dob:"",city:"",state:"",pin_code:"" });
  const [type,setType]=useState(null)
const [msg,setMsg]=useState(null)
  const navigate = useNavigate();

  const showAlert=(type,msg)=>{
    setType(type);
    setMsg(msg);
    setTimeout(()=>{
      setType(null)
      setMsg(null)
    },2500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isNaN(userData.pin_code)){
      showAlert('alert alert-danger','Pin Code must contain only numbers')
    }
else{
    const res = await fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        first_name:userData.first_name,
        last_name:userData.last_name,
        designation:userData.designation,
        gender:userData.gender,
        dob:userData.dob,
        city:userData.city,
        state:userData.state,
        pin_code:userData.pin_code
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      navigate("/",{state:{isRegistered:true}});
    } else{
      showAlert("alert alert-danger",data.message)
    } 
  }
  };

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //googleauthentication
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

  return (
    <>
      <Alerts type={type} msg={msg} />
    <div className="text-center signup px-4 py-4">
      <img src={logo} className="signupLogin" />

      <form onSubmit={handleSubmit} className="container">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              onChange={onChange}
              value={userData.first_name}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              onChange={onChange}
              value={userData.last_name}
              required
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={userData.email}
              placeholder="Email"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Designation"
              name="designation"
              onChange={onChange}
              value={userData.designation}
              required
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Gender"
              name="gender"
              onChange={onChange}
              value={userData.gender}
              required
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              name="dob"
              onChange={onChange}
              value={userData.dob}
              required
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              onChange={onChange}
              value={userData.city}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="State"
              name="state"
              onChange={onChange}
              value={userData.state}
              required
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Area PIN"
              name="pin_code"
              onChange={onChange}
              value={userData.pin_code}
              required
            />
          </div>
          <div className="col">
            <input
              type="password"
              className="form-control"
              placeholder="Create password"
              name="password"
              onChange={onChange}
              value={userData.password}
              required
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-lg btn-primary"> Register </button>
          </div>
          </div>
          <div className="mt-1">OR</div>
          <div className="row">
          <div className="col-11 ms-3 mt-1">
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
          </div>
        </div>
        <div className="mt-1">OR</div>
        <div className="row">
          <div className="col  fs-5">
          <Link to='/'>Click Here to Login</Link>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default Signup;
