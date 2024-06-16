import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import {  useDispatch, useSelector } from "react-redux";
import { toggleFollowStatus } from '../../redux//userRedux'

export default function Rightbar({ user }) {

  const currentUser = useSelector((state)=>state.user.currentUser)
 // const [isFollowing, setIsFollowing] =useState(currentUser.followings.includes(user?._id)) ;
  const followStatus = useSelector((state) => state.user.followStatus); // Access followStatus from Redux
  const dispatch = useDispatch();

    // Check if user and currentUser are defined before accessing _id property
    const isFollowing = user && currentUser && followStatus[user._id];
 

  const [friends, setFriends] = useState([]);
useEffect(() => {
  const getFriends = async () => {
    try {
      const friendList = await axios.get("http://localhost:8800/api/users/friends/" + currentUser?._id);
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };
  getFriends();
}, [currentUser]);

const handleFollowClick = async () => {
  try {
    if (isFollowing) {
      // Unfollow logic
      await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      console.log(`Unfollowing user with ID: ${user._id}`);

    } else {
      // Follow logic
      await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      console.log(`Following user with ID: ${user._id}`);
    }

    // Dispatch the action to toggle the follow status in Redux
    console.log('Toggling follow status for user ID:', user._id);

    dispatch(toggleFollowStatus(user._id));
  } catch (error) {
    console.error('Error:', error);
  }
}

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} /> 
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {


    return (
      <>
       {user.username !== currentUser.username && (
          <button className="rightbarFollowButton"  onClick={handleFollowClick}  >
          {isFollowing ? "Unfollow" : "Follow"}
          {isFollowing ?<Icon icon="gg:remove" /> : <Icon icon="gala:add" />}
          </button>
         )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}{user.username}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend ,index) => (
           <Link to={"/profile/"+friend.username}
            style={{"textDecoration":"none"}}  key={index}>
          <div className="rightbarFollowing">
            <img
              src={friend.profilePicture? friend.profilePicture :"/assets/R.Png"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName"> {friend.username}</span>
            
          </div>
          </Link>
            ))}
        </div>
      
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}