import "./sidebar.css";
import { Icon } from '@iconify/react';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriends/CloseFriends";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [users,setUsers]=useState([]);
  const currentUser = useSelector((state)=>state.user.currentUser)

 //FetchUser according this post
 useEffect(()=>{
  const FetchUser=async()=>{
    const res= await axios.get("http://localhost:8800/api/users/all");
    setUsers(res.data)
  };
   FetchUser();
},[])
const filteredUsers = users.filter(
  (user) => user._id !== currentUser._id && !user.followers.includes(currentUser._id)
);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Icon icon="fa:feed"  className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="material-symbols:chat" className="sidebarIcon"/>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="formkit:playcircle" className="sidebarIcon"  />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="ic:sharp-group"  className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="material-symbols:bookmark" className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="material-symbols:help-outline" className="sidebarIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="material-symbols:work-outline" className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="material-symbols:event-outline" className="sidebarIcon"  />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
          <Icon icon="material-symbols:school" className="sidebarIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
        {filteredUsers.map((u) => (
            <CloseFriend key={u.id} users={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}