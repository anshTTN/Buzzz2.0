import { useEffect, useState } from "react";
import UserImage from "../images/user.jpg";
import { Button, Modal,Dropdown } from "react-bootstrap";
import Alerts from "./Alerts";

function Post({name,img,text,userImg,id,postLiked,postDisliked,comments,myId,postUserId,handler}) {
  // let like=false;
  const [like,setLike]=useState(false);
  const [dislike,setDislike]=useState(false);
  const [show, setShow] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const [type, setType] = useState(null);
  const [msg, setMsg] = useState(null);



  const showAlert = (type, msg) => {
    setType(type);
    setMsg(msg);
    setTimeout(() => {
      setType(null);
      setMsg(null);
    }, 2500);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = async (id) => {
    const res = await fetch("/getUser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data)
    postLiked.map(e=>{
      if(e===data.user._id){
        setLike(true)
      }
    })
    postDisliked.map(e=>{
      if(e===data.user._id){
        setDislike(true)
      }
    })

    // const res1=await fetch("/getPostDetail/"+id,{
    //   method:'GET'
    // });
    // const data1=await res1.json();
    // comments=data1.post.comments
  }
  useEffect(()=>{
  getUser(id)
  },[])

const liked=async(id)=>{
  setLike(!like)
  const res=await fetch('/likeAndDislikePost/true/'+id,{
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  })
  const data = await res.json();
  console.log(data)

  await handler()
}

const disliked=async(id)=>{ 
  console.log(id)
  setDislike(!dislike)
  const res=await fetch('/likeAndDislikePost/false/'+id,{
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  })
  const data = await res.json();
  console.log(data)
  await handler()
}


const handleCommentText=async (e)=>{
  setCommentText(e.target.value);
  await handler()
  }

  const addComment=async(id)=>{
    const res=await fetch('/comment/'+id,{
      method: "POST",
      body:JSON.stringify({
        com:commentText
      }),
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
    const data = await res.json();
    console.log(data)
    setShow(false)
    await handler()
  }


const reportPost=async(id)=>{
  console.log(id)
  const res=await fetch('/reportPost/'+id,{
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  })
  const data = await res.json();
  console.log(data)
  if(data.status==='success')
  showAlert("alert alert-success", data.message);
  else
  showAlert("alert alert-danger", data.message);
  await handler()
}

const deletePost=async(id)=>{
  console.log(id)
  const res=await fetch('/deletePost/'+id,{
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  })
  const data = await res.json();
  console.log(data)
  showAlert("alert alert-danger", data.message);
  await handler()
}

  return (
    <>
    {console.log(myId,postUserId)}
    {myId===postUserId?
    (
<div className="post border mt-5 postContainer">
      <Alerts type={type} msg={msg} />
        <div className="d-flex justify-content-between py-4 px-3">
          <div className="flex-1">
            <div className="d-flex ">
              <div>
                <img className="circlePost" src={userImg} alt="" />
                {/* <i className="fa-solid fa-user fa-2xl userPostIcon"></i> */}
              </div>
              <div>
                <h4 className="ms-2 mt-1 postUserName"> {name} </h4>
              </div>
            </div>
          </div>
          <div className="flex-1">
          <button type="button" class="btn btn-light" onClick={()=>{deletePost(id)}}>Delete Post</button>
          </div>
        </div>
        <div className="caption px-3 ms-3">
          <p>{text}</p>
        </div>
        <div className="post-img-box border">
          <img src={img} alt="post img" className="post-img" />
        </div>
        {comments.length===0?(
          <></>
        ):(
<>
<div className="showComments mt-2" onClick={handleShow} >
  {comments.length+" "}Comments
</div>
<hr className="horizontalRule"/>
</>
        )}
        <div className="d-flex justify-content-around">
          <div className="flex-1 py-3 icons">
            {like ? (
              <>
                <i
                  className="fa-regular fa-thumbs-up emote1"
                  onClick={() => {
                    liked(id);
                  }}
                ></i>
                <h5 className="d-inline" style={{ color: "#345ba4" }}>
                  {" " + postLiked.length} Like{" "}
                </h5>
              </>
            ) : (
              <>
                <i
                  className="fa-regular fa-thumbs-up emote"
                  onClick={() => {
                    liked(id);
                  }}
                ></i>
                <h5 className="d-inline">{" " + postLiked.length} Like </h5>
              </>
            )}
          </div>
          <div className="flex-1 py-3">
            {dislike ? (
              <>
                <i
                  className="fa-regular fa-thumbs-down emote mt-1"
                  style={{ color: "#c73e3e" }}
                  onClick={() => {
                    disliked(id);
                  }}
                ></i>
                <h5 className="d-inline dislike" style={{ color: "#c73e3e" }}>
                  {" " + postDisliked.length} Dislike{" "}
                </h5>
              </>
            ) : (
              <>
                <i
                  className="fa-regular fa-thumbs-down emote mt-1"
                  onClick={() => {
                    disliked(id);
                  }}
                ></i>
                <h5 className="d-inline dislike">
                  {" " + postDisliked.length} Dislike{" "}
                </h5>
              </>
            )}
          </div>
          <div className="flex-1 py-3">
            <i
              className="fa-regular fa-comment emote mt-1"
              onClick={handleShow}
            ></i>

            <h5 className="d-inline dislike"> Comment </h5>
          </div>
        </div>

        <div className="comment-box px-3 py-3 caption d-flex">

          <div>
            <input
              type="text"
              name="comment"
              placeholder="Write a comment..."
              className="comment-text ms-4 "
            />
          </div>
        </div>
      </div>
    ):
    (
<div className="post border mt-5 postContainer">
      <Alerts type={type} msg={msg} />
        <div className="d-flex justify-content-between py-4 px-3">
          <div className="flex-1">
            <div className="d-flex ">
              <div>
                <img className="circlePost" src={userImg} alt="" />
                {/* <i className="fa-solid fa-user fa-2xl userPostIcon"></i> */}
              </div>
              <div>
                <h4 className="ms-2 mt-1 postUserName"> {name} </h4>
              </div>
            </div>
          </div>
          <div className="flex-1">
          <button type="button" class="btn btn-light" onClick={()=>{reportPost(id)}}>Report Post</button>
          </div>
        </div>
        <div className="caption px-3 ms-3">
          <p>{text}</p>
        </div>
        <div className="post-img-box border">
          <img src={img} alt="post img" className="post-img" />
        </div>
        {comments.length===0?(
          <></>
        ):(
<>
<div className="showComments mt-2" onClick={handleShow} >
  {comments.length+" "}Comments
</div>
<hr className="horizontalRule"/>
</>
        )}
        <div className="d-flex justify-content-around">
          <div className="flex-1 py-3 icons">
            {like ? (
              <>
                <i
                  className="fa-regular fa-thumbs-up emote1"
                  onClick={() => {
                    liked(id);
                  }}
                ></i>
                <h5 className="d-inline" style={{ color: "#345ba4" }}>
                  {" " + postLiked.length} Like{" "}
                </h5>
              </>
            ) : (
              <>
                <i
                  className="fa-regular fa-thumbs-up emote"
                  onClick={() => {
                    liked(id);
                  }}
                ></i>
                <h5 className="d-inline">{" " + postLiked.length} Like </h5>
              </>
            )}
          </div>
          <div className="flex-1 py-3">
            {dislike ? (
              <>
                <i
                  className="fa-regular fa-thumbs-down emote mt-1"
                  style={{ color: "#c73e3e" }}
                  onClick={() => {
                    disliked(id);
                  }}
                ></i>
                <h5 className="d-inline dislike" style={{ color: "#c73e3e" }}>
                  {" " + postDisliked.length} Dislike{" "}
                </h5>
              </>
            ) : (
              <>
                <i
                  className="fa-regular fa-thumbs-down emote mt-1"
                  onClick={() => {
                    disliked(id);
                  }}
                ></i>
                <h5 className="d-inline dislike">
                  {" " + postDisliked.length} Dislike{" "}
                </h5>
              </>
            )}
          </div>
          <div className="flex-1 py-3">
            <i
              className="fa-regular fa-comment emote mt-1"
              onClick={handleShow}
            ></i>

            <h5 className="d-inline dislike"> Comment </h5>
          </div>
        </div>

        <div className="comment-box px-3 py-3 caption d-flex">

          <div>
            <input
              type="text"
              name="comment"
              placeholder="Write a comment..."
              className="comment-text ms-4 "
            />
          </div>
        </div>
      </div>
    )}
      

      {/* comment modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Coments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-9">
              <textarea
                placeholder="Add comment"
                name="commentText"
                onChange={handleCommentText}
                cols="35"
                rows="2"
              ></textarea>
            </div>
            <div className="col-3">
              <Button
                variant="primary"
                className="commentBtn "
                onClick={()=>{addComment(id)}}
              >
                Add
              </Button>
            </div>
          </div>
          {comments.length===0?(
            <div className="mt-4">
              No comments yet
            </div>
          ):(
            <div>
              {comments.map(e=>(
                <>
                <hr className="mt-4"></hr>
                <h5 className="commentUserName">{e.userName}</h5>
                <p className="commnetText">{e.comment}</p>
                </>
              ))}
            </div>
          )}
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default Post;
