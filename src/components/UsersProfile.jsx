import React from "react";
import Header from "./Header";
import coverPic from "../images/profileCoverImg.jpg";
import profilePic from "../images/profilePic.jpeg";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="row  d-flex justify-content-center">
        <div className="col-md-8">
          <div className="profileCover">
            <img className="profileCoverImg" src={coverPic} alt="" />
            <img className="profileUserImg" src={profilePic} alt="" />
          </div>
          <div className="row profileInfo">
            <h1 className="searchedUserName">
              <center> Ankita Pandey </center>
            </h1>
            <h3 className="bio">
              <center>Mean Trainee at To The New</center>
            </h3>
          </div>
          <div className="row row_btn">
            <div className="col-md-6 col-sm-12 col-xs-12 friend_button">
              <button
                type="button"
                className="btn btn-primary btn-lg friend_btn"
              >
                <i className="fa-solid fa-user-plus"></i> &nbsp; Add Friend
              </button>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <button type="button" className="btn btn-lg message_btn">
                <i className="fa-brands fa-facebook-messenger"></i>&nbsp;
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
