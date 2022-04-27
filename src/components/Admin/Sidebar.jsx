import React from 'react'
// import { MdLineStyle } from 'react-icons/md';
import { GrFlagFill } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';

import "./sidebar.css"


function Sidebar() {
  return (

    // <div className='Sidebar'>
    //   <div className="sidebarWrapper">
    //     <div className="sidebarMenu">
        
    //   <ul className='sidebarList'>
    //     {sidebarData.map((val , key) => {
    //     return <li key = {key} 
    //     className = "sidebarListItems"
    //     onClick = {() => {window.location.pathname = val.link}} > 
       
    //      <div id='icon'>{ val.icons}</div>
    //      <div id='title'> 
    //        {val.title}
    //      </div>
         
         
    //      </li>

        

    //   })}

    //   </ul>

    //   </div>

    //   </div>
      
    // </div>
    <div className='sidebar'>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              
              <li className="sidebarListItems">
                
                <GrFlagFill className='sidebarIcons'/>
                Post
              </li>
              <li className="sidebarListItems">
                <CgProfile className='sidebarIcons'/>
                User
              </li>
            </ul>
          </div>
        </div>
      
    </div>
  )
}

export default Sidebar
