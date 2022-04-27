import React from 'react';
import './post.css';
import { useEffect, useState } from "react";



const Post = () => {

const [posts , setPosts] = useState([]);


const [loading , setLoading] = useState(true);




useEffect(() => {
  getPosts();
} , [])


function deletePost(e){
  // console.log(e.target.value);

  removePost(e.target.value);

}

async function removePost(id){

  const res = await fetch(`/deletePost/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  

  const data = await res.json();

  console.log(data.status);

  // setPosts(data.posts);

  // setLoading(false);

  

}



async function getPosts(){

  const res = await fetch("/getAllPost", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  setPosts(data.posts);

  setLoading(false);

  

}

if(loading){
  return(
    <h1> Loading .. </h1>
  )
}else{

  if(posts.length == 0){
    return (
      <>
      <div className='py-4 activity border contactContainer'>
             <h4 className="px-3"> Posts </h4>
               <hr />
        <h4 className="px-3"> No Posts Yet</h4>
      </div>
    </>
    );
  }else{

  return (
    <>
    {/* <div className='py-4 activity border contactContainer'>
      <h4 className="px-3"> Posts </h4>
      <hr />
      {posts.map((post) => (
      <div className="d-flex px-3">
        <img src = {post.image_url}/>
        <p>{post.userName}</p>
      </div>

))}

    </div> */}


<div className="row py-4 px-4">

  <h2>Post</h2>


<hr className="invisible"/>

{posts.map((post) => (


<div className="card col-md-4 col-sm-6 col-xs-12 userPost">
  

  <center> <img className="postImage" src={post.image_url} alt="Card image cap" />  </center>
  <div className="d-flex justify-content-around postContent">
      <h5 className="d-flex">{post.userName}</h5>
      <hr className="invisible"/>

      <div className='buttonsUsers'>
          <div className="d-flex">
              <div className="col-md-6 col-sm-12 col-xs-12 postBtn"><center><button className="btn btn-primary" value = {post._id} onClick={deletePost} >Delete</button></center></div>
              {/* <div className="col-md-6 col-sm-12 col-xs-12 removediv"><center><button className="btn btn-primary" onClick={addFriend} value={user._id}>Add Friend</button></center></div> */}
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

export default Post

