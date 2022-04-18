import React, { useState,useEffect } from 'react'
import Header from "./Header";
import coverPic from "../images/profileCoverImg.jpg";
import userprofile from '../images/profile.png'
import Alerts from './Alerts';

function MyProfile() {
    const [updateProfile,setUpdateProfile]=useState(false);
    const [prevEmail,setPrevEmail]=useState(null)
    const [email,setEmail]=useState(null)
    const [designation,setDesignation]=useState(null)
    const [first_name,setFirstName]=useState(null)
    const [last_name,setLastName]=useState(null)
    const [gender,setGender]=useState(null)
    const [dob,setDob]=useState(null)
    const [state,setState]=useState(null)
    const [city,setCity]=useState(null)
    const [pincode,setPincode]=useState(null)
    const [website,setWebsite]=useState(null)
    const [bio,setBio]=useState(null)
    const [type,setType]=useState(null)
    const [msg,setMsg]=useState(null)
    const [coverImg,setCoverImg]=useState(null)
    const [profileImg,setProfileImg]=useState(null)

    const showAlert=(type,msg)=>{
      setType(type);
      setMsg(msg);
      setTimeout(()=>{
        setType(null)
        setMsg(null)
      },2500)
    }

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
          setPrevEmail(data.user.email)
          setDesignation(data.user.designation)
          setFirstName(data.user.first_name)
          setLastName(data.user.last_name)
          setGender(data.user.gender)
          setDob((data.user.dob).substr(0,10))
          setState(data.user.state)
          setCity(data.user.city)
          setPincode(data.user.pin_code)
          setWebsite(data.user.my_website)
          setBio(data.user.bio)
            setCoverImg(data.user.coverImg)
            setProfileImg(data.user.profileImg)
    }

    useEffect(()=>{
        getUser();
    },[])

    const editProfileFunc=(e)=>{
      e.preventDefault();
        setUpdateProfile(true)
    }

    const onChange=(e)=>{
        const {name,value}=e.target
        console.log(name,value)
        if(name){
          if(name==='first_name'){
            setFirstName(value)
          }
          else if(name==='designation'){
            setDesignation(value)
          } else if(name==='gender'){
            setGender(value)
          } else if(name==='dob'){
            setDob(value)
          } else if(name==='state'){
            setState(value)
          } else if(name==='city'){
            setCity(value)
          } else if(name==='pin_code'){
            setPincode(value)
          } else if(name==='website'){
            setWebsite(value)
          } else if(name==='bio'){
            setBio(value)
          } else if(name==='email'){
            setEmail(value)
          } else if(name==='last_name'){
            setLastName(value)
          }
        }
      }

      const saveProfileFunc=async (e)=>{
        e.preventDefault();
        if(isNaN(pincode)){
          showAlert('alert alert-danger','Pin Code must contain only numbers')
        }
        else{
          const res = await fetch("/saveProfile", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              prevEmail:prevEmail,
              first_name:first_name,
              last_name:last_name,
              designation:designation,
              gender:gender,
              dob:dob,
              city:city,
              state:state,
              pin_code:pincode,
              website:website,
              bio:bio,
              coverImg:coverImg,
              profileImg:profileImg
            }),
            headers: {
              "content-Type": "application/json",
            },
          });
          const data = await res.json();
    console.log(data);
    if(data.status==='success'){
      localStorage.setItem('token',data.token)
      console.log(data.token)
      setUpdateProfile(false)
      showAlert('alert alert-success','Profile Updated')
    }
    else{
      showAlert('alert alert-danger',data.message)
    }
        }
      
      }
    
      const changeCoverImg=async (e)=>{
        const data=new FormData()
        data.append("file",e.target.files[0])
        data.append("upload_preset","buzzz-project")
        data.append("cloud_name","ansh-to-the-new")
        const res=await fetch("https://api.cloudinary.com/v1_1/ansh-to-the-new/image/upload",{
          method:"post",
          body:data
        })
        const response=await res.json();
        setCoverImg(response.url)
      }

      const changeProfileImg=async(e)=>{
        const data=new FormData()
        data.append("file",e.target.files[0])
        data.append("upload_preset","buzzz-project")
        data.append("cloud_name","ansh-to-the-new")
        const res=await fetch("https://api.cloudinary.com/v1_1/ansh-to-the-new/image/upload",{
          method:"post",
          body:data
        })
        const response=await res.json();
        setProfileImg(response.url)
      }
  return (
    <div >
        <Header/>
        
        {updateProfile?
        (
        <div className="container-fluid row  d-flex justify-content-center">
        <div className="col-md-8">
          <div >
           
              <img className="profileCoverImg-1" src={coverImg} alt="" />
           
            
            <div className='uploadCover'>
              <p>Upload Cover image</p>
          <input
              type="file"
              name="uploadCoverImg"
              onChange={changeCoverImg}
              />
            </div>
           
            <img className="profileUserImg-1 border" src={profileImg} alt="" />
            
            <div className='uploadProfile'>
              <p>Upload Profile image</p>
          <input
              type="file"
              name="uploadProfileImg"
              onChange={changeProfileImg}
              />
            </div>
          </div>
          <div className="row mt-5">
              <div className="col text-center mt-4">
              <h4 className=' profileLabel'>Your Bio</h4>
              
              <input
              type="text"
              className="form-control"
              placeholder="Bio"
              name="bio"
            onChange={onChange}
            defaultValue={bio}
              required
            />
              </div>
          </div>
           <div className="row ">
              <div className="col-6 text-center mt-4">
                  <h4 className=' profileLabel'>First Name</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              onChange={onChange}
              defaultValue={first_name}
              required
            />
              </div>
              <div className="col-6 text-center mt-4">
                  <h4 className=' profileLabel'>Last Name</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
            onChange={onChange}
              defaultValue={last_name}
              required
            />
              </div>
          </div>
          <div className="row">
              <div className="col-6 text-center ">
                  <h4 className=' profileLabel'>Email</h4>
                  <input
              type="email"
              className="form-control"
              name="email"
            onChange={onChange}
              defaultValue={email}
              placeholder="Email"
              required
            />
              </div>
              <div className="col-6 text-center">
                  <h4 className=' profileLabel'>Designation</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="Designation"
              name="designation"
            onChange={onChange}
              defaultValue={designation}
              required
            />
              </div>
          </div>
          <div className="row text-center">
              <div className="col-6">
                  <h4 className=' profileLabel'>Gender</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="Gender"
              name="gender"
            onChange={onChange}
              value={gender}
              required
            />
              </div>
              <div className="col-6">
                  <h4 className=' profileLabel'>Date Of Birth</h4>
                  <input
              type="date"
              className="form-control"
              name="dob"
            onChange={onChange}
              defaultValue={dob}
              required
            />
              </div>
          </div>
          <div className="row text-center">
              <div className="col-6">
                  <h4 className=' profileLabel'>City</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
            onChange={onChange}
              defaultValue={city}
              required
            />
              </div>
              <div className="col-6">
                  <h4 className=' profileLabel'>State</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="State"
              name="state"
            onChange={onChange}
              defaultValue={state}
              required
            />
              </div>
          </div>
          <div className="row text-center">
              <div className="col-6">
                  <h4 className=' profileLabel'>Pincode</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="Area PIN"
              name="pin_code"
            onChange={onChange}
              defaultValue={pincode}
              required
            />
              </div>
              <div className="col-6">
                  <h4 className=' profileLabel'>Website</h4>
                  <input
              type="text"
              className="form-control"
              placeholder="My Website"
              name="website"
            onChange={onChange}
              defaultValue={website}
              required
            />
              </div>
          </div>
        <Alerts  type={type} msg={msg} />
          <div className="row text-center">
              <div className="col mt-5 mb-4">
                <button onClick={saveProfileFunc} type="submit" className="btn btn-lg btn-primary "> Save Profile </button>
              </div>
              </div>

        </div>
      </div>
      )
        :
        (<div className="container-fluid row  d-flex justify-content-center">
        <div className="col-md-8">
          <div >
            <img className="profileCoverImg-1" src={coverImg} alt="" />
            <img className="profileUserImg-1 border" src={profileImg} alt="" />
          </div>
          <div className="row profileInfo-1 mt-3">
            <h2 className="searchedUserName mt-5">
              {first_name&&last_name ?(
                <center> {first_name+" "+last_name}</center>
              ):(
                <center> {first_name}</center>
              )
              
            }
              
            </h2>
            <h4 className="bio">
                {bio?(
                    <center>{bio}</center>
                ):(
                    <center>Click on edit to update </center>
                )}
              
            </h4>
          </div>
          
          <div className="row">
              <div className="col-6 text-center ">
                  <h4 className=' profileLabel'>Email</h4>
                  <div className=' profileInput'>{email}</div>
              </div>
              <div className="col-6 text-center">
                  <h4 className=' profileLabel'>Designation</h4>
                  {designation?(<div className=' profileInput'>{designation}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
                  
              </div>
          </div>
          <div className="row text-center">
              <div className="col-6">
                  <h4 className=' profileLabel'>Gender</h4>
                  {gender?(<div className=' profileInput'>{gender}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
                  
              </div>
              <div className="col-6">
                  <h4 className=' profileLabel'>Date Of Birth</h4>
                  {dob?(<div className=' profileInput'>{dob.substr(0,10)}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
              </div>
          </div>
          <div className="row text-center">
              <div className="col-6">
                  <h4 className=' profileLabel'>City</h4>
                  {city?(<div className=' profileInput'>{city}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
              </div>
              <div className="col-6">
                  <h4 className=' profileLabel'>State</h4>
                  {state?(<div className=' profileInput'>{state}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
              </div>
          </div>
          <div className="row text-center">
              <div className="col-6">
                  <h4 className=' profileLabel'>Pincode</h4>
                  {pincode?(<div className=' profileInput'>{pincode}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
              </div>
              <div className="col-6">
                  <h4 className=' profileLabel'>Website</h4>
                  {website?(<div className=' profileInput'>{website}</div>):(<div className=' profileInput'>Click on edit to update</div>)}
              </div>
          </div>
          <Alerts  type={type} msg={msg} />
          <div className="row text-center">
              <div className="col mt-5 mb-4">
                <button onClick={editProfileFunc} type="submit" className="btn btn-lg btn-primary "> Update Profile </button>
              </div>
              </div>

        </div>
      </div>)
    }
        
     </div>
  )
}

export default MyProfile