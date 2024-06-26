import { useEffect, useState } from "react";
import { Feet } from "../../components/feet/Feet";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user,setUser]=useState({});
const username =useParams().username

   //FetchUser according this post
 useEffect(()=>{
  const FetchUser=async()=>{
    const res= await axios.get(`http://localhost:8800/api/users?username=${username}`);
  setUser(res.data)
  };
   FetchUser();
},[username])

  return (
    <>
      <Topbar/>
      <div className="profile">
        <Sidebar/>
        <div className="profileRight"> 
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ||"/assets/11.jpeg"} 
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ||"/assets/R.png"} 
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feet username={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}