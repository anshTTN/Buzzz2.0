import React, { useState, useEffect } from "react";
import Header from "./Header";
import { FaRegImages } from "react-icons/fa";
import Post from "./Post";
import Contacts from "./Contacts";
import SuggestedContacts from "./SuggestedContacts";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Alerts from "./Alerts";
import Activity from "./Activity";

function FeedsPage() {
  const [email, setEmail] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [website, setWebsite] = useState(null);
  const [bio, setBio] = useState(null);
  const [type, setType] = useState(null);
  const [msg, setMsg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [show, setShow] = useState(false);
  const [addPostImage, setAddPostImage] = useState(null);
  const [postText, setPostText] = useState(null);
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [myId, setMyId] = useState(null);

  // let posts=[];

  const showAlert = (type, msg) => {
    setType(type);
    setMsg(msg);
    setTimeout(() => {
      setType(null);
      setMsg(null);
    }, 2500);
  };

  const showPosts = (data) => {
    console.log(data);
    setPosts(data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = async () => {
    const res = await fetch("/getUser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data.user.friends);
    setEmail(data.user.email);
    setDesignation(data.user.designation);
    setFirstName(data.user.first_name);
    setLastName(data.user.last_name);
    setGender(data.user.gender);
    setDob(data.user.dob.substr(0, 10));
    setState(data.user.state);
    setCity(data.user.city);
    setPincode(data.user.pin_code);
    setWebsite(data.user.my_website);
    setBio(data.user.bio);
    setCoverImg(data.user.coverImg);
    setProfileImg(data.user.profileImg);
    setFriends(data.user.friends);
    setMyPosts(data.user.posts);
    setMyId(data.user._id)

    const res1 = await fetch("/getPosts", {
      method: "POST",
      body: JSON.stringify({
        email: data.user.email,
      }),
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data1 = await res1.json();
    showPosts(data1.posts);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handlePostText = (e) => {
    setPostText(e.target.value);
  };

  const addImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "buzzz-project");
    data.append("cloud_name", "ansh-to-the-new");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ansh-to-the-new/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const response = await res.json();
    setAddPostImage(response.url);
  };

  const createPost = async () => {
    const res = await fetch("/createPost", {
      method: "POST",
      body: JSON.stringify({
        post_text: postText,
        image_url: addPostImage,
      }),
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setShow(false);
      showAlert("alert alert-success", data.message);
      setAddPostImage(null);
    } else showAlert("alert alert-danger", data.message);
    setAddPostImage(null);
    getUser();
  };
  return (
    <div className="bgColor">
      <>
        <Header />
        <Alerts type={type} msg={msg} />
        <div className="row FeedContent container-fluid">
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col align-self-center">
              {/* ********************1st col************** */}
              <div
                className="container adminProfile"
                style={{ backgroundColor: "white" }}
              >
                <Link to="/MyProfile" className="linkStyle">
                  <div className="row  d-flex justify-content-center">
                    <img className="adminCoverPic " src={coverImg} alt="" />
                    <img className="adminProfilePic" src={profileImg} alt="" />
                    {first_name && last_name ? (
                      <p className="profileName">
                        {first_name + " " + last_name}
                      </p>
                    ) : (
                      <p className="profileName">{first_name}</p>
                    )}

                    {bio ? (
                      <p className="profileStatus">{bio}</p>
                    ) : (
                      <p className="profileStatus">Employee at TTN</p>
                    )}

                    <div className="row">
                      <div className="col">
                        <p className="profileViewsNo">{friends.length}</p>
                        <p className="profileViewsText">Friends</p>
                        <div className="line"></div>
                      </div>
                      <div className="col">
                        <p className="profileViewsNo">{myPosts.length}</p>
                        <p className="profileViewsText">Post</p>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Activity */}

                {/* <Activity /> */}
              </div>
            </div>
          </div>

          {/* ***************************2nd Col***************** */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 post-body ">
            <div className="col align-self-center">
              <div
                type="button"
                className="border searchBar searchContainer"
                onClick={handleShow}
              >
                <div className="row">
                  <a className="col-2 ms-3" href="#">
                    <img className="circle me-3 mt-3" src={profileImg} alt="" />
                  </a>
                  <div className="search col-8 border">
                    <span> Start a post ...</span>
                  </div>
                  <div className="col-2 d-flex">
                    <div className="imageIcon">
                      <FaRegImages />
                    </div>
                    <div className="imageText">Photo/Video</div>
                  </div>
                </div>
              </div>

              {/* modal */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create A Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <textarea
                    placeholder="Write your thoughts..."
                    name="postText"
                    onChange={handlePostText}
                    cols="50"
                    rows="10"
                  ></textarea>
                </Modal.Body>
                {addPostImage != null ? (
                  <img src={addPostImage} alt="" />
                ) : (
                  <div></div>
                )}
                <Modal.Footer>
                  <label>
                    <div className="uploadImage">
                      <FaRegImages className="imageIcon" />
                      <span> Upload Image</span>
                    </div>

                    <input
                      style={{ display: "none" }}
                      type="file"
                      name=""
                      id=""
                      onChange={addImage}
                    />
                  </label>
                  <Button
                    variant="primary"
                    className="postBtn"
                    onClick={createPost}
                  >
                    Post
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* *************************POSTS************************************************ */}
              {console.log(posts)}
              {posts.map((e) => (
                <Post
                  comments={e.comments}
                  postLiked={e.like}
                  postDisliked={e.dislike}
                  id={e._id}
                  name={e.userName}
                  img={e.image_url}
                  text={e.post_text}
                  userImg={e.userImage}
                  myId={myId}
                  postUserId={e.userId}
                  handler={getUser}
                />
              ))}
            </div>
          </div>
          {/* *******************************3rd Col******************************************* */}
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="Rightcontainer">
              <div className="row   justify-content-center">
                <Contacts />
              </div>
              <div className="row  mt-5 justify-content-center">
                <SuggestedContacts />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default FeedsPage;
