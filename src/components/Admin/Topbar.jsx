import React from 'react'
import "./topbar.css";
import logo from '../../images/newlogo.png';
import profileImg from '../../images/profile.png';
import { BsBellFill } from 'react-icons/bs'; 
import { GrLanguage } from 'react-icons/gr'; 
import { IoSettingsSharp } from 'react-icons/io5'; 



function Topbar() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
            <img className='logo' src= {logo} alt="logo"/>
           
            </div>
            <div className='topRight'>
                <div className='topbarIconsContainer'>
                    <BsBellFill className='icons'/>
                </div>

                <div className='topbarIconsContainer'>
                    <GrLanguage className='icons'/>
                </div>

                <div className='topbarIconsContainer'>
                    <IoSettingsSharp className='icons'/>
                </div>

                <img src={profileImg} alt="profilePic" className="topAvatar" />
            </div>


        </div>
    </div>
  )
}

export default Topbar
